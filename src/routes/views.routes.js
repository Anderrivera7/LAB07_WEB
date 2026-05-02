import express from 'express';
import ViewController from '../controllers/ViewController.js';

const router = express.Router();

router.get('/', (req, res) => res.redirect('/signin'));
router.get('/signin', ViewController.signIn);
router.get('/signup', ViewController.signUp);
router.get('/profile', ViewController.profile);
router.get('/dashboard-user', ViewController.userDashboard);
router.get('/dashboard-admin', ViewController.adminDashboard);
router.get('/403', ViewController.forbidden);

export default router;