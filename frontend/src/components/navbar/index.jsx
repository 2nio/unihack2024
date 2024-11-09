import React from 'react'
import './index.css'
import { FiUser } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate()

    return (
        <nav className='navbar'>
            <ul>
                <li onClick={() => navigate('/')}>Courses</li>
                <li>Calendar</li>
                <li>
                    <div className='navbar-user'>
                        <p>Nume</p>
                        <FiUser size={'0.8rem'} />
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar