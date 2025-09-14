import React, { useState } from "react";
import { motion } from "framer-motion";
import CommentBox from "./CommentBox";

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold">{post.userName}</h4>
        <span className="text-sm text-gray-500">{post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleString() : ''}</span>
      </div>

      {post.imageUrl && (
        <motion.img
          src={post.imageUrl}
          alt="post"
          className="rounded-lg w-full mb-2"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <p className="text-gray-700 font-medium mb-1">{post.prompt}</p>
      {post.feeling && <p className="
{post.feeling && <p className="text-gray-500 italic mb-2">{post.feeling}</p>}

      <div className="flex gap-4">
        <motion.button whileTap={{ scale: 0.9 }}>❤️ {post.likes.length}</motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowComments(!showComments)}>💬 Comments</motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigator.clipboard.writeText(window.location.href)}>🔗 Share</motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigator.clipboard.writeText(post.prompt)}>📋 Copy Prompt</motion.button>
      </div>

      {showComments && <CommentBox postId={post.id} comments={post.comments} />}
    </motion.div>
  );
}