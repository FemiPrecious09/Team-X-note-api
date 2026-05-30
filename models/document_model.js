const { pool } = require("../db/database")

const addDataDocument = async (id,profileId,title,originalname,size,storageKey)=>{
 const result = await pool.query(`
  INSERT INTO documents(id,profile_id,title,original_filename,mime_type,size_bytes,storage_key,status) VALUES ($1,$2,$3,$4,$5,$6,$7, 'pending')
 `, [id,profileId,title,originalname,"application/pdf",size,storageKey])
 return result.rows[0]
}

module.exports = {addDataDocument}