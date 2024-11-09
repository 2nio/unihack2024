import React from 'react'
import Navbar from '../../components/navbar'
import './index.css'
import Sidebar from '../../components/sidebar'
import { FaFile } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";

function Course() {
    return (
        <div className='course-main'>
            <Navbar />
            <div className='course-second'>
                <Sidebar />
                <div className='course-feed'>
                    <div className='course-material'>
                        <div className='course-material-left'>
                            <FaFile />
                            <p>Material</p>
                        </div>
                        <div className='course-material-right'>
                            <p>9.11.2024</p>
                            <RiArrowDropDownLine />
                        </div>
                    </div>
                    <div className='course-material-file'>
                        <p>file</p>
                        <button>View file</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course