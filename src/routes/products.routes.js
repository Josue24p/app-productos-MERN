import { Router } from "express";
const router = Router()

import * as productsCtrl from "../controllers/products.controller";
import { authJwt, validateSchema} from "../middlewares";
import {createProductSchema} from '../schemas/product.schema';
import upload from '../middlewares/upload' // Asegúrate de importar multer configurado

router.post('/',authJwt.authRequired, upload.single('imgURL'), productsCtrl.createProduct)

router.get('/', authJwt.authRequired,productsCtrl.getProducts)

router.get('/:productId', authJwt.authRequired,productsCtrl.getProductById)

router.put('/:productId', authJwt.authRequired, upload.single('imgURL'),productsCtrl.updateProductById)

router.delete('/:productId',authJwt.authRequired, productsCtrl.deleteProductById)

export default router;