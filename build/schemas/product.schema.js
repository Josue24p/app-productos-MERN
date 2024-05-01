"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProductSchema = void 0;
var _zod = require("zod");
var createProductSchema = exports.createProductSchema = _zod.z.object({
  name: _zod.z.string({
    required_error: 'name is required'
  }),
  category: _zod.z.string({
    required_error: 'Category must be a string'
  }),
  price: _zod.z.number({
    required_error: 'Price is number required'
  }),
  imgURL: _zod.z.string({
    required_error: 'Insert url of the image'
  }).optional()
});