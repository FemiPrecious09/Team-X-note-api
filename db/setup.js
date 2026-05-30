require("dotenv").config()
const { createUserTable } = require("../models/auth_model")
const { createNoteTable } = require("../models/note_model")

const setUp = async()=>{
 try{
  await createUserTable()
  await createNoteTable()
  console.log("Table Created Successfully")
 }catch(err){
  console.error("Error",err)
 }
}

setUp()