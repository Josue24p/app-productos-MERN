import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true //esto es para obviar los espacios de los costados
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    },
    ],
},
    {
        timestamps: true,
        versionKey: false,
    }
);

/* userSchema.statics.encryptPassword = async  (password) => {
    const salt = await bcrypt.genSalt(10) //salt cadena de caracteres aleatorio para mayor seguridad
    return await bcrypt.hash(password, salt) //se agrega la cadena del salt a la contraseña cifrada por el hash
} */

/* userSchema.statics.comparePassword = async (password, receivedPassword) =>{
    return await bcrypt.compare(password, receivedPassword) //compara la contraseña que ya se guardó con la que está tipeando
}
 */
export default model('User', userSchema)