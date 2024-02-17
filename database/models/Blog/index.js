const mongoose = require('mongoose');
const User = require("../User");


// Define the ServiceProviders schema
const blogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
},{
    timestamps: true,
});

blogSchema.pre('save', async function (next) {
    const session = await Blog.startSession();
    session.startTransaction();
    try{
        const user = await User.findById(this.userId);
        if(user) {
            next();
        } else{
            const error = new Error(`Invalid User`);
            error.name = "ValidationError";
            next(error);
        }
    }catch (err) {
        console.log(err)
        next(err)
    }
})

//
// blogSchema.post(['save','findOneAndUpdate'], async function (doc, next) {
//     const session = await Blog.startSession();
//     session.startTransaction();
//     try {
//         await User.findByIdAndUpdate(doc.userId, {blog: doc._id})
//         await session.commitTransaction();
//         console.log("User updated")
//     }catch (err) {
//         await session.abortTransaction();
//         console.log(err)
//         await doc.remove();
//     }finally {
//         await session.endSession();
//     }
//     next();
// })


// Create an index for the title field
blogSchema.index({ title: 1 });
// Create the ServiceProviders model
const Blog = mongoose.model('Blog', blogSchema);

// Export the model for use in other files
module.exports = Blog;
