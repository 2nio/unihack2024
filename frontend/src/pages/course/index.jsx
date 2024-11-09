import React from 'react'
import Navbar from '../../components/navbar'
import './index.css'
import Sidebar from '../../components/sidebar'
import { FaFile } from "react-icons/fa6";

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course