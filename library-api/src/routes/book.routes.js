import { Router } from 'express';
import * as bookController from '../controllers/book.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import validateBook from '../middlewares/validateBook.middleware.js';

const router = Router();

router.use(authenticate);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/', validateBook, bookController.createBook);
router.put('/:id', validateBook, bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
