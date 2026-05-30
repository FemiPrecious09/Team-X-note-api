const { addDataDocument } = require("../models/document_model")
const storage = require("../utils/storage")

const uploadPdf = async (req,res)=>{
 if(!req.file){
  return res.status(400).json({message: "file is required"})
 }
 const {originalname, size, buffer} = req.file

 if( size === 0){
  return res.status(400).json({message: "file is empty"})
 }

 if (!originalname || originalname.trim() === "") {
  return res.status(400).json({ message: "invalid filename" })
 }

 const isPdf = buffer.subarray(0,5).toString("ascii") === "%PDF-"
 if(!isPdf){
  return res.status(415).json({ message: "file is not a valid PDF" })
 }
 const profileId = req.user.public_id
 const documentId = crypto.randomUUID()
 const storageKey = `${profileId}/${documentId}`
 const title = req.body.title || originalname
 try{
  await storage.put(storageKey,buffer)
  const result = await addDataDocument(documentId,profileId,title,originalname,size,storageKey)
  return res.status(202).json({ 
   message: "document uploaded",
   data: result
  })
 }catch(err){
  await storage.delete(storageKey).catch(() => {})
  console.error("upload failed:", err)
  return res.status(500).json({ message: "could not upload document" })
 }
}

module.exports = {uploadPdf} 