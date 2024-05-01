"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _cors = _interopRequireDefault(require("cors"));
var _inititalSetup = require("./libs/inititalSetup");
var _products = _interopRequireDefault(require("./routes/products.routes"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
(0, _inititalSetup.createRoles)();
app.set('pkg', _package["default"]);
app.use((0, _cors["default"])({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.get('/', function (req, res) {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
});
app.use('/api/products', _products["default"]);
app.use('/api/auth', _auth["default"]);
app.use('/api/users', _user["default"]);
var _default = exports["default"] = app;