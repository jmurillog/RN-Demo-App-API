const admin = require("firebase-admin");
const db = require("../config/firebaseConfig");

exports.getAllBooks = async (req, res) => {
  try {
    const snapshot = await db.collection("books").get();
    const books = [];
    snapshot.forEach((doc) => {
      let id = doc.id;
      let data = doc.data();
      books.push({ id, ...data });
    });
    res.status(200).send(JSON.stringify(books));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getBookById = async (req, res) => {
  try {
    const doc = await db.collection("books").doc(req.params.id).get();
    if (!doc.exists) {
      res.status(404).send("Book not found");
    } else {
      const id = doc.id;
      const data = doc.data();
      res.status(200).send(JSON.stringify({ id, ...data }));
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createBook = async (req, res) => {
  try {
    const newDoc = await db.collection("books").add(req.body);
    res.status(201).send(`Created a new book: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateBook = async (req, res) => {
  try {
    await db
      .collection("books")
      .doc(req.params.id)
      .set(req.body, { merge: true });
    res.status(200).send(`Updated the book: ${req.params.id}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const document = db.collection("books").doc(req.params.id);
    const item = await document.get();
    if (!item.exists) {
      res.status(404).send("Book Not found");
      return;
    }
    await document.delete();
    res.status(200).json({ message: `Deleted the book: ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
