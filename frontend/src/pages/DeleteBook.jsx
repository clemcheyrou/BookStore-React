import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setLoading(false);
        enqueueSnackbar('Book Delited successfully', {variant: 'success'});

        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton/>
      <h1 className="text-3x1 my-4">Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col items-center border-sky-400 rounded-x1 w-[600px] p-8 mx-auto">
        <h3 className="text-2x1">Are you sure you want to delete this book?</h3>
        <button 
          className="p-4 bg-red-600 m-8 w-full" 
          onClick={handleDeleteBook}>
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook
