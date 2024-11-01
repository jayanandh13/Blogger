import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link'; 
import React from 'react';

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className='max-w-[330px] w-full bg-white border border-black shadow-md shadow-black hover:shadow-lg hover:shadow-black transition-shadow duration-300 ease-in-out'>
      <Link href={`/blogs/${id}`}>
        {/* Image with Link */}
        <Image 
          src={image} 
          alt='Blog Image' 
          width={400} 
          height={400} 
          className='w-full h-auto border-b border-black cursor-pointer'
        />
      </Link>

      {/* Category Tag */}
      <p className='ml-4 mt-3 px-2 inline-block bg-black text-white text-xs sm:text-sm'>
        {category}
      </p>

      <div className="p-4">
        {/* Blog Title */}
        <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>
          {title}
        </h5>

        {/* Blog Description */}
        <p className='mb-3 text-sm tracking-tight text-gray-700'>
          {description}
        </p>

        {/* Read More Link */}
        <Link href={`/blogs/${id}`} className='inline-flex items-center py-1 font-semibold text-center cursor-pointer'>
          Read more
          <Image 
            src={assets.arrow} 
            className='ml-2' 
            alt='Arrow Icon' 
            width={12} 
            height={12} 
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;  