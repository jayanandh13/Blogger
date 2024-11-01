import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-white h-screen w-[250px] sm:w-[300px]"> 
      
      
      
      <div className="px-4 sm:px-8 py-4"> 
        
        <Image src={assets.logo} width={120} alt="Logo" />
      </div>

      
      <div className="flex-grow py-8"> 
       
        <div className="flex flex-col gap-6 px-4 sm:px-8"> 
          {/* Add Blogs */}
          <Link href="/admin/addproduct" className="flex items-center border border-black rounded-lg gap-3 font-medium px-4 py-3 bg-white shadow-[-5px_5px_0px_#808080]  hover:bg-gray-50 transition duration-200">
            <Image src={assets.add_icon} alt="Add Icon" width={28} />
            <p>Add Blogs</p>
          </Link>

          {/* Blog Lists */}
          <Link href="/admin/blogList" className="flex items-center border border-black rounded-lg gap-3 font-medium px-4 py-3 bg-white shadow-[-5px_5px_0px_#808080]  hover:bg-gray-50 transition duration-200">
            <Image src={assets.blog_icon} alt="Blog List Icon" width={28} />
            <p>Blog Lists</p>
          </Link>

          {/* Subscriptions */}
          <Link href="/admin/subscriptions" className="flex items-center border border-black rounded-lg gap-3 font-medium px-4 py-3 bg-white shadow-[-5px_5px_0px_#808080] hover:bg-gray-50 transition duration-200">
            <Image src={assets.email_icon} alt="Subscription Icon" width={28} />
            <p>Subscriptions</p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Sidebar; 