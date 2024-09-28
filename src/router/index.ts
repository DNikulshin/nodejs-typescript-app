import { Router } from 'express'
import testController from '../controllers/test.controller.js'
import userController from '../controllers/user.controller.js'
import { body } from 'express-validator'
import authMiddleware from '../midddleware/auth.middleware.js'
import roleMiddleware from '../midddleware/role.middleware.js'
import {
  ACTIVATE_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
  REFRESH_PATH,
  REGISTRATION_PATH, TEST_PATH,
  USERS_PATH,
  USERS_PATH_BY_ID,
} from '../constants/index.js'


const router = Router()

router.post(REGISTRATION_PATH,
  body('email')
    .isEmail()
    .withMessage('Некоррекный email')
  ,
  body('password')
    .isLength({ min: 6, max: 32 })
    .withMessage('Пароль должен быть не менее 6 символов')
  ,
  userController.registration)
router.post(LOGIN_PATH,
  body('email')
    .isEmail()
    .withMessage('Некоррекный email'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Пароль не может быть пустым')
  ,
  userController.login)
router.post(LOGOUT_PATH, userController.logout)
router.get(ACTIVATE_PATH, userController.activate)
router.get(REFRESH_PATH, userController.refresh)
router.get(USERS_PATH, roleMiddleware(['ADMIN', 'USER']), authMiddleware, userController.getUsers)
router.delete(USERS_PATH_BY_ID, roleMiddleware(['ADMIN']), authMiddleware, userController.removeUserByID)
router.get(TEST_PATH, testController.alive)


export default router
