const crypto = require("crypto");
const storage = require("../utils/storage");
const {
  addDataDocument,
  getDocumentByIdDB,
  getDocumentsByProfileDB,
  deleteDocumentDB,
} = require("../models/document_model");

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 10;

const parsePagination = (query) => {
  let limit = parseInt(query.limit, 10);
  let offset = parseInt(query.offset, 10);
  if (isNaN(limit) || limit < 1) limit = DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;
  if (isNaN(offset) || offset < 0) offset = 0;
  return { limit, offset };
};

const buildMeta = (total, limit, offset, returned) => ({
  total,
  limit,
  offset,
  returned,
  has_more: offset + limit < total,
});

const listDocuments = async (req, res) => {
  try {
    const { limit, offset } = parsePagination(req.query);
    const { rows, total } = await getDocumentsByProfileDB(
      req.user.public_id,
      limit,
      offset,
    );

    res.status(200).json({
      meta: buildMeta(total, limit, offset, rows.length),
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to list documents" });
  }
};

const getDocument = async (req, res) => {
  try {
    const doc = await getDocumentByIdDB(req.params.id, req.user.public_id);
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve document" });
  }
};

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, size, buffer } = req.file;
    const id = crypto.randomUUID();
    const storage_key = `${req.user.public_id}/${Date.now()}-${originalname}`;

    await storage.put(storage_key, buffer);

    const doc = await addDataDocument(
      id,
      req.user.public_id,
      req.body.title || originalname,
      originalname,
      size,
      storage_key,
    );

    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to upload document" });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const doc = await deleteDocumentDB(req.params.id, req.user.public_id);
    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }
    await storage.delete(doc.storage_key);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete document" });
  }
};

module.exports = { listDocuments, getDocument, uploadDocument, deleteDocument };
