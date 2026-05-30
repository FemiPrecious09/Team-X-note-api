const crypto = require("crypto")

const { createNoteDB, getNoteIdDB, sortNote, replaceNoteDB, updateNoteDB, deleteNoteDB, getSortNote, storeSummary, getSummary, getTags, storeTags } = require("../models/note_model")
const { generateFromGroq } = require("../utils/groq_util")


const addNote = async (req,res)=>{
  const user = req.user
 const {title,body} = req.body
 if (!title || !body) {
  return res.status(400).send("Title and body are required")
 }
 const newnote = await createNoteDB(title,body,user.public_id)
 res.status(201).json(newnote) // Every Endpoint that returns a body should have a json
}

const getNoteId = async (req,res)=>{
 const id = req.params.id
 const note = await getNoteIdDB(id)
 if(!note){
  return res.status(404).send("Note Id not found")
 }
 res.status(200).json(note)
}

const getNote = async (req,res)=>{
 const page = parseInt(req.query.page,10) || 1
 const limit = parseInt(req.query.limit,10) || 10
 const sort = req.query.sort || "newest"
 let sortBy = ""
 if(sort === "title"){
   sortBy = "title ASC"
 }else if(sort === "newest"){
  sortBy = "created_at DESC"
 }else if(sort === "last updated"){
  sortBy = "updated_at DESC"
 }else{
  return res.status(404).send("Invalid Sort")
 }
 const startIndex = (page -1) * limit
 const user = req.user
 const note = await sortNote(sortBy,limit,startIndex,user.public_id)
 if(!note){
  return res.status(404).send("Note not found")
 }
 res.status(200).json(note)
}

const getAllNote = async (req,res)=>{
 const page = parseInt(req.query.page,10) || 1
 const limit = parseInt(req.query.limit,10) || 10
 const sort = req.query.sort || "newest"
 let sortBy = ""
 if(sort === "title"){
   sortBy = "title ASC"
 }else if(sort === "newest"){
  sortBy = "created_at DESC"
 }else if(sort === "last updated"){
  sortBy = "updated_at DESC"
 }else{
  return res.status(404).send("Invalid Sort")
 }
 const startIndex = (page -1) * limit

 const note = await getSortNote(sortBy,limit,startIndex)
 if(!note){
  return res.status(404).send("Note not found")
 }
 res.status(200).json(note)
}

const replaceNote = async (req,res)=>{
 const id = req.params.id
 const {title,body} = req.body
 if (!title || !body) {
  return res.status(400).send("Title and body are required")
 }
 const note = await replaceNoteDB(title,body,id)
 if(!note){
  return res.status(404).send("Note not found")
 }
 res.status(200).json(note)
}

const updateNote = async (req,res)=>{
 const id = req.params.id
 const {title,body} = req.body
 const note = await updateNoteDB(title,body,id)
 if(!note){
  return res.status(404).send("Note not found")
 }
 res.status(200).json(note)
}

const summaryCache = new Map()

const summarizeNote = async (req,res)=>{
  try{
    const id = req.params.id
    const cachedsummary = await getSummary(id)
    if(cachedsummary){
      return res.status(200).json({
        noteId: id,
        summary: cachedsummary,
        source: "cache"
      })
    }
    const note = await getNoteIdDB(id)
    if(!note){
      return res.status(404).send("Note Id not found")
    }
    const hash = crypto.createHash("sha256").update(note.body).digest("hex")
    if (summaryCache.has(hash)) {
      const summary = summaryCache.get(hash)
      await storeSummary(id, summary) 
      return res.status(200).json({ noteId: id, summary, source: "memory" })
    }

    const completion = await generateFromGroq([
        {
          role: "system",
          content: "You are a helpful assistant that summarize notes"
        },
        {
          role: "user",
          content: `Summarize this note:\n\nTitle: ${note.title}\n\nBody: ${note.body}`
        }
      ])
    const summary = completion.choices[0].message.content
    summaryCache.set(hash, summary)
    await storeSummary(id,summary)
    return res.status(200).json({
      noteId: id,
      summary,
      source: "groq"
    })
  }catch (error) {
    console.error(error)
    if(error.status === 429){
      return res.status(429).send("Too many Request")
    }
    return res.status(500).json({
      message: "Failed to generate summary",
    })
  }
}

const createTags = async(req,res)=>{
  try{
    const id = req.params.id
    const cachedTags = await getTags(id)
    if(cachedTags){
      return res.status(200).json({
        noteId: id,
        tags: cachedTags
      })
    }
    const note = await getNoteIdDB(id)
    if(!note){
      return res.status(404).send("Note Id not found")
    }
    const completion = await generateFromGroq([
      {role:"system", content: "You are a helpful assistant that generate tags from notes"},
      {role:"user", content:  `Suggest 5 relevant tags for this note. Return ONLY a JSON array. Title: ${note.title} Body: ${note.body}`}
    ])
    const raw = completion.choices[0].message.content
    let tags
    try {
      const cleaned = raw.replace(/```json|```/g, "").trim()
      tags = JSON.parse(cleaned)
      if (!Array.isArray(tags)) throw new Error("Not an array")
    } catch (parseErr) {
      console.error("LLM returned bad JSON:", raw)
      return res.status(500).json({ message: "AI returned invalid tag format" })
    }
    await storeTags(id,tags)
    return res.status(200).json({
      noteId: id,
      tags
    })
  }catch(err){
    console.log(err)
    if(err.status === 429){
      return res.status(429).send("Too many Request from the Backend")
    }
    return res.status(500).json({
      message:"Failed to generate Tags"
    })
  }
}

const delNote = async (req,res)=>{
 const id = req.params.id
 const note = await deleteNoteDB(id)
 if(!note){
  return res.status(404).send("Note not found")
 }
 res.status(200).json(note)
}


module.exports = {getNote,addNote,getNoteId,replaceNote, updateNote, delNote, getAllNote, summarizeNote, createTags}