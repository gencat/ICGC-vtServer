require('dotenv').config();
const { Pool, Client } = require('pg');
const express = require('express');
const app = express();
const cluster = require('cluster');
const cors = require('cors');
//const router = express.Router();

const config = {
	user: process.env.DB_USER || 'postgres',
	host: process.env.DB_HOST || 'localhost',
	database: process.env.DB_DATABASE || 'postgres',
	password: process.env.DB_PASS || 'postgres',
	port: process.env.DB_PORT || 5432,
	ssl: {
    	rejectUnauthorized: false
  	}
};

const pool = new Pool(config);

const HOST = process.env.SERVER_HOST || '0.0.0.0';
const PORT = process.env.SERVER_PORT || 3333;					   
// Code to run if we're in the master process
if (cluster.isMaster) {

	// Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
	}

	// Listen for dying workers
    cluster.on('exit', function (worker) {

        // Replace the dead worker, we're not sentimental
        console.log('Worker %d died :(', worker.id);
        cluster.fork();

    });
	
// Code to run if we're in a worker process
} else {	

	//app.use('/tiles', router);

	app.use(cors());
	app.use(express.static('static'));

	app.get('/', function (req, res) {
		res.send('Hello World!');
	});
	
	/* GET /tiles/:z/:x/:y.mvt */
	/* Retreive a vector tile by tileid */
	app.get('/:z/:x/:y.pbf', async (req, res) => {
		let { z, x, y } = req.params;

		//res.send(`SELECT tile_pbf(${z}, ${x}, ${y})`);
		//convert to TMS
		//y = Math.pow(2, z) - y - 1;

		//console.log(`SELECT public.tile_pbf(${z}, ${x}, ${y})`);

		const SQL = `SELECT public.tile_pbf(${z}, ${x}, ${y})`;

		res.setHeader('Content-Type', 'application/x-protobuf');

		pool.query(SQL, (err, result) => {
			console.log(err, result)
			//pool.end()
			res.send(result.rows[0].tile_pbf);
		});
	});

	app.listen(PORT,HOST, function () {
		console.log('Example app listening on port '+PORT+'!');
	});
}