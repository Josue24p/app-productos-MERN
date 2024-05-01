"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("./config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_mongoose["default"].connect('mongodb://127.0.0.1:27017/companydb').then(function (db) {
  return console.log("Db is connected");
})["catch"](function (err) {
  return console.error(err);
});