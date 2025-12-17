const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

app.listen(3000,()=>{
console.log("Server listening in http://localhost:3000")
})

 const db = mysql.createConnection({
	host: 'localhost',
	user: 'db_user', //vaihda tämä
	password: 'salasana', //vaihda tämä
	database: 'arviointidb'
});

app.post('/opiskelija', async (req, res)=>{
 	try {
	  const { Etunimi, Sukunimi, Osoite, Luokkatunnus } = req.body;
	  const [result] = await db.promise().query(
	    'INSERT INTO opiskelija (Etunimi, Sukunimi, Osoite, Luokkatunnus) VALUES (?, ?, ?, ?)',	
	    [Etunimi, Sukunimi, Osoite, Luokkatunnus ]
	);  
	res.status(201).json({
	  message: "opiskelija lisätty",
	  id: result.insertId,
	  Etunimi,
	  Sukunimi,
	  Osoite,
	  Luokkatunnus
	});
       }catch (err) {
	  res.status(500).json({
		message: err,
	 });
     }
});

app.get('/opiskelija', async (req, res)=>{
	try{
		const [rows] = await db.promise().query(
			'SELECT * from opiskelija;'
		);
		res.status(200).json({
			Opiskelija: rows,
		});
	}catch (err) {
	  res.status(500).json({
		message: err,
	});
     }
});

app.put('/opiskelija/:id', async (req, res)=>{
	try{

		const { id } =req.params;
		const { Etunimi, Sukunimi, Osoite, Luokkatunnus } = req.body;
		
		const [result] = await db.promise().query(
			'UPDATE opiskelija  SET Etunimi = ?, Sukunimi = ?, Osoite = ?, Luokkatunnus = ? WHERE idOpiskelija = ?',
			[Etunimi, Sukunimi, Osoite, Luokkatunnus, id]
	     );
	res.status(200).json({
	  message: "Opiskelija updated",
	  idOpiskelija: id,
	  Etunimi,
	  Sukunimi,
	  Osoite,
	  Luokkatunnus
	});
	} catch (err) {
	   res.status(500).json({
		message: err,
	});
	}	
});

app.delete('/opiskelija/:idOpiskelija', async (req, res)=>{
	try {
		const {idOpiskelija } =req.params;
		const [result] = await db.promise().query(
			'DELETE FROM opiskelija WHERE idOpiskelija = ?',
			[idOpiskelija]
		);
	} catch (err) {
	   res.status(500).json({
		message: err,
	});
	}	
});
