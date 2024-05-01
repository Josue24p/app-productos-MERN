import { Router } from "express";

const router = Router()

import * as authCtrl from '../controllers/auth.controller'
import {verifySignup,authJwt, validateSchema} from '../middlewares'
import {registerSchema,loginSchema} from '../schemas/auth.schema';

//AUTENTICACIÓN
router.post('/signup', 
[validateSchema(registerSchema),verifySignup.checkDuplicateUsernameOrEmail,
verifySignup.checkRolesExisted], authCtrl.signUp)

router.post('/signin', validateSchema(loginSchema),authCtrl.signin)

router.post('/logout',authCtrl.logout)

router.get('/profile', authJwt.verifyToken,authCtrl.profile)

router.get('/verify', authJwt.verifyToken)

export default router;