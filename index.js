import App from './config/app.js';
// const express = require( 'express' );
// const dotenv = require( 'dotenv' );
// const app = express();




// app.use(
//     express.urlencoded({
//         extended: true
//     })
// );

// app.use(express.json())

// initialize configuration
// dotenv.config();

const port = process.env.APP_PORT || 8081; // default port to listen

App.app.listen(port, () => console.log(`API is running. port: ${port}`));

// define a route handler for the default home page
// app.get( '/', ( req, res ) => {
//     res.send( "Hola Mundo!" );
// });

// app.post('/data', (req, res) => {
//     const data = req.body;
//     console.log('data from front', data);
//
//     for(let i in data.books) {
//         console.log('Libros leidos -> ', data.books[i].name );
//     }
//
//     res.json({
//         ok: true,
//         message: 'data recieved'
//     });
// });

// start the Express server
// app.listen( port, () => {
//     console.log( `server started at http://localhost:${ port }` );
// } );
