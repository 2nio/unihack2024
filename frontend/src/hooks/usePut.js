import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
axios.defaults.withCredentials = true

export const usePut = (route) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const putData = async (id, data, func) => {
        setLoading(true)
        try {
            const res = await axios.put(`http://localhost:8080/${route}/${id}`, data)
            console.log(res.status)
            if (func) func()
        } catch (error) {
            console.log(error)
            if (error.response.data.error === 'ExpiredRefreshToken') {
                navigate('/login')
            }
        } finally {
            setLoading(false)
        }
    }

    return { putData, loading }
}