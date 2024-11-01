import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItem'; 
import axios from 'axios';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from the API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
      console.log(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on selected category
  const filteredBlogs = menu === "All" 
    ? blogs 
    : blogs.filter(item => item.category === menu);

  return (
    <div className='px-4 sm:px-8'>
      {/* Category Filter Buttons */}
      <div className='flex flex-wrap justify-center gap-4 sm:gap-6 my-6 sm:my-10'>
        <button 
          onClick={() => setMenu('All')} 
          className={menu === "All" ? 'bg-black text-white py-2 px-4 sm:px-6 rounded-sm' : 'py-2 px-4 sm:px-6 rounded-sm'}>
          All
        </button>
        <button 
          onClick={() => setMenu('Technology')} 
          className={menu === "Technology" ? 'bg-black text-white py-2 px-4 sm:px-6 rounded-sm' : 'py-2 px-4 sm:px-6 rounded-sm'}>
          Technology
        </button>
        <button 
          onClick={() => setMenu('Startup')} 
          className={menu === "Startup" ? 'bg-black text-white py-2 px-4 sm:px-6 rounded-sm' : 'py-2 px-4 sm:px-6 rounded-sm'}>
          Startup
        </button>
        <button 
          onClick={() => setMenu('Lifestyle')} 
          className={menu === "Lifestyle" ? 'bg-black text-white py-2 px-4 sm:px-6 rounded-sm' : 'py-2 px-4 sm:px-6 rounded-sm'}>
          Lifestyle
        </button>
      </div>

      {/* Blog items (Responsive Grid Layout) */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16'>
        {filteredBlogs.map((item, index) => (
          <BlogItem 
            key={item._id || index} 
            id={item._id} 
            image={item.image} 
            title={item.title} 
            description={item.description} 
            category={item.category} 
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
