const User = require('../models/UserModels'); 
const Post = require('../models/postModel');
const fs = require('fs'); 
const path = require('path'); 
const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/errorModel'); 



const createPost = async (req, res, next) => {
    try {
        let { title, category, description } = req.body;
        const thumbnail = req.files ? req.files['thumbnail '] : null;

        // Trim spaces from body keys
        title = title.trim();
        category = category.trim();
        description = description.trim();

        // Validate required fields
        if (!title || !category || !description || !thumbnail) {
            return next(new HttpError("Fill in all required details", 422));
        }

        // Check if thumbnail size is too big
        if (thumbnail.size > 5000000) {
            return next(new HttpError("Thumbnail size is too big", 422));
        }

        // Create a new filename for the thumbnail
        const filename = thumbnail.name.trim(); // Trim any extra spaces
        const splittedFilename = filename.split('.');
        const newFilename = `${splittedFilename[0]}-${uuidv4()}.${splittedFilename[1]}`;

        // Move the thumbnail to the uploads folder
        thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError("Failed to upload thumbnail", 500));
            } else {
                // Create a new post
                const newPost = new Post({
                    title,
                    category,
                    description,
                    thumbnail: newFilename,
                    creator: req.user.userId
                });

                await newPost.save();

                // Update the user's post count
                const currentUser = await User.findById(req.user.userId);
                if (!currentUser) {
                    return next(new HttpError("User not found", 404));
                }

                currentUser.posts += 1;
                await User.findByIdAndUpdate(req.user.userId, { posts: currentUser.posts });

                res.status(201).json({ message: "Post created successfully", post: newPost });
            }
        });
    } catch (error) {
        return next(new HttpError("Post creation failed", 500));
    }
};







const getPosts = async (req, res, next) => {
    try {
        // Fetch posts from the database and sort by the most recently updated
        const posts = await Post.find().sort({ updatedAt: -1 });

        // Return posts directly as an array in the response body
        res.status(200).json(posts);
    } catch (error) {
        // Handle any errors by passing them to the error handling middleware
        return next(new HttpError("Failed to fetch posts", 500));
    }
};


const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id; // Extract post ID from request parameters
        const post = await Post.findById(postId); // Find the post by ID

        if (!post) {
            return next(new HttpError("Post not found", 404)); // Handle case where post is not found
        }

        res.status(200).json({ post }); // Send the post in response
    } catch (error) {
        return next(new HttpError("Failed to retrieve post", 500)); // Handle other errors
    }
};



const getCatPosts = async (req, res, next) => {
    try {
        const { category } = req.params; // Extract category from request parameters
        // if (!category) {
        //     return next(new HttpError("Category is required", 422)); // Handle case where category is missing
        // }

        const catPosts = await Post.find({ category }) // Find posts by category
            .sort({ createdAt: -1 }); // Sort by createdAt in descending order

        if (catPosts.length === 0) {
            return next(new HttpError("No posts found for this category", 404)); // Handle case where no posts are found
        }

        res.status(200).json({ posts: catPosts }); // Send the posts in response
    } catch (error) {
        return next(new HttpError("Failed to retrieve posts", 500)); // Handle other errors
    }
};


const getUserPosts = async (req, res, next) => {
    try {
        const { id } = req.params;
        // console.log('Fetching posts for userId:', id); // Log userId
        // Make sure userId is in the correct format if it should be an ObjectId
        // Uncomment this if using MongoDB ObjectId
        // const mongoose = require('mongoose');
        // const userObjectId = mongoose.Types.ObjectId(userId);
        
        const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
        // console.log('Posts found:', posts); // Log result
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError("Failed to retrieve posts", 500));
    }
};

const editPost = async (req, res, next) => {
    try {
        const { title, category, description } = req.body;  // Field names should be lowercase
        const postId = req.params.id; // Extract postId from URL params

        // console.log("Request body:", req.body);
        // console.log("Request files:", req.files);

        // Validation check
        if (!title || !category || !description || description.length < 12) {
            return next(new HttpError("Fill in all fields and ensure description is at least 12 characters", 422));
        }

        let updatedPost;

        // Handle file upload
        if (req.files && req.files.thumbnail) {
            const thumbnail = req.files.thumbnail;

            if (thumbnail.size > 5000000) { // Check file size
                return next(new HttpError("Thumbnail is too big", 422));
            }

            const oldPost = await Post.findById(postId);
            if (oldPost && oldPost.thumbnail) {
                fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), (err) => {
                    if (err) {
                        console.error("Failed to delete old thumbnail:", err);
                    }
                });
            }

            const filename = thumbnail.name;
            const splittedFilename = filename.split('.');
            const newFilename = `${splittedFilename[0]}-${uuidv4()}.${splittedFilename[1]}`;

            // Save the new thumbnail
            await thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename));

            // Update post with new thumbnail
            updatedPost = await Post.findByIdAndUpdate(postId, {
                title,
                category,
                description,
                thumbnail: newFilename
            }, { new: true });
        } else {
            // Update post without changing the thumbnail
            updatedPost = await Post.findByIdAndUpdate(postId, {
                title,
                category,
                description
            }, { new: true });
        }

        // Check if the post was updated
        if (!updatedPost) {
            return next(new HttpError("Post not found", 404));
        }

        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        console.error("Error updating post:", error);
        return next(new HttpError("Failed to update post", 500));
    }
};



const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id; // Extract postId from URL params

        const post = await Post.findById(postId);

        if (!post) {
            return next(new HttpError("Post not found", 404));
        }

        // Delete the associated thumbnail if it exists
        if (post.thumbnail) {
            const thumbnailPath = path.join(__dirname, '..', 'uploads', post.thumbnail);
            fs.unlink(thumbnailPath, (err) => {
                if (err) {
                    console.error("Failed to delete thumbnail:", err);
                }
            });
        }

        const user = await User.findById(post.creator);
        if (user) {
            user.posts = user.posts > 0 ? user.posts - 1 : 0; 
            await user.save(); 
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return next(new HttpError("Failed to delete post", 500));
    }
};

module.exports = {
    createPost,
    getPosts,
    getPost,
    getCatPosts,
    getUserPosts,
    editPost,
    deletePost
};
