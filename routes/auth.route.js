import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';

const router = express.Router();

router.post('/register', [
        body('email','Formato de email incorreto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', 'Mínimo 6 carácteres').trim().isLength({ min: 6 }),
        body('password', 'Formato de password incorreto')
            .custom((value, { req }) => {
                if (value !== req.body.repassword) {
                    throw new Error('As senhas não coincidem')
                }
                return value;
            }
        ),  
    ], 
    validationResultExpress,
    register
    );

router.post('/login',
    [
        body("email", "Formato de email incorreto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Mínimo 6 caracteres").trim().isLength({min: 6}),
    ],
    validationResultExpress,
    login
);

export default router;