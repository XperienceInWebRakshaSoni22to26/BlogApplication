import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../Components/BlogCard";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    // Get blogs
    const getAllBlogs = async() => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/all-blog`);
            if (response && response.data && response.data.success) {
                setBlogs(response.data.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return ( <
        >
        {
            blogs &&
            blogs.map((blog) => ( <
                BlogCard key = { blog._id }
                id = { blog._id }
                isUser = { localStorage.getItem("userId") === blog.user._id }
                title = { blog.title }
                description = { blog.description }
                image = { blog.image }
                username = { blog.user.username }
                time = { blog.createdAt }
                />
            ))
        } <
        />
    );
};

export default Blogs;