import mongoose from "mongoose";
import config from './config'
mongoose.connect('mongodb://127.0.0.1:27017/companydb')
.then(db => console.log("Db is connected"))
.catch(err => console.error(err));