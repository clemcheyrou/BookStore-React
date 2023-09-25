import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from '../components/Spinner';
import { MdOutlineAddBox} from 'react-icons/md';
import { Link } from 'react-router-dom';


import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {

	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showType, setShowType] = useState('table');
	
	useEffect(() => {
		setLoading(true);
		axios
			.get('http://localhost:5555/books')
			.then((response) => {
				console.log(response.data.data); 
				setBooks(response.data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			})
	}, []);

	return (
	<div className='p-4'>
		<div className="flex justify-center items-center gap-x-4">
			<button 
				className="bg-sky-300 hover:bg-sky-600 px-4 rounded-lg"
				onClick={() => setShowType('table')}
				>
					Table
			</button>
			<button 
				className="bg-sky-300 hover:bg-sky-600 px-4 rounded-lg"
				onClick={() => setShowType('card')}
				>
					Card
			</button>
		</div>

		<div className='flex justify-between items-center'>
			<h1 className="text-3x1 my-8">Book List</h1>
			<Link to='/books/create'>
				<MdOutlineAddBox className='text-sky-800 text-4x1'/>
			</Link>
		</div>
		{loading ? (<Spinner/>) : showType === 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books}/>)
		}
	</div>
	)
}

export default Home