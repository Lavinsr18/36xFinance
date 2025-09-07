import { useEffect, useState } from "react";
import axios from "axios";

interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
}

export default function VideoManager() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch videos
  useEffect(() => {
    axios.get("/api/videos").then((res) => setVideos(res.data));
  }, []);

  // Add video
  const addVideo = async () => {
    if (!title || !youtubeUrl) return;
    const res = await axios.post("/api/videos", { title, youtubeUrl });
    setVideos([res.data, ...videos]);
    setTitle("");
    setYoutubeUrl("");
  };

  // Start editing
  const startEdit = (video: Video) => {
    setEditingId(video.id);
    setTitle(video.title);
    setYoutubeUrl(video.youtubeUrl);
  };

  // Save edit
  const saveEdit = async () => {
    if (!editingId) return;
    const res = await axios.put(`/api/videos/${editingId}`, { title, youtubeUrl });
    setVideos(videos.map((v) => (v.id === editingId ? res.data : v)));
    setEditingId(null);
    setTitle("");
    setYoutubeUrl("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setYoutubeUrl("");
  };

  // Delete video
  const deleteVideo = async (id: string) => {
    await axios.delete(`/api/videos/${id}`);
    setVideos(videos.filter((v) => v.id !== id));
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Manage Videos</h2>

      {/* Form */}
      <div className="flex gap-2 mb-4">
        <input
          className="p-2 rounded bg-slate-700 text-white flex-1"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="p-2 rounded bg-slate-700 text-white flex-1"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
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
            onClick={addVideo}
          >
            Add
          </button>
        )}
      </div>

      {/* Video List */}
      <ul className="space-y-2">
        {videos.map((video) => (
          <li
            key={video.id}
            className="flex justify-between items-center bg-slate-700 p-3 rounded"
          >
            <span className="text-white">{video.title}</span>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(video)}
                className="text-yellow-400 hover:text-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteVideo(video.id)}
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
