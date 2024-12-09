import express from 'express'
import  {ListProducts, SingleProduct, AddProduct, RemoveProduct} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1}, {name:'image3', maxCount:1}, {name:'image4', maxCount:1}]),  AddProduct);
productRouter.post('/remove', adminAuth, RemoveProduct);
productRouter.post('/single', SingleProduct);
productRouter.get('/list', ListProducts);

export default productRouter