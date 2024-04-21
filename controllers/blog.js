import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../ApiError.js";
import { Blog } from "../models/blog.js";
import { uploadOnCloudinary } from "../fileUploder/cloudinary.js";
import { ApiResponse } from "../ApiResponse.js";

export const addblog = asyncHandler(async (req, res) => {
    //title 
    //description
    // validation - not empty
    //check title same if title same exist not save uniue title
    //check for Images , Check for Avatar
    //Upload them on Cloudinary, Avatar and Image check
    //Create User object -  Create entry in DB
    //return res

    const { title, description } = req.body;
    // console.log("title", title);
    if (title === "") {
        throw new ApiError(400, "tile is required")
    }
    if (description === "") {
        throw new ApiError(400, "description is required")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar || !coverImage) {
        throw new ApiError(400, "Error uploading files to Cloudinary");
    }
    const blog = await Blog.create({
        title,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        description,
        user: req.user,

    })
    const createdBlog = await blog.save();
    return res.status(201).json(new ApiResponse(200, createdBlog, "Blog added successfully"));
})

export const getMyAllPost = asyncHandler(async (req, res) => {

    const userid = req.user._id;//Only one user all task display
    const posts = await Blog.find({ user: userid });
    res.status(200).json({
        success: true,
        posts,
    });
})

export const deleteblog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return next(new ErrorHandler("Invaild Id", 404));
    await blog.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Task Deleted Successfully'

    });

})