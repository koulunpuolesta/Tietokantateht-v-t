const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

app.listen(3000,()=>{
console.log("Server listening in http://localhost:3000")
})

 const db = mysql.createConnection({
	host: 'localhost',
	user: 'arviouser', //vaihda tämä
	password: 'Sillysalmon13', //vaihda tämä
	database: 'arviointidb'
});

app.post('/opintojakso', async (req, res)=>{
 	try {
	  const { Koodi, Laajuus, Nimi } = req.body;
	  const [result] = await db.promise().query(
	    'INSERT INTO opintojakso (Koodi, Laajuus, Nimi) VALUES (?, ?, ?)',	
	    [ Koodi, Laajuus, Nimi ]
	);  
	res.status(201).json({
	  message: "opintojakso lisätty",
	  id: result.insertId,
	  Koodi,
	  Laajuus,
	  Nimi,
	});
       }catch (err) {
	  res.status(500).json({
		message: err,
	 });
     }
});

app.get('/opintojakso', async (req, res)=>{
	try{
		const [rows] = await db.promise().query(
			'SELECT * from opintojakso;'
		);
		res.status(200).json({
			opintojakso: rows,
		});
	}catch (err) {
	  res.status(500).json({
		message: err,
	});
     }
});

app.put('/opintojakso/:id', async (req, res)=>{
	try{

		const { id } =req.params;
		const { Koodi, Laajuus, Nimi } = req.body;
		
		const [result] = await db.promise().query(
			'UPDATE opintojakso  SET Koodi = ?, Laajuus = ?, Nimi = ? WHERE idOpintojakso = ?',
			[ Koodi, Laajuus, Nimi, id ]
	     );
	res.status(200).json({
	  message: "Opintojakso updated",
	  idOpintojakso: id,
	  Koodi,
	  Laajuus,
	  Nimi,
	});
	} catch (err) {
	   res.status(500).json({
		message: err,
	});
	}	
});

app.delete('/opintojakso/:idOpintojakso', async (req, res)=>{
	try {
		const {idOpintojakso } =req.params;
		const [result] = await db.promise().query(
			'DELETE FROM opintojakso WHERE idOpintojakso = ?',
			[idOpintojakso]
		);
	} catch (err) {
	   res.status(500).json({
		message: err,
	});
	}	
});