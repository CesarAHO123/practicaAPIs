/*
Api para manejar mascotas creada por medio de nodejs, express y postgresql
Las mascotas cuentan con un id, nombre, raza, edad e imagen.
El id no se tiene que ingresar ya que la bd se autoincrementa.
Id es un integer y todos los demas son varchar(100)
El campo de imagen es para guardar la direccion de la imagen que queramos mostrar.
*/

const express = require('express');
const bodyParser = require('body-parser');
const e = require('express');
const PORT = process.env.PORT || 3306;
const app = express();
app.use(bodyParser.json());
const pg = require('pg')
//Datos de la conexion local de postgresql
const connectionData = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '270201',
    database: 'node20_mysql'

};
const pool = new pg.Pool(connectionData);
/*Agregamos mascotas
Las mascotas se agregan por medio de un json en el body de la peticion. Un ejemplo de un json valido: 
{
    "nombre":"Pedro",
    "raza": "Pitbull",
    "edad": "5",
    "imagen": "imagen.jpg"
}
*/
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
      res.send("Se agrego la mascota");   
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
