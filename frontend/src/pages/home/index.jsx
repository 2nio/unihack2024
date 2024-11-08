import React from 'react'
import { useFetch } from '../../hooks/useFetch'

function Home() {
    const { data: users, loading: loadingUsers, fetchData: fetchUsers } = useFetch('user')

    return (
        <>
            {loadingUsers ?
                <h1>Loading...</h1> :
                <div>{users?.map(item => <h1>{item.name}</h1>)}</div>}
        </>
    )
}

export default Home