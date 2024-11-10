import React from 'react'
import './index.css'
import { FaFolder } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Sidebar() {

    const navigate = useNavigate()

    return (
        <nav className='sidebar'>
            <ul>
                <li onClick={()=>navigate('/course')}>
                    <FaFolder />
                    <p>Materials</p>
                </li>
                <li>
                    <FaUserFriends />
                    <p>Students</p>
                </li>
                <li onClick={()=>navigate('/course/grades')}>
                    <FaHashtag />
                    <p>Grades</p>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar