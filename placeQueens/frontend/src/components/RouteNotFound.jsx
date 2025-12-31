import React from "react";
import { useNavigate } from "react-router-dom";

const RouteNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-6">
      <h1 className="text-7xl md:text-8xl font-extrabold text-cyan-400 drop-shadow-lg">
        404
      </h1>

      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-center">
        Area Locked 🔒
      </h2>

      <p className="mt-3 max-w-md text-center text-slate-300">
        You tried to enter a game route that doesn’t exist or hasn’t been unlocked yet.
      </p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300 transition"
        >
          Go Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-xl border border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-slate-900 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default RouteNotFound;
