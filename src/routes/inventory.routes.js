import { Router } from 'express';
const router = Router()
import {addProductInventory,deleteProduct,updateProduct,getProducts, addCategory} from '../controllers/products.controllers.js'

//obtenemos todos los productos
router.get("/api/inventario",getProducts, (req, res) => {})
//agregamos un producto
    .post("/api/inventario",addProductInventory,(req, res) => {})
//actualizamos un producto
    .put("/api/inventario",updateProduct,(req, res) => {})
//eliminamos un producto
    .delete("/api/inventario/:id",deleteProduct,(req, res) => {})
//añadimos la ruta para crear categoria
router.post('/api/categorias', addCategory, (req, res) => {});
    
export default router;


