const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

app.listen(3000,()=>{
console.log("Server listening in http://localhost:3000")
})

 const db = mysql.createConnection({
	host: 'localhost',
	user: 'cruduser', //vaihda tämä
	password: 'salasana124', //vaihda tämä
	database: 'crud'
});

app.post('/crud', async (req, res)=>{
 	try {
	  const { name, author, isbn } = req.body;
	  const [result] = await db.promise().query(
	    'INSERT INTO book (name, author, isbn) VALUES (?, ?, ?)',	
	    [name, author, isbn]
	);  
	res.status(201).json({
	  message: "book created",
	  id: result.insertId,
	  name,
	  author,
	  isbn
	});
       }catch (err) {
	  res.status(500).json({
		message: err,
	 });
     }
});

app.get('/crud', async (req, res)=>{
	try{
		const [rows] = await db.promise().query(
			'SELECT * from book;'
		);
		res.status(200).json({
			book: rows,
		});
	}catch (err) {
	  res.status(500).json({
		message: err,
	});
     }
});

app.put('/crud/:id', async (req, res)=>{
	try{

		const {id_book } =req.params;
		const { name, author, isbn } = req.body;
		
		const [result] = await db.promise().query(
			'UPDATE book  SET name = ?, author = ?, isbn = ? WHERE id_book = ?',
			[name, author, isbn, id]
	     );
	res.status(200).json({
	  message: "Book updated",
	  id_book,
	  name,
	  author,
	  isbn
	});
	} catch (err) {
	   res.status(500).json({
		message: err,
	});
	}	
});

app.delete('/crud/:id_book', async (req, res)=>{
	try {
		const {id_book } =req.params;
		const [result] = await db.promise().query(
			'DELETE FROM book WHERE id_book = ?',
			[id]
		);
	} catch (err) {
	   res.status(500).json({
		message: err,
	});
	}	
});













