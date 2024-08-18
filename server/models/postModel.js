const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: { type: String, required: true }, // Only one title definition
    category: { 
        type: String, 
        enum: {
            values: ["Agriculture", "Business", "Education", "Entertainment", "Art", "Technology"], 
            message: "{VALUE} is not a supported category" 
        },
        required: true
    },
    description: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" }, // References User model
    thumbnail: { type: String, required: true }, // Only one title definition
}, { timestamps: true });

const Post = model('Post', postSchema);

module.exports = Post;
