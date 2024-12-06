import authController from '@/controllers/authController';
import loginLimiter from '@/middleware/loginLimiter';
import Express from 'express';

const router = Express.Router();
router.route('/').post(loginLimiter, authController.login);
router.route('/refresh').get(authController.refresh);
router.route('/logout').post(authController.logout);

export default router;
