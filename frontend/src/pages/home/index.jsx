import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import Navbar from '../../components/navbar'
import './index.css'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate()
    const { data, loading, fetchData } = useFetch('course')

    return (
        <div className='home-main'>
            <Navbar />
            <div className='home-courses'>
                {!loading && data?.map(item =>
                    <div className='home-course'
                        onClick={() => navigate(`/course/${item._id}`, { state: { id: item._id } })}>
                        <div className='home-course-upper'>
                            <p style={{ fontWeight: '600' }}>{item.name}</p>
                            <p style={{ fontSize: '13px' }}>{item.courseID}</p>
                        </div>
                        <div className='home-course-lower'>
                            <label>PROFESSOR</label>
                            <p>{item.professor.name}</p>
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