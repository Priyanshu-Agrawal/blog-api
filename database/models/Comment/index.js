const mongoose = require("mongoose");
const User = require("../User");
const Blog = require("../Blog");

const commentSchema = new mongoose.Schema({
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
})


commentSchema.index({ blogId: 1, userId: 1}, { unique: true });


commentSchema.post('save', async function (doc) {
    const session = await Comment.startSession();
    session.startTransaction();
    try {
        const user = await User.findById(doc.userId);
        if (user) {
            user.blog = doc._id;
            await user.save();
            await session.commitTransaction();
        }else{
            const error = new Error(`Invalid User`);
            error.name = "ValidationError";
            next(error);
        }
    }catch (err) {
        await session.abortTransaction();
        console.log(err)
        await doc.remove();
    }finally {
        await session.endSession();
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;