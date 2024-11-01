'use client';
import BlogTableItem from '@/components/AdminComponents/BlogTableItem';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 

const Page = () => {
  const [blogs, setBlogs] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  
  const fetchBlogs = async () => {
    setLoading(true); 
    setError(null); 

    try {
      const response = await axios.get('/api/blog'); 
      setBlogs(response.data.blogs); 
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to fetch blogs. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };

  
  const deleteBlog = async (mongoId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?'); 
    if (!confirmDelete) return; 

    try {
      const response = await axios.delete('/api/blog', {
        params: { id: mongoId },
      });
      toast.success(response.data.msg); 
      fetchBlogs(); 
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog. Please try again.');
    }
  };

  
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      {/* Title */}
      <h1 className="text-lg sm:text-xl font-semibold">All Blogs</h1>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="relative max-w-full overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
          <table className="w-full text-sm text-left text-gray-500">
            {/* Table Head */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="hidden sm:table-cell px-6 py-3">Author Name</th>
                <th scope="col" className="px-6 py-3">Blog Title</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((item) => (
                  <BlogTableItem
                    key={item._id} 
                    mongoId={item._id}
                    title={item.title}
                    author={item.author}
                    authorImg={item.authorImg}
                    date={item.createdAt} 
                    deleteBlog={deleteBlog} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No blogs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;    