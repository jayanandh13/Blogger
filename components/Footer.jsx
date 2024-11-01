import { assets } from '@/Assets/assets';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 sm:gap-0 bg-black py-4 sm:py-6 px-4 sm:px-12'>
      {/* Logo */}
      <Image 
        src={assets.logo_light} 
        alt='Blogger Logo' 
        width={120} 
        height={40} 
        className='w-24 h-auto sm:w-32' 
      />

      {/* Copyright Text */}
      <p className='text-sm text-white text-center'>
        All rights reserved. Copyright © Blogger
      </p>

      {/* Social Media Icons */}
<div className='flex space-x-3 sm:space-x-6'>
  <Image 
    src={assets.facebook_icon} 
    alt='Facebook Icon' 
    width={30} 
    height={30} 
    className='w-8 h-auto sm:w-10 transition-transform transform hover:scale-110' 
  />
  <Image 
    src={assets.twitter_icon} 
    alt='Twitter Icon' 
    width={30} 
    height={30} 
    className='w-8 h-auto sm:w-10 transition-transform transform hover:scale-110' 
  />
  <Image 
    src={assets.googleplus_icon} 
    alt='Google Plus Icon' 
    width={30} 
    height={30} 
    className='w-8 h-auto sm:w-10 transition-transform transform hover:scale-110' 
  />
</div>
        
      </div>
  );
}

export default Footer;
