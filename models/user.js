import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({ //arg is object we create
    firstName: {type: String, default: null}, //camelCasing: {object: type, default: value}
    lastName:  {type: String, default: null},
    email:  {type: String, default: null},
    password:  {type: String, default: null, select: false}, //select: false = never return pw unless we use code to render it
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deletedAt: {type: Date, default: null},
}); 

const User = mongoose.model('User', UserSchema); //mongoose.model(name of model, schemaName)

export default User;