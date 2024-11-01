'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SubsTableItem from './SubsTableItem'; 
import { toast } from 'react-toastify'; 

const Page = () => {
  const [emails, setEmails] = useState([]);

  // Fetch email subscriptions from the server
  const fetchEmails = async () => {
    try {
      const response = await axios.get('/api/email');
      setEmails(response.data.emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to load emails");
    }
  };

  // Delete email by ID
  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete('/api/email', {
        params: {
          id: mongoId
        }
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        fetchEmails(); 
      } else {
        toast.error("Error deleting email");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("Failed to delete email");
    }
  };

  
  useEffect(() => {
    fetchEmails();
    return () => {
      
    };
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-2xl font-semibold mb-6">All Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Email Subscription</th>
              <th scope="col" className="hidden sm:block px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item, index) => (
              <SubsTableItem
                key={index}
                mongoId={item._id}
                deleteEmail={deleteEmail}
                email={item.email}
                date={item.date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
