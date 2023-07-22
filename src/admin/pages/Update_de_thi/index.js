import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Latex from 'react-latex-next';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';


function UpdateDeThi(props) {

    const ID_ADMIN = useSelector(state => state.admin.account.id)
    const state = useLocation();
    const [capNhat, setCapNhat] = useState(false)
    const [ID_DE_THI, setID_DE_THI] = useState('')
    const [tieude, setTieude] = useState()
    const [monhoc, setMonhoc] = useState('MH_1')
    const [thoigian, setThoigian] = useState()
    const [socau, setSocau] = useState(0)
    const [loaide, setLoaide] = useState(1)
    const [NganHangCauhoi, setNganHangCauhoi] = useState([])
    const [checkedState, setCheckedState] = useState([])
    const [listCauhoi, setListCauhoi] = useState([])


    const navigation = useNavigate();

    async function getListCauHoi(ID_DE_THI) {
        await axios.get(`http://localhost:8082/admin/list_cau_hoi/`,
            {
                params: {
                    ID_DE_THI: ID_DE_THI
                }
            })
            .then((res) => {
                setNganHangCauhoi(res.data)
            })
    }

    async function getNganHangCauhoi() {

        await axios.get('http://localhost:8082/admin/ngan_hang_cau_hoi')
            .then((response) => {
                //them truong choose
                response.data.map((item, index) => {
                    item.checked = false;
                })
                setNganHangCauhoi(response.data)
            })
    }

    function handleChooseQuestion(e) {
        if (e.target.checked) {
            setSocau(socau + 1)
        } else {
            setSocau(socau - 1)
        }

        let updatedCheckedState = NganHangCauhoi
        updatedCheckedState.map((item, index) => {
            if (e.target.id == item.ID_CAU_HOI) {
                item.checked = !item.checked
            }
        });
        setNganHangCauhoi(updatedCheckedState);

    }

    function handleSubmit() {
        let updateListCauhoi = [];
        NganHangCauhoi.map((item, index) => {
            if (item.checked == true) {
                updateListCauhoi = [
                    ...updateListCauhoi,
                    item.ID_CAU_HOI
                ]
            }
        })

        let currentDateTime = new Date()
        let ngayTao = currentDateTime.toISOString().slice(0, 19).replace('T', ' ');

        if (capNhat) {
            axios.delete('http://localhost:8082/admin/xoa_de_thi',
                {
                    params: {
                        ID_ADMIN: ID_ADMIN,
                        ID_DE_THI: ID_DE_THI
                    }
                })
        }

        axios.post('http://localhost:8082/admin/tao_de_thi',
            {
                ID_ADMIN: ID_ADMIN,
                NGAY_TAO: ngayTao,
                TEN_DE: tieude,
                ID_DE_THI: ID_DE_THI,
                ID_MON_HOC: monhoc,
                THOI_GIAN: thoigian,
                TYPE: loaide,
                SO_CAU: socau,
                listCauhoi: updateListCauhoi
            })
            .then((res) => {

                if (res.data == "create success!") {
                    navigation('/admin/list_de_thi')
                    toast.success('Tạo mới thành công');

                } else {
                    console.log(res)
                    toast.success('Tạo mới thất bại');
                }
            })
    }

    useEffect(() => {
        if (state.state && state.state.dethi) {
            const dethi = state.state.dethi
            setID_DE_THI(dethi.ID_DE_THI)
            setMonhoc(dethi.ID_MON_HOC)
            setTieude(dethi.TEN_DE)
            setThoigian(dethi.THOI_GIAN)
            setSocau(dethi.SO_CAU)
            setLoaide(dethi.TYPE)
            getListCauHoi(dethi.ID_DE_THI);
            setCapNhat(true)
        } else {
            getNganHangCauhoi();
        }
    }, [])

    return (
        <div className='container'>
            <h1>
                {capNhat ? "Cập nhật đề" : "Tạo đề mới"}
            </h1>
            <div className='NganHang_cau_hoi-header'>

                <div className='dedatao-taomoi d-flex justify-content-center pt-4'>
                    <div className=' p-3 col-11 '>
                        <div className='tieude mt-3 d-flex justify-content-between'>
                            <div className='col-8'>
                                <strong className='col-4' >Tiêu đề</strong>
                                <input
                                    type='text'
                                    className='col-8 ms-1'
                                    onChange={(e) => setTieude(e.target.value)}
                                    defaultValue={tieude}
                                />
                            </div>
                            <div>
                                <strong>ID Đề Thi</strong>
                                <input
                                    type='text'
                                    className='ms-1'
                                    defaultValue={ID_DE_THI}
                                    onChange={e => setID_DE_THI(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='thoigian mt-3 d-flex justify-content-between'>
                            <div >
                                <strong >Môn học</strong>
                                <select className=" border-dark shadow-none ms-1" value={monhoc} onChange={(e) => setMonhoc(e.target.value)}>
                                    <option value={'MH_1'}>Toán</option>
                                    <option value={'MH_2'}>Lý</option>
                                    <option value={'MH_3'}>Hóa</option>
                                    <option value={'MH_4'}>Tiếng Anh</option>
                                    <option value={'MH_5'}>Sinh học</option>
                                </select>

                            </div>
                            <div>
                                <strong > Thời gian </strong>
                                <input
                                    className='ms-1'
                                    min={0}
                                    type="number"
                                    onChange={(e) => setThoigian(e.target.value)}
                                    defaultValue={thoigian}
                                />
                            </div>
                            <div>
                                <strong >Loại đề thi</strong>
                                <select className=" border-dark shadow-none ms-1" value={loaide} onChange={e => setLoaide(e.target.value)} >
                                    <option value={1}>full</option>
                                    <option value={0}>rút gọn</option>
                                </select>
                            </div>
                            <div>
                                <strong>Số câu:</strong>
                                <span className='ms-1'>{socau}</span>
                            </div>
                        </div>

                        <div className='d-flex justify-content-end pt-4'>
                            <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
                                {capNhat ? "Cập nhật" : "Tạo mới"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-3 '>
                <div className=" d-flex justify-content-center">
                    <div className="col-11 shadow p-3 mb-5 bg-body rounded">
                        <table className="table table-bordered table-hover " id='mytable'>
                            <thead>
                                <tr>
                                    <th scope="col">Chọn</th>
                                    <th scope="col">ID câu hỏi</th>
                                    <th scope="col">Mức độ</th>
                                    <th scope="col">Học phần</th>
                                    <th scope="col">Nội dung câu hỏi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    NganHangCauhoi && NganHangCauhoi.map((item, index) => {
                                        return (
                                            <tr key={index + 1}>
                                                <td>
                                                    <div className="custom-control custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id={item.ID_CAU_HOI}
                                                            onChange={(e) => { handleChooseQuestion(e) }}
                                                            checked={item.checked}
                                                        />
                                                    </div>
                                                </td>
                                                <td>{item.ID_CAU_HOI}</td>
                                                <td>{item.ID_MUC_DO}</td>
                                                <td>{item.ID_HOC_PHAN}</td>
                                                <td><Latex>{item.NOI_DUNG}</Latex></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
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

export default UpdateDeThi;