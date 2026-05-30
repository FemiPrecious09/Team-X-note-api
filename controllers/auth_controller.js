const { createUserDB, loginUserDB } = require("../models/auth_model")
const jwt  = require("jsonwebtoken")
const crypt = require("bcryptjs")

const registerUser = async (req,res)=>{
  try{
    const {username,password} = req.body
    if(!username || !password){
      return res.status(400).send("username and Password are required")
    }
    const results = await createUserDB(username,password)
    if(!results){
      return res.status(404).send("Invalid Username")
    }
    res.status(200).json({
      "message": "Account Created Successfully",
      "data": results
    })
  }catch(err){
    if (err.code === "23505") {
      return res.status(409).json({
        message: "That username is already taken. Please choose another one.",
      })
    }
  }
}

const loginUser = async (req,res)=>{
 const {username,password} = req.body
 if(!username || !password){
  return res.status(400).send("username and Password are required")
 }
 const results = await loginUserDB(username)
 const IsMatch = crypt.compareSync(password,results.password)
 if(!IsMatch){
  return res.status(404).send("Users not found in the database")
 }
 const {mypassword, ...userdata} = results
 const token = jwt.sign(userdata,process.env.MY_SECRET_KEY, {expiresIn: "1h"})
 res.cookie("token",token,{
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 60 * 60 * 1000,
 }) 
 res.status(200).json({
  "message": "Logged In Successfully",
  "data": results
 })
}

const logoutUser = (req,res)=>{
  res.clearCookie("token",{
  httpOnly: true,
  secure: false,
  sameSite : "strict"
 })
 res.send("LogOut Successfully")
}

module.exports = {loginUser, registerUser, logoutUser}