"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userSchema = new _mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true //esto es para obviar los espacios de los costados
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    ref: 'Role',
    type: _mongoose.Schema.Types.ObjectId
  }]
}, {
  timestamps: true,
  versionKey: false
});

/* userSchema.statics.encryptPassword = async  (password) => {
    const salt = await bcrypt.genSalt(10) //salt cadena de caracteres aleatorio para mayor seguridad
    return await bcrypt.hash(password, salt) //se agrega la cadena del salt a la contraseña cifrada por el hash
} */

/* userSchema.statics.comparePassword = async (password, receivedPassword) =>{
    return await bcrypt.compare(password, receivedPassword) //compara la contraseña que ya se guardó con la que está tipeando
}
 */
var _default = exports["default"] = (0, _mongoose.model)('User', userSchema);