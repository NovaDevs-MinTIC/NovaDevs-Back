import Express from 'express';
import {
    queryListaProducto,
    crearProducto,
    eliminarProducto,
    editarProducto,
    consultarProducto,
} from '../../controller/producto/controller.js';
  
const rutasProducto = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los productos');
  } else {
    res.json(result);
  }
};

rutasProducto.route('/productos').get((req, res) => {
  console.log('alguien hizo get en la ruta /productos');
  queryListaProducto(genercCallback(res));
});

rutasProducto.route('/productos').post((req, res) => {
  crearProducto(req.body, genercCallback(res));
});

rutasProducto.route('/productos/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /productos');
  consultarProducto(req.params.id, genercCallback(res));
});

rutasProducto.route('/productos/:id').patch((req, res) => {
  editarProducto(req.params.id, req.body, genercCallback(res));
});

rutasProducto.route('/productos/:id').delete((req, res) => {
  eliminarProducto(req.params.id, genercCallback(res));
});

export default rutasProducto;