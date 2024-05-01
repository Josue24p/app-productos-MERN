"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerSchema = exports.loginSchema = void 0;
var _zod = require("zod");
//validación de datos para el formulario de registro
var registerSchema = exports.registerSchema = _zod.z.object({
  username: _zod.z.string({
    required_error: 'Username is required'
  }),
  email: _zod.z.string({
    required_error: 'Email is required'
  }).email({
    message: 'Invalid email'
  }),
  password: _zod.z.string({
    required_error: 'Password is required'
  }).min(6, {
    message: 'Password must be at least 6 characters'
  })
});

//validación de datos para login
var loginSchema = exports.loginSchema = _zod.z.object({
  email: _zod.z.string({
    required_error: 'Email is required'
  }).email({
    message: 'Invalid email'
  }),
  password: _zod.z.string({
    required_error: 'Password is required'
  }).min(6, {
    message: 'Password must be at least 6 characters'
  })
});