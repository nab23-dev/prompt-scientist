import React from "react";
import PostForm from "../components/PostForm";
import { db, auth } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";

export default function Profile() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <PostForm />
      <div className="mt-6 flex flex-col gap-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}