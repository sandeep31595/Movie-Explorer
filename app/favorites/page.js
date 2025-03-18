"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import MovieList from "@/components/MovieList";
import Header from "@/components/Header";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);
    console.log("favorites",favorites);
    
  return (
    <div className="min-h-screen">
        <Header />
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">Your Favorite Movies</h1>
        <p className="text-xl text-gray-600">Here are all the movies you've added to your favorites</p>
      </header>

      {favorites && favorites.length > 0 ? (
          <MovieList
            movies={favorites} 
            onAddFavorite={() => {}} 
          />
      ) : (
        <div className="text-center text-lg text-gray-600">
          You have no favorite movies yet.
        </div>

      )}
    </div>
  );
}
