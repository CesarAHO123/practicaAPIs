/*
Api para manejar mascotas creada por medio de nodejs y postgresql.
*/




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
//Agregamos mascotas
app.post('/add', (req, res) => {
    const nombre= req.body.nombre
    const raza =req.body.raza
    const edad =req.body.edad
    const imagen =req.body.imagen
   const sql = "insert into pets(nombre,raza,edad,foto) values ('" + nombre + "','" + raza + "','" + edad + "','" + imagen + "')";
   pool.connect(function(err, client, done) {
    if(err) {
      return console.error('conexion error', err);
    }
    client.query(sql, function(err, result) {
      done();
  
      if(err) {
        return console.error('error running query', err);
      }    
      res.send(sql);   
    });
});
});
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
app.listen(PORT, () => console.log('Server running on port ${PORT}'));
