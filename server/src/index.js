const path = require("path");
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://gis:gis@172.28.1.1:5432/labol');

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

checkConnection();

// FUNCIONAAA
// sequelize.query(`SELECT * FROM "edificio_de_salud_IPS"`, { type: sequelize.QueryTypes.SELECT})
//   .then(function(response) {
//     console.log(response);
//     // We don't need spread here, since only the results will be returned for select queries
//   })

app.use(bodyParser.json());
app.use(cors());

// TODO: # ver como le puedo pasar el tamanio de un pixel para la precision de consulta por puntos
app.post('/test', (req, res) => {
  console.log(`request received`);
  // console.log(req.body.coordinates);
  // console.log(`COORDINATES LENGTH:`, req.body.coordinates.length);
  // console.log(`LASTA LAYER!!`, req.body.lastLayerActive);

  let { coordinates, lastLayerActive } = req.body;
  let wkt;
  let consulta = `SELECT * FROM "${lastLayerActive}"`;

  if (coordinates.length == 2) {
    //es un punto [lon,lat]
    console.log(`ES UN PUNTO!`);
    wkt = 'POINT(' + coordinates[0] + ' ' + coordinates[1] + ')';

    consulta = consulta.concat(`WHERE
      st_dwithin(
        ST_geomfromtext('${wkt}', 4326),
        geom,
        0.1
      )
    `);
  } else {
    //es un poligono en la forma [ [ [lon,lat],[lon,lat],....] ]
    console.log(`ES UN POLIGONO (DRAGBOX O CUALQUIER FORMA)!`);
    wkt = 'POLYGON((';
    for (var i = 0; i < coordinates[0].length - 1; i++) {
        wkt += coordinates[0][i][0] + ' ' + coordinates[0][i][1] + ',';
    }
    wkt += coordinates[0][0][0] + ' ' + coordinates[0][0][1] + '))';

    consulta = consulta.concat(`WHERE
      st_intersects(
        ST_geomfromtext('${wkt}', 4326),
        geom
      )
    `);
  }
  // console.log(`THIS IS WKT:`, wkt);

  sequelize.query(consulta, { type: sequelize.QueryTypes.SELECT})
    .then(function(response) {
      // console.log(response);
      // console.log(`TAMANIO DE LA CONSULTA`, response.length);
      res.send(response);
      // We don't need spread here, since only the results will be returned for select queries
    })
    .catch(err => res.send(err))

  // res.send({message: "ok"});
});


app.listen(3005, () => {
  console.log('Server listening on port 3005');
});