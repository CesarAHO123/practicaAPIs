const express  = require('express'); 
const mysql= require('mysql');
const bodyParser = require ('body-parser');
const e = require('express');
const PORT = process.env.PORT || 3306;
const app = express();
app.use(bodyParser.json());




//Conexion de MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'postgres',
    password: '270201', 
    database: 'node20_mysql'
}); 
//Route
app.get('/',(req,res) => {
    res.send('Test de la API!');
});
// Todas las mascotas
app.get('/pets', async (req,res) => {
    const sql= 'SELECT * FROM pets';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
          res.json(results);
        } else {
          res.send('Not result');
        }
      })
});
//Agregamos mascotas
app.post('/add',(req,res) => {
 res.send('New Pet')
});
//Modificamos los datos de las mascotas
app.put('/update/:id', (req,res) => {
    res.send('Update Pet');
})
//Eliminamos una mascota
app.delete('/delete/:id', (req,res) => {
 res.send('Delete pet');
});
// Mascotas por id
app.get('/pets/:id',(req,res) => {
    res.send('Get pets by id');
});

 // Comprobamos la conexion
connection.connect(error =>
    {
        if (error) throw error; 
        console.log('Database server running!');
    }
    );
    app.listen(PORT,()=>console.log('Server running on port ${PORT}'));
