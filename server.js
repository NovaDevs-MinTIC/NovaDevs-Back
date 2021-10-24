import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasProducto from './views/productos/rutas.js';
import rutasUsuario from './views/usuarios/rutas.js'
import rutasVenta from './views/ventas/rutas.js'
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

dotenv.config({ path: './.env' });

const port = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://novadevs.us.auth0.com/.well-known/jwks.json'
}),
audience: 'api-autenticacion-novadevs',
issuer: 'https://novadevs.us.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck);
app.use(rutasProducto);
app.use(rutasUsuario);
app.use(rutasVenta);

const main = () => {
  return app.listen(port, () => {
    console.log(`escuchando puerto ${port}`);
  });
};

conectarBD(main);