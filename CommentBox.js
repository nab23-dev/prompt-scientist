import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function CommentBox({ postId, comments: initialComments }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(initialComments || []);

  useEffect(() => {
    const q = query(collection(db, "posts", postId, "comments"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = async () => {
    if (!comment) return;
    await addDoc(collection(db, "posts", postId, "comments"), {
      text: comment,
      createdAt: serverTimestamp()
    });
    setComment("");
  };

  return (
    <div className="mt-2 border-t pt-2">
      {comments.map(c => (
        <p key={c.id} className="text-gray-700 text-sm mb-1">{c.text}</p>
      ))}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Add comment..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="flex-1 p-2 border rounded-md"
        />
        <button onClick={handleAddComment} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Post</button>
      </div>
    </div>
  );
}