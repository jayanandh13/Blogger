import { assets } from "@/Assets/assets";
import Sidebar from "@/components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <ToastContainer theme="dark" />
      
      
      <Sidebar />

   
      <div className="flex flex-col w-full">
        
        
        <div className="flex items-center justify-between w-full py-3 max-h-[75px] px-6 sm:px-12 border-b">
          <h3 className="font-medium text-lg">Admin Panel</h3>
          <Image 
            src={assets.profile_icon} 
            width={40} 
            height={40} 
            alt="Admin Profile Icon" 
            className="rounded-full"
          />
        </div>

      
        <div className="flex-grow p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
