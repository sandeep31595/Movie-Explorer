"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../store/favoritesSlice";
import MovieList from "../components/MovieList";
import { fetchMovies } from "../utils/api";
import Header from "@/components/Header";
import { toast } from "react-toastify";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites); 

  const fetchMoviesData = async (searchQuery = query, currentPage = page) => {
    try {
      const { results } = await fetchMovies(searchQuery, currentPage);
      setTotalPages(10); 
      setMovies(results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleAddFavorite = (movie) => {
    dispatch(addFavorite(movie));
    toast.success(`${movie.title} added to favorites!`); 
  };

  useEffect(() => {
    fetchMoviesData();
  }, [query, page]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchMoviesData(query, 1);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="min-h-screen bg-gray-100 p-6 md:p-10">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">Movie Explorer</h1>
          <p className="text-xl text-gray-600">Find, explore, and add your favorite movies</p>
        </header>

        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="w-full sm:w-96 p-4 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-300"
          />
          <button
            onClick={handleSearch}
            className="ml-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Search
          </button>
        </div>

        <MovieList
          movies={movies}
          onAddFavorite={handleAddFavorite}
          favorites={favorites} // Pass favorites list to MovieList component
        />

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 transition duration-200"
          >
            Previous
          </button>
          <span className="mx-4 text-xl">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 transition duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
