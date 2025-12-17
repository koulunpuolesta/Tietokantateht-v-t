const bcrypt = require("bcrypt");
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'arviointidb'
});

app.listen(3000,()=>{
console.log("Server listening in http://localhost:3000")
})

const SALT_ROUNDS = 10;

app.post('/user', async (req, res)=>{
 	try {
	  const { username, fname, password } = req.body;
	    
const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

const [result] = await db.promise().query(
	    'INSERT INTO user ( username, fname, password ) VALUES (?, ?, ?)',	
	    [ username, fname, passwordHash ]
);
	res.status(201).json({
	  message: "user lisätty",
      username,
      fname,
      password
	  
	});
       }catch (err) {
	  res.status(500).json({
		message: err,
	 });
     }
});
