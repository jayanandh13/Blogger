import { assets } from '@/Assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'; 

const Header = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const router = useRouter(); 

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);

    setIsSubmitting(true); 
    try {
      const response = await axios.post('/api/email', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail(''); 
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while subscribing.');
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleGetStartedClick = () => {
    // Redirect to the admin panel
    router.push('/admin');
  };

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center flex-wrap'>
        <Image src={assets.logo} width={180} alt='Logo' className='w-[130px] sm:w-auto' />

        <button
          aria-label="Get Started"
          className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[7px_7px_0px_#000000] hover:shadow-lg transition-shadow duration-300'
          onClick={handleGetStartedClick} 
        >
          Get Started 
          <Image src={assets.arrow} alt="Arrow Icon" width={12} height={12} />
        </button>
      </div>

      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-4 max-w-[740px] m-auto text-xs sm:text-base'>
          Monetize your blog by adding a paywall and charging for access.
          <span className="font-bold"> "blogger" </span>
          gives you everything you need to create, promote, and sell digital content and memberships.
        </p>

        <form 
          onSubmit={onSubmitHandler} 
          className='flex flex-col sm:flex-row justify-between max-w-[500px] mx-auto mt-10 border border-black shadow-[7px_7px_0px_#000000]'
        >
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            type="email"
            placeholder="Enter your email"
            className='px-4 py-2 flex-grow outline-none border-none'
            required
            aria-label="Enter your email"
            disabled={isSubmitting} 
          />
          <button 
            type='submit'
            className={`border border-black py-2 px-4 sm:px-8 bg-black text-white font-semibold hover:bg-gray-800 mt-2 sm:mt-0 sm:ml-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting} 
            aria-label="Subscribe"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
