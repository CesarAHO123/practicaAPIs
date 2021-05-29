const express = require('express');
const bodyParser = require('body-parser');
const e = require('express');
const PORT = process.env.PORT || 3306;
const app = express();
app.use(bodyParser.json());
const pg = require('pg')


//Datos de la conexion a postgresql
const connectionData = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '270201',
    database: 'node20_mysql'

};
const pool = new pg.Pool(connectionData);

//Route
app.get('/', (req, res) => {
    res.send('Test de la API!');
});
// Todas las mascotas
app.get('/pets', (req, res) => {
    pool.connect(function(err, client, done) {
        if(err) {
          return console.error('connexion error', err);
        }
        client.query("select * from pets", function(err, result) {
          done();
      
          if(err) {
            return console.error('error running query', err);
          }    
          res.json(result.rows);  
        });
    }); 
});

//Agregamos mascotas
app.post('/add', (req, res) => {
   const sql = "insert into pets set ?";
   
});
//Modificamos los datos de las mascotas
app.put('/update/:id', (req, res) => {
    res.send('Update Pet');
})
//Eliminamos una mascota
app.delete('/delete/:id', (req, res) => {
    var id= req.params.id;
  

    pool.connect(function(err, client, done) {
        if(err) {
          return console.error('conexion error', err);
        }
        client.query("Delete from pets where id="+id, function(err, result) {
          done();
      
          if(err) {
            return console.error('error running query', err);
          }    
          res.json(result.rows);   
        });
    });
});
// Mascotas por id
app.get('/pets/:id', (req, res) => {
    var id= req.params.id;
   

    pool.connect(function(err, client, done) {
        if(err) {
          return console.error('conexion error', err);
        }
        client.query("select * from pets where id="+id, function(err, result) {
          done();
      
          if(err) {
            return console.error('error running query', err);
          }    
          res.json(result.rows);   
        });
    });
});

/* Comprobamos la conexion
connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
}
);*/
app.listen(PORT, () => console.log('Server running on port ${PORT}'));
