import {useSelector} from 'react-redux';
import {useEffect, useRef,useState} from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart,updateUserFailure,updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutStart, signOutFailure, signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
export default function Profile() {
  const fileRef=useRef(null);
  const {currentUser} = useSelector((state)=>state.user);
  console.log(currentUser._id);
  const[file,setFile]=useState(undefined);
  const[filePerc,setFilePerc]=useState(0);
  const[fileUploadError,setFileUploadError]=useState(false);
  const[formData,setFormData]=useState({});
  const dispatch=useDispatch();
  
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file])
  const handleFileUpload=(file)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime()+file.name;
    const storageRef =ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file);
    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setFilePerc(Math.round(progress));
      },
      (error)=>{
        console.log(error);
        setFileUploadError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>setFormData({...formData,avatar:downloadURL}));
      }
    );
  }
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
    console.log(formData);
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res=await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`,
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      
      if(data.success==false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    }catch(err){
      dispatch(updateUserFailure(err.message));
    }
  }
  const handleDeleteUser=async ()=>{
    try{
      dispatch(deleteUserStart());
      const res=await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data=res.json();
      if(data.success==false){
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSuccess(data.message));

    } catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignOut=async ()=>{
    try{
      dispatch(signOutStart())
      const res=await fetch('http://localhost:3000/api/auth/signout');
      const data=res.json();
      if(data.success==false){
        dispatch(signOutFailure(data.message));
        return
      }
      dispatch(signOutSuccess(data.message));
    }catch(error){
      dispatch(signOutFailure(error.message));
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto gap-4'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input onChange={(e)=>setFile(e.target.files[0])}type="file" ref={fileRef} hidden accept='image/.*' />
        <img onClick={()=>fileRef.current.click()} src={formData.avatar||currentUser.avatar} alt='Profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <p className='text-sm self-center'>
         { fileUploadError ?
          (<span className='text-red-700'>Error Image upload
          </span>):
           filePerc > 0 && filePerc < 100 ?(
            <span className='text-slate-700'>
              {'Uploading${filePerc}%'}
            </span> )
          :
          filePerc==100 ?(
            <span className='text-green-700'>Image successfully uploaded</span>
          )
          :
          ("")
          }
        </p>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' defaultValue={currentUser.username} id="username" onChange={handleChange}/>
        <input type="text" placeholder='email' className='border p-3 rounded-lg' defaultValue={currentUser.email} id="email" onChange={handleChange}/>
        <input type="password" placeholder='password' id="password" className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:op80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700'>Delete Acccount</span>
        <span onClick={handleSignOut} className='text-red-700'>Sign out</span>
      </div>
    </div>
  )
}
