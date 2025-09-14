import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdPopup() {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      const adsSnap = await getDocs(collection(db, "ads"));
      const ads = adsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (ads.length > 0) {
        setAd(ads[Math.floor(Math.random() * ads.length)]);
      }
    };

    fetchAd();
    const interval = setInterval(fetchAd, 300000); // 5 min
    return () => clearInterval(interval);
  }, []);

  if (!ad) return null;

  return (
    <div
      className="fixed bottom-4 right-4 w-64 h-40 z-50 shadow-lg rounded-lg overflow-hidden cursor-pointer animate-fadeIn"
      onClick={() => window.open(ad.link, "_blank")}
    >
      <img src={ad.imageUrl} alt="ad" className="w-full h-full object-cover"/>
    </div>
  );
}