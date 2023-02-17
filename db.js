const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  database: 'm6_L1_ejercicio2',
  port: 5432,
  user: 'postgres',
  password: 'nelson',
})

client.connect((err) => {
  if (err) {
    //console.error('connection error', err.stack)
    console.error('connection error', err.message)
  } else {
    console.log('connected')
  }
})

const traerConductores = () =>{
  //Esto tiene un Callback
  //Hacer un query es asincrono en su return.
  return new Promise((resolve, reject) =>{
    client.query("SELECT * FROM conductores;", (err, result) => {
      if(err){
        //return "Ha ocurrido un error."
        reject(err)
      }
      //console.log(result) //La propiedad rows tiene los valores
      //console.table(result.rows)
      client.end();
      //return result.rows
      resolve(result.rows)
    })
  })  
}

const traerVehiculos = () => {
  return new Promise((resolve, reject) => {
    client.query("SELECT CONCAT(marca, ' - ',patente) vehiculo FROM automoviles;", (err, result) => {
      if(err){
          reject(err)
      }
      resolve(result.rows)
    })
  })
}

const traerConductoresSinVehiculo = (edad) => {
  return new Promise((resolve, reject) => {
    //Conductores que de sierta edad no tiene vehiculo
    client.query(`select nombre, edad from conductores c
                    left join automoviles a
                    ON c.nombre = a.nombre_conductor
                    where edad <= ${edad} and marca is null`, (err, result) => {
      if(err){
         return reject(err)
      }
      resolve(result.rows)
    })
  })
}


//LLAMADA DIRECTA DE ESTE ARCHIVO
//traerconductores();

//EXPORTAR CON ECMAScript5
module.exports = {
  traerConductores,
  traerVehiculos,
  traerConductoresSinVehiculo
}