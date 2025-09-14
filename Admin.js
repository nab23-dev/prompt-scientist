import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import PostCard from "../components/PostCard";

export default function Admin() {
  const [pendingPosts, setPendingPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), where("approved", "==", false));
    const unsubscribe = onSnapshot(q, snapshot => {
      setPendingPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleApprove = async (id) => {
    await updateDoc(doc(db, "posts", id), { approved: true });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      {pendingPosts.length === 0 && <p>No pending posts</p>}
      <div className="flex flex-col gap-4">
        {pendingPosts.map(post => (
          <div key={post.id} className="relative">
            <PostCard post={post} />
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleApprove(post.id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Approve</button>
              <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}