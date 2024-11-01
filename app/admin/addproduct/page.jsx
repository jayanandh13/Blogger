'use client';
import { assets } from '@/Assets/assets'; 
import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data =>({...data,[name]:value}));
    console.log(data);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!data.title || !data.description || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true); 

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('author', data.author);
      formData.append('authorImg', data.authorImg);
      formData.append('image', image);

      const response = await axios.post('/api/blog', formData);
      if (response.data.success){
        toast.success(response.data.msg);
      }

      else{
        toast.error("Error adding the blog.");
      }
        

      if (response.data.success) {
        setData({ title: "", description: "", category: "Startup", author: "Alex", authorImg: "/author_img.png" });
        setImage(null);
        setImagePreview(null);
      } else {
        toast.error("Error adding the blog.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Network error or invalid submission.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="container mx-auto p-5 sm:p-10">
      <ToastContainer />

      <form onSubmit={onSubmitHandler} className="space-y-6">
        <p className="text-xl font-semibold">Upload Thumbnail</p>
        <label htmlFor="image" className="cursor-pointer">
          {!imagePreview ? (
            <Image
              className="mt-4"
              src={assets.upload_area || "/default_upload_area.png"} 
              width={140}
              height={70}
              alt="Upload area"
            />
          ) : (
            <img
              className="mt-4 object-cover"
              src={imagePreview}
              width={140}
              height={70}
              alt="Selected thumbnail"
            />
          )}
        </label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          hidden
          accept="image/*"
        />

        <div>
          <p className="text-xl font-semibold">Blog Title</p>
          <input
            name="title"
            onChange={onChangeHandler}
            value={data.title}
            className="w-full sm:w-[500px] mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            type="text"
            placeholder="Type here"
            required
          />
        </div>

        <div>
          <p className="text-xl font-semibold">Blog Description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            className="w-full sm:w-[500px] mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Write content here..."
            rows={4}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="w-full">
            <p className="text-xl font-semibold">Blog Category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
              className="w-full sm:w-[500px] mt-2 px-4 py-3 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="Startup">Startup</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-[180px] h-15 px-4 py-4 bg-black text-white rounded-md shadow-[7px_7px_0px_#808080] hover:shadow-lg transition-shadow duration-300 ${
              isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
