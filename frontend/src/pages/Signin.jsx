/* eslint-disable no-undef */


import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import{useDispatch,useSelector} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
export default function Signin() {
  const[formData,setFormData] =useState({});
  const{loading ,error}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
      
    });
    console.log(formData);
  };

const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        dispatch(signInStart())
        const res=await fetch('http://localhost:3000/api/auth/signin',{
            method: 'POST',
            headers:{
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data=await res.json();
        console.log(data);
        if(data.success==false){
            dispatch(signInFailure(data.message));
            return;
        }
        dispatch(signInSuccess(data));
        navigate('/')
    }
    catch(error){
       diapatch(signInFailure(error.message)) ;
        console.log(error.message);
    }
  

};

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-centre font-semibold 
      my-7">Sign In</h1>
      <form onSubmit={handleSubmit}className="flex flex-col gap-4">
        <input type="text" placeholder="email" className='
        border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder="password" className='
        border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppacase hover:opacity-95">Sign-in</button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p> Dont Have an account?</p>
        <Link to={"/signin"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
