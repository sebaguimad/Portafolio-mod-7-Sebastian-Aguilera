import express, { json, urlencoded } from 'express';
const app = express();
//llamamos a la biblioteca path de mandera de poder unir archivos
import { join ,dirname} from 'path';
import { fileURLToPath } from 'url';

// obtenemos una funcion de exhbs
import { create } from 'express-handlebars';
import cors from 'cors';

//importamos las rutas
//rutas iniciales de la pagina

// //rutas front end
import routerViews from './routes/views.routes.js';
//prueba api-rest
import apiPorductos from './routes/productos.routes.js';
import apiInventario from './routes/inventory.routes.js';
import carrito from './routes/carritos.routes.js'
import apiVentas from './routes/ventas.routes.js'
import err404 from './routes/404.routes.js'

//en caso de utilizar envio entre servidores
app.use(express.json());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors())
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//union de archivos estaticos y rutas dinamicas
app.use(express.static(join(__dirname, 'public')));
//inicio de rutas
///prueba
app.use(carrito)
app.use(apiPorductos)
app.use(apiInventario)
app.use(apiVentas)
app.use(routerViews)

// 
app.use(err404)

//asignamos la union de los archivo views
app.set("views", join(__dirname, "views/"));
//configuracion de motor hbs
const hbs = create({
  //se define la pagina principal la cual contendra todo
  defaultLayout: "main",
  //definimos y unimos los layouts y partials
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  //definimos la extencion a utilizar
  extname: ".handlebars",
});
app.engine(".handlebars", hbs.engine);
app.set("view engine", ".handlebars");


export default app;