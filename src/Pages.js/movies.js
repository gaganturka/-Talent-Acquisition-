import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './movieCard';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
    const navigate = useNavigate()
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(response =>
                setMovies(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="movies">
            <div>
                <button onClick={() => navigate('/addmovie')}>Add Movies</button>
            </div>
            <div class="card-container">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Movies;