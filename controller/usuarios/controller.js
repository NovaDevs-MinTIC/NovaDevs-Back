import {ObjectId} from 'mongodb';
import { getDB } from '../../db/db.js';

const queryUsuarios = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').find({}).limit(50).toArray(callback);
  };
  
  const crearUsuario = async (datosUsuario, callback) => {
    if (
      Object.keys(datosUsuario).includes('nombre') &&
      Object.keys(datosUsuario).includes('correo') &&
      Object.keys(datosUsuario).includes('rol') &&
      Object.keys(datosUsuario).includes('estado')
    ) {
      const baseDeDatos = getDB();
      // implementar código para crear vehículo en la BD
      await baseDeDatos.collection('usuario').insertOne(datosUsuario, callback);
    } else {
      return 'error';
    }
  };
  
  /*CAMBIAR EL ID SI HAY PROBLEMAS */
  const consultarUsuario = async (id, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').findOne({ _id: new ObjectId(id) }, callback);
  };
  
  const editarUsuario = async (id, edicion, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const operacion = {
      $set: edicion,
    };
    const baseDeDatos = getDB();
    await baseDeDatos
      .collection('usuario')
      .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
  };
  
  const eliminarUsuario = async (id, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').deleteOne(filtroUsuario, callback);
  };
  
  export { queryUsuarios, crearUsuario, consultarUsuario, editarUsuario, eliminarUsuario };
  