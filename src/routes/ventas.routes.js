
import { Router } from 'express';
const router = Router();
import { createOrden ,getVentas} from '../controllers/ventas.controllers.js';
router.get("/api/ventas",getVentas, (req, res) => {})
.post("/api/ventas",createOrden ,(req, res) => {})

//add product to cart

export default router;