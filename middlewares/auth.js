const jwt = require("jsonwebtoken")
const {  getProfileId } = require("../models/auth_model")
const { getProfileNote } = require("../models/note_model")

const authorize = (req,res,next)=>{
 const token = req.cookies.token
 if(!token){
  return res.status(401).send("Unauthorized access")
 }
 try{
  const user = jwt.verify(token, process.env.MY_SECRET_KEY)
  req.user = user
  next()
 }catch(err){
  res.status(401).send("Invalid Token")
 }
}

const authorizeOwner = async (req,res,next)=>{
 try{
  const user = req.user
  const id = req.params.id
  const result = await getProfileId(id,user.public_id)
  if(!result){
   return res.status(401).send("Invalid Id")
  }
  next()
 }catch(err){
  return res.status(404).send("Unathorized Access")
 }
}

const authorizeRead = async (req,res,next)=>{
 try{
  const user = req.user
  const result = await getProfileNote(user.public_id)
  if(!result){
   return res.status(401).send("Invalid Id")
  }
  next()
 }catch(err){
  return res.status(404).send("Unathorized Access")
 }
}

module.exports = {authorize,authorizeOwner,authorizeRead}