import { assets } from '@/Assets/assets';
import Image from 'next/image';
import React from 'react';

const BlogTableItem = ({ authorImg, title, author, date, deleteBlog, mongoId }) => {
  let BlogDate;
  try {
    BlogDate = new Date(date);
    if (isNaN(BlogDate.getDate())) {
      BlogDate = null; 
    }
  } catch (error) {
    BlogDate = null;
  }

  
  const handleDelete = () => {
    if (typeof deleteBlog === 'function') {
      deleteBlog(mongoId);
    }
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition-all">
     
      <th
        scope="row"
        className="flex items-center gap-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          width={40}
          height={40}
          src={authorImg || assets.profile_icon} 
          alt={author || 'Profile'}
          className="rounded-full"
        />
        <p className="hidden sm:block">{author || 'No author'}</p> 
      </th>

     
      <td className="px-6 py-4 text-gray-700">
        {title || 'No title'} 
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-gray-500">
        {BlogDate ? BlogDate.toDateString() : 'Invalid date'} 
      </td>

      {/* Delete Action */}
      <td
        onClick={handleDelete}
        className="px-6 py-4 cursor-pointer text-gray-500 hover:text-red-700"
        role="button"
        tabIndex={0}
        aria-label={`Delete blog titled ${title || 'No title'}`}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleDelete()}
      >
        ✕
      </td>
    </tr>
  );
};

export default BlogTableItem;  