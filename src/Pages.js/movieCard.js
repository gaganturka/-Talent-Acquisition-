import React from 'react';

const MovieCard = ({ movie }) => {
    console.log('sss', movie);
    return (


        <div class="card">
            <img class="card-image" src={movie.image} alt={movie.name} />
            <div class="card-body">
                <h5 class="card-title">{movie.name}</h5>
                <p class="card-text">{movie.releaseDate}</p>
                <p class="card-rating">{movie.rating}</p>
            </div>
        </div>

    );
};

export default MovieCard;