import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        // unique: true,
        trim: true,

    },
    description: {
        type: String,
        required: true,
        trim: true,

    },
    avatar: {
        type: String,//Cloudinary Url
        require:true,
    },
    coverImage: {
        type: String,//Cloudinary Url
        required: true,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",                             //Collection name
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

export const Blog = mongoose.model("Blog", blogSchema);

//  default Blog;
