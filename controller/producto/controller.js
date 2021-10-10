import {ObjectId} from 'mongodb';
import { getDB } from '../../db/db.js';

const queryListaProducto = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto').find({}).limit(50).toArray(callback);
  };
  
  const crearProducto = async (datosProducto, callback) => {
    if (
      Object.keys(datosProducto).includes('_id') &&
      Object.keys(datosProducto).includes('descripcion') &&
      Object.keys(datosProducto).includes('valorU') &&
      Object.keys(datosProducto).includes('estadoP')
    ) {
      const baseDeDatos = getDB();
      // implementar código para crear vehículo en la BD
      await baseDeDatos.collection('producto').insertOne(datosProducto, callback);
    } else {
      return 'error';
    }
  };
  
  /*CAMBIAR EL ID SI HAY PROBLEMAS */
  const consultarProducto = async (id, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto').findOne({ _id: new ObjectId(id) }, callback);
  };
  
  const editarProducto = async (id, edicion, callback) => {
    const filtroProducto = { _id: new ObjectId(id) };
    const operacion = {
      $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
      .collection('producto')
      .findOneAndUpdate(filtroProducto, operacion, { upsert: true, returnOriginal: true }, callback);
  };
  
  const eliminarProducto = async (id, callback) => {
    const filtroProducto = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('producto').deleteOne(filtroProducto, callback);
  };
  
  export { queryListaProducto, crearProducto, consultarProducto, editarProducto, eliminarProducto };
  