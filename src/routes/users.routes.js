import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/me', authenticate, UserController.me);
router.put('/me', authenticate, UserController.updateMe);
router.get('/', authenticate, authorize(['admin']), UserController.findAll);

export default router;