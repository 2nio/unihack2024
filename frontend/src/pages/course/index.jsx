import React, { useState } from 'react'
import Navbar from '../../components/navbar'
import './index.css'
import Sidebar from '../../components/sidebar'
import { FaFile } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useFetch } from '../../hooks/useFetch';
import { usePost } from '../../hooks/usePost';
import { usePut } from '../../hooks/usePut';
import { useLocation } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";

function Course() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const todayFormatted = `${day}/${month}/${year}`;

    const location = useLocation()
    const [image, setImage] = useState()
    const { data, loading, fetchData } = useFetch('user/current')
    const { postData, loading: loadingMaterial } = usePost('material')
    const { postData: postTest, loading: loadingTest } = usePost('test')
    const { putData: putMaterial, loading: loadingPutMaterial } = usePut(`material`)
    const { data: materials, loading: loadingMaterials, fetchData: fetchMaterials } = useFetch('material')

    function handleImage(file, id) {
        console.log(id)
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                const image = reader.result;
                putMaterial(id, { name: file.name, image }, fetchMaterials)
            };
        } else {
            return 0;
        }
    }


    return (
        <div className='course-main'>
            <Navbar />
            <div className='course-second'>
                <Sidebar />
                <div className='course-feed'>
                    {data?.role === 'professor' && <button className='course-feed-button'
                        onClick={() =>
                            postData({ course: location?.state.id }, () => fetchMaterials())}>
                        Create material</button>}
                    {materials?.map(item =>
                        <div key={item._id}>
                            <div className='course-material'>
                                <div className='course-material-left'>
                                    <FaFile />
                                    <input placeholder='Name' value={item.title}
                                        onChange={e => putMaterial(item._id, { title: e.target.value }, fetchMaterials)} />
                                </div>
                                <div className='course-material-right'>
                                    {data?.role === 'professor' ?
                                        <form style={{ width: '80px', height: '20px', backgroundColor: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px' }}
                                            onClick={e => document.getElementById(`upload-${item._id}`).click()}>
                                            <p style={{ cursor: 'pointer', fontSize: '14px' }}>Add file</p>
                                            <input id={`upload-${item._id}`} onChange={(e) => {
                                                handleImage(e.target.files[0], item._id)
                                            }} accept='image/*' className='input-upload' hidden type='file' />
                                        </form>
                                        : <button onClick={() => postTest({
                                            name: item.title + ' | ' + todayFormatted,
                                            material: item._id
                                        })}>
                                            Create test</button>}
                                    <RiArrowDropDownLine />
                                </div>
                            </div>
                            {item?.files?.map(item =>
                                <div className='course-material-file'>
                                    <p>{item?.name}</p>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <a href={item.url}>View file</a>
                                        {data?.role === 'professor' && <MdOutlineDelete />}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Course