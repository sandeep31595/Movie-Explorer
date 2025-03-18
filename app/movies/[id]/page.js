"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../store/commentsSlice";
import Header from "../../../components/Header";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments[id] || []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `https://www.freetestapi.com/api/v1/movies/${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  
  const validateComment = () => {
    if (!comment.trim()) {
      setError("Comment is required.");
      return false;
    }
    if (comment.length < 100) {
      setError("Comment must be at least 100 characters long.");
      return false;
    }
    if (comment.length > 1000) {
      setError("Comment must not exceed 1000 characters.");
      return false;
    }
    setError(""); 
    return true;
  };

  const handleAddComment = () => {
    if (validateComment()) {
      dispatch(addComment({ movieId: id, comment }));
      setComment(""); 
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="flex justify-center items-center p-6">
        {movie ? (
          <div className="max-w-4xl w-full flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <img
                src={movie?.poster || "/placeholder-image.jpg"}
                alt={movie?.title}
                className="w-full h-auto rounded-lg"
              />
            </div>

            <div className="w-full md:w-2/3 flex flex-col">
              <h1 className="text-3xl font-bold">{movie?.title}</h1>
              <p className="mt-2">{movie?.overview}</p>
              <p className="mt-3 font-semibold">{movie?.rating || "N/A"} / 10</p>
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Add a Comment</h2>
                <div className="flex mt-3">
                  <input
                    type="text"
                    placeholder="Write something..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-1 border p-2 rounded-l-md outline-none"
                  />
                  <button
                    onClick={handleAddComment}
                    className="border px-4 py-2 rounded-r-md"
                  >
                    Add
                  </button>
                </div>

                {error && (
                  <p className="mt-2 text-red-500 text-sm">{error}</p>
                )}
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-semibold">Comments</h2>
                {comments.length > 0 ? (
                  <ul className="mt-2 space-y-3">
                    {comments.map((c, index) => (
                      <li key={index} className="p-3 border rounded-md">
                        {c}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 mt-2">No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading movie details...</p>
        )}
      </div>
    </div>
  );
}
