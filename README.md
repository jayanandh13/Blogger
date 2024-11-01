# Blogger

Blogger is a modern blog application built with Next.js, allowing users to create, read, update, and delete blog posts seamlessly. The application features an intuitive user interface, image uploads, and responsive design, ensuring a smooth experience on both desktop and mobile devices.

## Features

- **User-Friendly Interface**: Simple and clean design for easy navigation and blog management.
- **Create, Read, Update, Delete (CRUD)**: Full functionality for managing blog posts.
- **Image Uploads**: Supports image uploads for blog thumbnails.
- **Responsive Design**: Optimized for mobile and desktop viewing.
- **Category Selection**: Users can categorize their blogs for better organization.
- **Error Handling**: Graceful error messages for a better user experience.

## Technologies Used

- **Next.js**: A React framework for server-rendered applications.
- **MongoDB**: NoSQL database to store blog data.
- **Mongoose**: ODM for MongoDB to model application data.
- **Axios**: For making HTTP requests.
- **React Toastify**: For displaying notifications.
- **CSS**: For styling the application.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jayanandh13/Blogger.git
   
2.  **Navigate to the Project Directory**:

    cd Blogger

3.  **Install Required Dependencies**:

    npm install

4.  **Create a .env.local File**:

    MONGODB_URI=your_mongodb_connection_string

5.  **Start the Development Server**:

    npm run dev


 ## Usage
- **Creating a Blog**: Fill in the form with the title, description, category, and image, then click "Add" to create a new blog post.

- **Viewing Blogs**: All blog posts are displayed on the homepage. Click on any blog to view its details.

- **Editing and Deleting Blogs**: Navigate to the specific blog to edit or delete it.
