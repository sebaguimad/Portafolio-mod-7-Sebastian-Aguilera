import app from "./app.js"
import {sequelize} from "./db/db.js";

import './models/Producto.model.js'
import './models/Vendedor.model.js'
import './models/Orden.model.js'
import './models/Detalle-orden.model.js'
import './models/Detalle-carrito.model.js'
import './models/Carrito.model.js'
import './models/Direccion.model.js'
import './models/Descuento.model.js'
import './models/Comentario.model.js'
import './models/Cliente.model.js'
import './models/Categoria.model.js'
import './models/Cupon.model.js'
import './models/relaciones.js'


const main = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Conectado con éxito')
        await sequelize.sync({force:false ,alter:false, create:false});
        //rescatamos el valor del puerto y en caso de error dejamos por defecto el puerto 3000
        let PORT = process.env.PORT || 3000;
        app.listen(PORT , ()=>console.log("Servidor escuchando en http://localhost:" + PORT))
    } catch (error) {
        console.log(error)
        console.log('Ha ocurrido un error')
    }
}

main();