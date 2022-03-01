import express from 'express'

const app = express();

export class Routes {

    routes(app = express.application) {

        app.get( '/', ( req, res ) => {
            res.send( "Hola Mundo!" );
        });

        app.post('/data', (req, res) => {
            const data = req.body;
            console.log('data from front', data);

            for(let i in data.books) {
                console.log('Libros leidos -> ', data.books[i].name );
            }

            res.json({
                ok: true,
                message: 'data recieved'
            });
        });

    }
}
