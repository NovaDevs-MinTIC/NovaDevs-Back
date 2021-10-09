import Express from "express"; 
import { MongoClient } from "mongodb";

const stringConexion = 'mongodb+srv://nberrio:Learningtocode*@proyectoprueba.jj9ov.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const cliente = MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const app = Express();

app.use(Express.json());

app.get('/productos', (req, res)=> {
    console.log('Alguien hizo get en la ruta /productos');
    const productos = [
        {idproducto : '1010', descripcion : 'Adidas Stan Smith', valorunitario : 250000, estado : 'No Disponible'},
        {idproducto: '2020', descripcion : 'Adidas Ultra Bost', valorunitario : 265000, estado : 'Disponible'},
        {idproducto: '3030', descripcion : 'Nike Stefan Janoski', valorunitario : 300000, estado : 'No Disponible'},
    ];
    res.send(productos);
});

app.post('/productos/nuevo', (req, res) => {
    res.send('ok, producto creado');
});

app.listen(5000, ()=>{
    console.log('escuchando puerto 5000');
});