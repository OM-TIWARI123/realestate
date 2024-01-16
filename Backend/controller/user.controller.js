const { User } = require("../models/usermodel")

const test=(req,res) => {
    res.json({message:"test router"})
}

module.exports={test};