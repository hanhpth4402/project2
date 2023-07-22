import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {MdDelete} from 'react-icons/md'
import { GrUpdate } from 'react-icons/gr'

function DeDaTao() {

    const ID_ADMIN = useSelector(state => state.admin.account.id)

    const [tieude, setTieude] = useState()
    const [monhoc, setMonhoc] = useState()
    const [mota, setMota] = useState()

    const [dethi, setDethi] = useState([])

    const getDeThi = () => {
        axios.post('http://localhost:8082/admin/de_thi',
            { ID_ADMIN })
            .then((res) => {
                setDethi(res.data)
            })
    }

    function handleCreate(e) {
        navigation('/admin/list_de_thi/update')
    }

    const navigation = useNavigate();
    function handleUpdate(e) {
        alert("update đề thi?")
        navigation('/admin/list_de_thi/update')
    }

    async function handleDelete (ID_DE_THI) {
        if(window.confirm('Are sure want to delete?')) {
            await axios.delete('http://localhost:8082/admin/xoa_de_thi', 
            {
                params : {
                    ID_ADMIN : ID_ADMIN,
                    ID_DE_THI: ID_DE_THI
                }
            })
            .then((res) => {
                if(res.data == "delete success!") {
                    toast.success('Xóa thành công');
                    getDeThi()
                } else {
                    console.log(res)
                    toast.success('Xóa thất bại');
                }
            })
        }
        
        
    }

    useEffect(() => {
        getDeThi();
    }, [])
    return (
        <div className='container vh-100'>
            <h1 className='dedatao-header '>các đề đã tạo</h1>
            <div className='dedatao-body' >
                <div className='dedatao-table d-flex justify-content-center '>

                    <div className='col-10  shadow p-3 mb-5 bg-body rounded'>
                        <table className="table table-hover table-bordered ">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên đề thi</th>
                                    <th scope='col'>SỐ người tham gia</th>
                                    <th scope="col">Ngày tạo</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dethi && dethi.map((items, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{items.TEN_DE}</td>
                                                <td>{items.SO_NGUOI_THAM_GIA}</td>
                                                <td>{items.NGAY_TAO.slice(0, 19).replace('T', ' ')}</td>
                                                <td>
                                                    <span >
                                                        <Link
                                                            to='/admin/list_de_thi/update'
                                                            state={{ dethi: items }}
                                                            className='text-decoration-none'
                                                        >
                                                            <GrUpdate className='m-1'/>
                                                            Sửa
                                                        </Link>

                                                    </span>
                                                    <span className='m-3' onClick={() => handleDelete(items.ID_DE_THI)}>
                                                        <MdDelete/>
                                                        <label style={{cursor: 'pointer', color: 'blue'}}> Xóa</label>
                                                    </span>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='dedatao-taomoi d-flex justify-content-center pt-4'>
                    <div className='d-flex justify-content-center pt-4'>
                        <Link to='/admin/list_de_thi/update'>
                            <button type="button" className="btn btn-primary" >Tạo mới</button>
                        </Link>                       
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-left"
                autoClose={500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                backdrop="static"
                keyboard={false}
            />
        </div>
    );
}

export default DeDaTao;
