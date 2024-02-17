const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Define the Users schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
});

//password hashing and salting

userSchema.pre('save', async function (next) {
    try{
        const salt = await bcrypt.genSalt(+ process.env.SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt); //hashed password //throwing error
        next();
    }catch (err){
        console.log(err);
        next(err);
    }
})


// Create an index for the email field
userSchema.index({ email: 1 });

// Create the Users model
const User = mongoose.model('User', userSchema);

// Export the model for use in other files
module.exports = User;
