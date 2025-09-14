import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      navigate("/profile");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center">Signup</h2>
        <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required className="p-2 border rounded"/>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="p-2 border rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required className="p-2 border rounded"/>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Signup</button>
      </form>
    </div>
  );
}