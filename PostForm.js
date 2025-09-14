import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";

export default function PostForm() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [feeling, setFeeling] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt || !imageUrl) return;

    await addDoc(collection(db, "posts"), {
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName || "Anonymous",
      prompt,
      imageUrl,
      feeling,
      createdAt: serverTimestamp(),
      approved: false,
      likes: [],
      comments: []
    });

    setPrompt(""); setImageUrl(""); setFeeling("");
    alert("Post submitted for admin approval!");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <textarea
        placeholder="Enter your AI prompt..."
        className="w-full p-2 border rounded-md mb-2"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Direct Image URL"
        className="w-full p-2 border rounded-md mb-2"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Your feeling/caption"
        className="w-full p-2 border rounded-md mb-2"
        value={feeling}
        onChange={(e) => setFeeling(e.target.value)}
      />
      <motion.button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Submit Post
      </motion.button>
    </motion.form>
  );
}