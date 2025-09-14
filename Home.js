import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import PostCard from "../components/PostCard";
import AdPopup from "../components/AdPopup";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Fetch approved posts
    const q = query(collection(db, "posts"), where("approved", "==", true), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch ads
    const adsQuery = query(collection(db, "ads"));
    const unsubscribeAds = onSnapshot(adsQuery, (snapshot) => {
      setAds(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => { unsubscribe(); unsubscribeAds(); };
  }, []);

  // Insert random ads in feed
  const feedWithAds = [];
  posts.forEach((post, index) => {
    feedWithAds.push(post);
    if (Math.random() < 0.3 && ads.length > 0) { // 30% chance to insert ad
      const randomAd = ads[Math.floor(Math.random() * ads.length)];
      feedWithAds.push({ ...randomAd, isAd: true });
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Feed</h2>
      <div className="flex flex-col gap-4">
        {feedWithAds.map(item =>
          item.isAd ? (
            <div key={item.id} className="rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transform transition" onClick={() => window.open(item.link, "_blank")}>
              <img src={item.imageUrl} alt="ad" className="w-full" />
            </div>
          ) : (
            <PostCard key={item.id} post={item} />
          )
        )}
      </div>
      <AdPopup /> {/* Popup Ads */}
    </div>
  );
}