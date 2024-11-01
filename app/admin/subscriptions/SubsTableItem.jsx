import React from 'react';

const SubsTableItem = ({ email, mongoId, deleteEmail, date }) => {
  
  const emailDate = date ? new Date(date) : null;

  return (
    <tr className="bg-white border-b text-left">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {email ? email : "No Email"}
      </th>
     
      <td className="px-6 py-4 hidden sm:block">
        {emailDate ? emailDate.toDateString() : "No Date Available"}
      </td>
      <td
        className="px-6 py-4 cursor-pointer text-gray-500 hover:text-red-700"
        onClick={() => deleteEmail(mongoId)}
      >
        ✕
      </td>
    </tr>
  );
};

export default SubsTableItem;
