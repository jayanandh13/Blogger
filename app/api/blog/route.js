import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import fs from 'fs/promises'; 
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// GET Handler
export async function GET(request) {
  try {
    await ConnectDB(); 
    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
      if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return NextResponse.json({ success: false, msg: "Invalid blog ID" }, { status: 400 });
      }

      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, blog });
    } else {
      const blogs = await BlogModel.find({}).sort({ createdAt: -1 }); 
      return NextResponse.json({ success: true, blogs });
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ success: false, msg: "Failed to fetch blogs", error: error.message }, { status: 500 });
  }
}

// POST Handler
export async function POST(request) {
  try {
    await ConnectDB();

    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    if (!image || image.size > 2 * 1024 * 1024 || !['image/jpeg', 'image/png'].includes(image.type)) {
      return NextResponse.json({ success: false, msg: "Invalid image. Only JPEG/PNG files under 2MB are allowed" }, { status: 400 });
    }

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    const publicDir = path.join(process.cwd(), 'public');
    const imagePath = path.join(publicDir, `${timestamp}_${image.name}`);

    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }

    await writeFile(imagePath, buffer);

    const imgUrl = `/${timestamp}_${image.name}`; 

    const blogData = {
      title: formData.get('title') || '',
      description: formData.get('description') || '',
      category: formData.get('category') || '',
      author: formData.get('author') || '',
      image: imgUrl,
      authorImg: formData.get('author_img') || '',
      createdAt: new Date(), 
    };

    if (!blogData.title || !blogData.description) {
      return NextResponse.json({ success: false, msg: "Title and description are required" }, { status: 400 });
    }

    const newBlog = await BlogModel.create(blogData);
    return NextResponse.json({ success: true, msg: "Blog Added", blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ success: false, msg: "Blog could not be added", error: error.message }, { status: 500 });
  }
}

// DELETE Handler
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, msg: "No ID provided" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, msg: "Invalid blog ID" }, { status: 400 });
    }

    await ConnectDB();

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
    }

    if (blog.image) {
      try {
        await fs.unlink(`./public${blog.image}`);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, msg: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

    