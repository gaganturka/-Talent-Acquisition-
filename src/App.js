import logo from './logo.svg';
import './App.css';
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Movies from './Pages.js/movies';
import AddMovieForm from './Pages.js/addMovie';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/addmovie" element={<AddMovieForm />} />
      </Routes>
    </>
  );
}

export default App;
