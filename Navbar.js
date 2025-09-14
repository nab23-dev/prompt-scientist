import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <Link to="/" className="font-bold text-lg">Prompt Scientist</Link>
      <div className="flex gap-4">
        {auth.currentUser ? (
          <>
            <Link to="/profile">Profile</Link>
            {auth.currentUser.email === "admin@example.com" && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}