'use client';

import { assets } from '@/Assets/assets';
import Footer from '@/components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const BlogDetailPage = ({ params }) => {
  const [data, setData] = useState(null);
  const router = useRouter();

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`/api/blog`, {
        params: { id: params.id },
      });

      if (response.data.success) {
        setData(response.data.blog);
      } else {
        console.error("Blog not found:", response.data.msg);
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [params.id]);

  if (!data) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  const handleGetStartedClick = () => {
    router.push('/admin/addproduct');
  };

  return (
    <>
      <div>
        {/* Header Section */}
        <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image src={assets.logo} width={100} alt="Logo" className="w-[130px] sm:w-auto" />
            </Link>

            <button
              aria-label="Get Started"
              className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[7px_7px_0px_#000000] hover:shadow-lg transition-shadow duration-300'
              onClick={handleGetStartedClick}
            >
              Get Started 
              <Image src={assets.arrow} alt="Arrow Icon" width={12} height={12} />
            </button>
          </div>

          {/* Blog Title and Author Info */}
          <div className="text-center my-24">
            <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
            {data.authorImg && (
              <Image
                className="mx-auto mt-6 border border-white rounded-full"
                src={data.authorImg}
                width={60}
                height={60}
                alt={data.author}
              />
            )}
            <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>
          </div>
        </div>

        {/* Blog Content Section */}
        <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
          <Image className="border-4 border-white" src={data.image} width={1200} height={720} alt='' />
          <h1 className="my-8 text-[26px] font-semibold">Introduction:</h1>
          <p className="mb-5">{data.description}</p>

          <h3 className="my-5 text-[18px] font-semibold">Discussion Points:</h3>
          <p className="my-3">Step-1: Life is a beautiful journey, and it’s all about finding balance between work, play, and personal growth.</p>
          <p className="my-3">Step-2: Nourishing your body with wholesome foods while staying active is essential for well-being.</p>
          <p className="my-3">Step-3: Embrace change and stay curious to live a fulfilling life.</p>

          {/* Conclusion */}
          <h3 className="my-5 text-[18px] font-semibold">Conclusion:</h3>
          <p className="my-3">
            Whether it's diving into a new hobby, practicing mindfulness, or exploring new cultures, living a fulfilling life comes from embracing change and staying curious.
          </p>

          {/* Social Media Sharing Section */}
          <div className="my-24">
            <p className="text-black font-semibold my-4">Share This Article On Social Media</p>
            <div className="flex gap-4">
              <div className="transition-transform transform hover:scale-110">
                <Image src={assets.facebook_icon} width={40} alt="Facebook" />
              </div>
              <div className="transition-transform transform hover:scale-110">
                <Image src={assets.twitter_icon} width={40} alt="Twitter" />
              </div>
              <div className="transition-transform transform hover:scale-110">
                <Image src={assets.googleplus_icon} width={40} alt="Google Plus" />
              </div>
            </div>
          </div>
        </div>
      
        {/* Footer Section */}
        <Footer />
      </div>
    </>
  );
};

export default BlogDetailPage;
