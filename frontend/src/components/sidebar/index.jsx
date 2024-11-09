import React from 'react'
import './index.css'
import { FaFolder } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";

function Sidebar() {
    return (
        <nav className='sidebar'>
            <ul>
                <li>
                    <FaFolder />
                    <p>Materials</p>
                </li>
                <li>
                    <FaUserFriends />
                    <p>Students</p>
                </li>
                <li>
                    <FaHashtag />
                    <p>Grades</p>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar