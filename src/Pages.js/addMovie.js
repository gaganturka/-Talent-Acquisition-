import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddMovieForm({ onAddMovie }) {
    const navigate = useNavigate()
    const [movie, setMovie] = useState({ name: "", rating: "", releaseDate: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('entered');
        axios.post("http://localhost:3001/movies", movie).then((response) => {
            alert('form submited Successsfully')
            navigate('/')

            setMovie({ name: "", rating: "", releaseDate: "" })
        })
            .catch((Error) => {
                alert(Error.response.data)
                console.log('err', Error.response.data);

            })
    }

    const handleChange = ({ currentTarget: input }) => {

        const newMovie = { ...movie };
        newMovie[input.name] = input.value;
        setMovie(newMovie);
    };

    return (
        <>
            {console.log(movie)}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={movie.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input
                        type="number"
                        className="form-control"
                        id="rating"
                        name="rating"
                        value={movie.rating}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="releaseDate">Release Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="releaseDate"
                        name="releaseDate"
                        value={movie.releaseDate}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>

            </form>
        </>
    )
}

export default AddMovieForm