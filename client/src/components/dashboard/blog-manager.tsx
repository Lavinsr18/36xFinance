import { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
}

export default function BlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch blogs
  useEffect(() => {
    axios.get("/api/blogs").then((res) => setBlogs(res.data));
  }, []);

  // Add blog
  const addBlog = async () => {
    if (!title || !excerpt) return;
    const res = await axios.post("/api/blogs", { title, excerpt });
    setBlogs([res.data, ...blogs]);
    setTitle("");
    setExcerpt("");
  };

  // Start editing
  const startEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
  };

  // Save edit
  const saveEdit = async () => {
    if (!editingId) return;
    const res = await axios.put(`/api/blogs/${editingId}`, { title, excerpt });
    setBlogs(blogs.map((b) => (b.id === editingId ? res.data : b)));
    setEditingId(null);
    setTitle("");
    setExcerpt("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setExcerpt("");
  };

  // Delete blog
  const deleteBlog = async (id: string) => {
    await axios.delete(`/api/blogs/${id}`);
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Manage Blogs</h2>

      {/* Form */}
      <div className="flex gap-2 mb-4">
        <input
          className="p-2 rounded bg-slate-700 text-white flex-1"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="p-2 rounded bg-slate-700 text-white flex-1"
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
        {editingId ? (
          <>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={saveEdit}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={addBlog}
          >
            Add
          </button>
        )}
      </div>

      {/* Blog List */}
      <ul className="space-y-2">
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="flex justify-between items-center bg-slate-700 p-3 rounded"
          >
            <span className="text-white">{blog.title}</span>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(blog)}
                className="text-yellow-400 hover:text-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBlog(blog.id)}
                className="text-red-400 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
