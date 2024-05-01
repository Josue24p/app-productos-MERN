import jwt from 'jsonwebtoken'
import config from '../config'

import User from '../models/User';
import Role from "../models/Role";

export const  verifyToken = async (req,res) => {
try {
        //para recibir las cookies instalar npm i cookie-parser para  que pueda leerlas y usarlo en app
        const {token} = req.cookies

        // si no hay un token y no hay nada, se retorna error
        if (!token) return res.status(401).json({message: 'No token, authorization  denied'})
        
        //verificar token, si es el token generado
    
        jwt.verify(token, config.SECRET, async (err, user) => {
            if (err) return res.status(401).json({message: 'Invalide token'})

            req.user = user
            const userFound = await  User.findById(req.user.id);
            if(!userFound) return res.status(401).json({message: "Unauthorized"})
            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                role: userFound.roles,
            })
        })
} catch (error) {
    console.log(error)
}
    
}

export const isModerator = async (req, res, next) =>{
    const user = await User.findById(req.user.id)
    const roles = await Role.find({_id: {$in: user.roles}})
    
    for(let i = 0; i < roles.length;i++){
        if(roles[i].name === 'moderator'){
            next();
            return;
        }
    }

    return res.status(403).json({message: 'Require Moderator role'})

}

export const isAdmin = async (req, res, next) =>{
    const user = await User.findById(req.user.id)
    const roles = await Role.find({_id: {$in: user.roles}})
    
    for(let i = 0; i < roles.length;i++){
        if(roles[i].name === 'admin'){
            next();
            return;
        }
    }

    return res.status(403).json({message: 'Require Admin role'})
}

export const authRequired = (req, res, next) => {
  try {
    const {token} = req.cookies;

    if(!token)
    return res.status(401).json({message: 'No token, authorization denied'})

    jwt.verify(token, config.SECRET, (err, user) =>{
        if(err) return res.status(403).json({message: 'Invlid token'})

        req.user = user
        next();
    })
  } catch (error) {
    console.log(error)
  }
}