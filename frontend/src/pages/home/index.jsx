import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import Navbar from '../../components/navbar'
import './index.css'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate()

    const data = [
        {
            name: 'Math',
            id: '1223F-18567M',
            professor: 'Mihail Grobovici',
            description: 'This course is intended for students taking Analysis II in the second year'
        },
        {
            name: 'Geography',
            id: '1223F-18567M',
            professor: 'Radu Grobovici',
            description: 'This course is intended for students taking Geography in the second year'
        },
        {
            name: 'History',
            id: '1223F-18567M',
            professor: 'Radu Grobovici',
            description: 'This course is intended for students taking Geography in the second year'
        },
        {
            name: 'Geography',
            id: '1223F-18567M',
            professor: 'Radu Grobovici',
            description: 'This course is intended for students taking Geography in the second year'
        },
        {
            name: 'Geography',
            id: '1223F-18567M',
            professor: 'Radu Grobovici',
            description: 'This course is intended for students taking Geography in the second year'
        },
        {
            name: 'Geography',
            id: '1223F-18567M',
            professor: 'Radu Grobovici',
            description: 'This course is intended for students taking Geography in the second year'
        }
    ]

    return (
        <div className='home-main'>
            <Navbar />
            <div className='home-courses'>
                {data.map(item =>
                    <div className='home-course' onClick={() => navigate('/course')}>
                        <div className='home-course-upper'>
                            <p style={{ fontWeight: '600' }}>{item.name}</p>
                            <p style={{ fontSize: '13px' }}>{item.id}</p>
                        </div>
                        <div className='home-course-lower'>
                            <label>PROFESSOR</label>
                            <p>{item.professor}</p>
                            <label>DESCRIPTION</label>
                            <p>{item.description}</p>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Home