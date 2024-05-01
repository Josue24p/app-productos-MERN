import User from '../models/User'
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt';

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            /* await User.encryptPassword(password) */
        })
        //agregar roles al nuevo usuario
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRoles.map(role => role._id)
        } else {
            const role = await Role.findOne({ name: 'user' })
            newUser.roles = [role._id];
        }
        //es asincrono por lo que se usa el await, para no esperar la ejecución de esto y no utilizar 
        const savedUser = await newUser.save(); //guardamos el usuario en la bd
        console.log(savedUser);

        /*Creación del token para el usuario
        mediante sign (registrar)
        ({},'',{}) 
        {}1ro: que dato voy a guardar dentro del token
        ''2do: una palabra secreta que voy a utilizar para generar el token
        {}3ro: obejto de configuracion
        */
        /*1ra forma de hacer
        const token = jwt.sign({id: savedUser._id},config.SECRET,{
            expiresIn: 86400 // 1 dia en segundos //24 hours
        }) */
        //2da forma
        const token = await createAccessToken({ id: savedUser._id })
        //mostrar mensaje de json // son datos para que la interfaz de front-end lo use
        res.cookie('token', token)
        res.status(200).json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            createAt: savedUser.createdAt,
            updateAt: savedUser.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const signin = async (req, res) => {
    /*vamos a traer los datos del usuario
    el usuario nos da un email y password
    buscar si el email existe en la bd
    */
    try {
        const userFound = await User.findOne({ email: req.body.email }).populate('roles');

        if (!userFound) {
            return res.status(400).json({ message: 'User not found' })
        }


        const matchPassword = await bcrypt.compare(req.body.password, userFound.password)
        /*     const matchPassword = await User.comparePassword(req.body.password,userFound.password)
         */
        if (!matchPassword) return res.status(401).json({message: 'Invalid password' })

        const token = await createAccessToken({ id: userFound._id })

        res.cookie('token', token)
        res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createAt: userFound.createdAt,
            updateAt: userFound.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    res.cookie('token',"",{
        expires: new Date(0), 
    });
    return res.sendStatus(200);
}

export const profile = async (req,res) => {
try {
    const userFound= await User.findById(req.user.id)
    if (!userFound) {
        return res.status(400).json({message: 'User not found '})
    }
    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        role: userFound.roles,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
} catch (error) {
    console.log(error)
    res.status(500).json({message: 'Internal server error'})
}
}