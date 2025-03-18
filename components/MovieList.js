import Link from 'next/link'

export default function MovieList({ movies, onAddFavorite }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 p-4"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-lg transition duration-300 transform hover:scale-105"
            />
            <h2 className="text-xl font-semibold mt-4 text-gray-800">{movie.title}</h2>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => onAddFavorite(movie)}
                className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
              >
                Add to Favorites
              </button>
              <Link href={`/movies/${movie.id}`}>
                
                  View Details
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h4 className="text-center col-span-full text-lg text-gray-500">No Movies available</h4>
      )}
    </div>
  );
}
