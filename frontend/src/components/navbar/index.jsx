import React from 'react'
import './index.css'
import { FiUser } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch';

function Navbar() {

    const navigate = useNavigate()
    const { data, loading, fetchData } = useFetch('user/current')

    return (
        <nav className='navbar'>
            <ul>
                <li onClick={() => navigate('/')}>Courses</li>
                <li onClick={() => navigate('/create')}>Create</li>
                <li onClick={() => navigate('/comprehension')}>Comprehension</li>
                <li>
                    <div className='navbar-user'>
                        <p>{data?.name}</p>
                        <FiUser size={'0.8rem'} />
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar