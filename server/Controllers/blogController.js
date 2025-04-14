const blogModel = require('../Models/blogModel');
const userModel = require('../Models/userModel');
const mongoose = require('mongoose');

// Get all blogs
exports.getAllBlogsController = async(req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user");
        if (!blogs || blogs.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No Blogs found",
            });
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: "All Blogs list",
            blogs,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error while getting blogs',
            error: error.message,
        });
    }
};

// Create a blog
exports.createBlogController = async(req, res) => {
    try {
        const { title, description, image, user } = req.body;

        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: 'Please Provide All Fields',
            });
        }

        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'Unable to find user',
            });
        }

        const newBlog = new blogModel({ title, description, image, user });

        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });
        await session.commitTransaction();

        return res.status(201).send({
            success: true,
            message: 'Blog Created!',
            newBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while Creating blog',
            error: error.message,
        });
    }
};

// Update blog
exports.updateBlogController = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;

        const blog = await blogModel.findByIdAndUpdate(
            id, { title, description, image }, { new: true }
        );

        return res.status(200).send({
            success: true,
            message: "Blog Updated",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating blog',
            error: error.message,
        });
    }
};

// Get blog by ID
exports.getBlogByIdController = async(req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id).populate("user");

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found with this id",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Single Blog Fetched",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while getting single blog",
            error: error.message,
        });
    }
};

// Delete blog
exports.deleteBlogController = async(req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            });
        }

        await blog.user.blogs.pull(blog);
        await blog.user.save();

        return res.status(200).send({
            success: true,
            message: 'Blog Deleted!',
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while Deleting Blog",
            error: error.message,
        });
    }
};

// Get user blogs by user ID
exports.userBlogController = async(req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "Blogs not found with this user ID",
            });
        }
        return res.status(200).send({
            success: true,
            message: "User Blogs",
            userBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: 'Error in fetching user blogs',
            error: error.message,
        });
    }
};