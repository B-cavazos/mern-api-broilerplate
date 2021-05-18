import express from 'express';
import User from '../models/user.js'; //.js for files we create
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    try{
        let saltRounds = 10;
        let salt = await bcrypt.genSalt(saltRounds);
        let hash = await bcrypt.hash(password, salt);
        return hash;
    }catch(err){
        return err;
    }
}

export const userRoute = express.Router();

//creating an endpoint

userRoute
.route("/")
.get(async (req, res)=>{
    try{
        const users = await User.find({deletedAt:null}) //get all the User from mongoDB that havent been soft deleted
        res.json(users); //parse result as a json object
    }catch(err){
        res.send({message: err});
    }
}).post(async (req,res)=>{ //save a User
    let _user = req.body;
    try{
        _user.email = _user.email.toLowerCase();
        _user.password = await hashPassword(_user.password);

        const user = new User(_user);//new instance of User object
        const data = await user.save();

        data.password = undefined;
        res.send(data);
    }catch(err){
        res.send({message: err})
    }
});

//grab a single user from mongoDB
userRoute
.route("/:userId")
.get(async (req, res)=>{
    let userId = req.params.userId;
    try{
        const user = await User.findById(userId)
        res.json(user);
    }catch(err){
        res.send({message: err});
    }
}).put(async(req, res)=>{  //update a user (by id)
    let userId = req.params.userId;
    let user = req.body;
    try{
        const updatedUser=await User.updateOne({_id:userId}, user);
        res.json(updatedUser);
    }catch(err){
        res.send({message: err});
    }
}).delete(async(req, res)=>{ //soft delete a user (by id)
    try{
        let userId = req.params.userId;
        const user = await User.findOne({_id:userId});
        if(!user) res.send({message: 'no user was found'});

        await user.updateOne({deletedAt: new Date()})
        res.json({message: 'successfully deleted', userId: user._id}); //bc will display info before (soft) deletion
    }catch(err){
        res.send({message: err});
    }
})