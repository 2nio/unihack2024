import React, { useEffect, useId, useState } from 'react'
import Navbar from '../../components/navbar'
import './index.css'
import Sidebar from '../../components/sidebar'
import { FaFile } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa6";
import { useFetch } from '../../hooks/useFetch';
import { usePost } from '../../hooks/usePost';
import { usePut } from '../../hooks/usePut';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Comprehension() {
    const location = useLocation()
    const { data, loading, fetchData } = useFetch('user/current')
    const { postData, loadingMaterial } = usePost('material')
    const { putData, loading: loadingPutMaterial } = usePut(`material`)
    const { data: tests, loading: loadingTests, fetchData: fetchTests } = useFetch('test')
    //const { data: test, loading: loadingTest, fetchData: fetchTest } = useFetch(`test`)
    const [id, setId] = useState(null)
    const [test, setTest] = useState(null)
    const [visibleAnswers, setVisibleAnswers] = useState({});
    //console.log(tests)

    /*     useEffect(() => {
            tests && console.log(tests[0]._id)
            setId(tests[0]._id)
            console.log(id)
            tests && fetchTest({ params: { id } }, console.log(test)
            )
        }, [tests]) */

    const toggleAnswer = (id) => {
        setVisibleAnswers((prevVisibleAnswers) => ({
            ...prevVisibleAnswers,
            [id]: !prevVisibleAnswers[id]
        }));
    };

    const getTest = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/test/${id}`,)
            setTest(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='course-main'>
            <Navbar />
            <div className='course-second'>
                <nav className='sidebar'>
                    <ul className='comp-ul'>
                        {tests?.map(item =>
                            <li>
                                <p onClick={() => getTest(item._id)}>{item.name}</p>
                            </li>
                        )}
                    </ul>
                </nav>
                <div className='course-feed'>
                    {test?.test?.map(item =>
                        <div>
                            <div className='course-material'>
                                <div className='course-material-left'>
                                    <FaQuestion />
                                    <p>{item.Q}</p>
                                </div>
                                <div className='course-material-right'>
                                    <button onClick={() => toggleAnswer(item._id)}
                                    >{visibleAnswers[item._id] ? 'Hide answer' : 'Show answer'}</button>
                                </div>
                            </div>
                            {visibleAnswers[item._id] &&
                                < div className='course-material-file'>
                                    <p>{item.A}</p>
                                </div>}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Comprehension