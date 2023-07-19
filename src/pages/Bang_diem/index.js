import { NavLink } from 'react-router-dom';
import './Bang_diem.scss'
import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from '../../server/customize-axios';
import classNames from 'classnames';

const formatTime = (second) => {
    let hours = Math.floor(second / 3600);
    let minutes = Math.floor((second - hours*3600) / 60);
    let seconds = Math.floor (second - hours*3600 - minutes*60);

    if (hours < 10) hours = "0"+hours;
    if (minutes < 10) minutes = "0"+minutes;
    if (seconds < 10) seconds = "0"+seconds;

    return `${hours} : ${minutes} : ${seconds}`
}

function Bang_diem () {
    const [valueSearch, setValueSearch] = useState("");
    const data = useSelector(state => state.user);
    const user_id = data.account.id;
    const [userExam, setUserExam] = useState([{
        TEN_DE: "",
        TEN_MON: "",
        ID_MON_HOC: "",
        ID_USERS: user_id,
        ID_DE_THI: "",
        DIEM: "",
        NGAY_THI: "",
        THOI_GIAN_LAM: "",
        THOI_GIAN: "",
        TYPE: "",
    }]);

    const [userExamSearch, setUserExamSearch] = useState([{
        TEN_DE: "",
        TEN_MON: "",
        ID_MON_HOC: "",
        ID_USERS: user_id,
        ID_DE_THI: "",
        DIEM: "",
        NGAY_THI: "",
        THOI_GIAN_LAM: "",
        THOI_GIAN: "",
        TYPE: "",
    }]);


    async function getThongTin (id_user) {  
        let respond = await axios.get('http://localhost:8082/bai_lam?bai_lam=USER_1');
        setUserExam(respond);
        setUserExamSearch(respond);
    }
    useEffect (() => {
        getThongTin(user_id);
    }, [])

    return (
        <>
<div class="container rounded shadow bg-white">
    <div class="row">
        <div class="border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span class="font-weight-bold">{localStorage.getItem("username")}</span><span class="text-black-50">{localStorage.getItem("email")}</span><span> </span></div>
        </div>
    </div>
</div>
    <main className="container">
            <div className="d-flex align-items-center justify-content-between p-3 my-3 text-blue bg-purple rounded shadow-sm  bg-white">
                <div className="lh-1 ">
                <h1 className="h3 mb-0 text-black lh-1">Bảng điểm </h1>
                <small>Since 2023</small>
                </div>

                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                        value={valueSearch}
                        onChange={(event) => {
                            setValueSearch(event.target.value);
                        }}
                    />
                    <button className="btn btn-outline-primary" type="submit"
                        onClick={(event) => {
                            event.preventDefault();
                            if (valueSearch === "") {
                                setUserExam(userExamSearch);
                            } else {
                                let find = userExam.filter((item) => {
                                    return item.TEN_DE.includes(valueSearch);
                                });
                                setUserExam(find);
                            }
                        }}
                    >Search</button>
                </form>
            </div>

            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h6 className="border-bottom pb-2 mb-0"><strong>Môn TOÁN</strong></h6>
                    {userExam.map ((item, index) => {
                        return (
                            userExam[index].ID_MON_HOC === 'MH_1' && <div 
                            className="d-flex text-muted pt-3"
                            key={index}
                            >
                                <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <strong className="text-gray-dark">{userExam[index].TEN_DE}</strong>
                                            <span className="d-block">{userExam[index].TYPE === 1 ? "Đề đầy đủ": "Đề rút gọn"}</span>
                                        </div>
                                        <div>
                                            <div> <strong>Điểm: {parseFloat(userExam[index].DIEM).toFixed(2)}</strong> </div>
                                            <div> <strong>Thời gian làm: {formatTime(parseInt(userExam[index].THOI_GIAN_LAM))}</strong> </div>
                                            <div> <strong>Ngày làm: {userExam[index].NGAY_THI.substring(0, 10)}</strong> </div>
                                        </div>
                                        <NavLink class="btn btn-primary" to={`chi_tiet?chi_tiet=${userExam[index].ID_DE_THI}`}>Chi tiết</NavLink>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                 
            <small className="d-block text-end mt-3">
            {/* <a href="#">All suggestions</a> */}
            </small>
            </div>

            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h6 className="border-bottom pb-2 mb-0"><strong>Môn VẬT LÝ</strong></h6>
                    {userExam.map ((item, index) => {
                        return (
                            userExam[index].ID_MON_HOC === 'MH_2' && <div 
                            className="d-flex text-muted pt-3"
                            key={index}
                            >
                                <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                                <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <strong className="text-gray-dark">{userExam[index].TEN_DE}</strong>
                                            <span className="d-block">{userExam[index].TYPE === 1 ? "Đề đầy đủ": "Đề rút gọn"}</span>
                                        </div>
                                        <div>
                                            <div> <strong>Điểm: {parseFloat(userExam[index].DIEM).toFixed(2)}</strong> </div>
                                            <div> <strong>Thời gian làm: {formatTime(parseInt(userExam[index].THOI_GIAN_LAM))}</strong> </div>
                                            <div> <strong>Ngày làm: {userExam[index].NGAY_THI.substring(0, 10)}</strong> </div>
                                        </div>
                                        <NavLink class="btn btn-primary" to={`chi_tiet?chi_tiet=${userExam[index].ID_DE_THI}`}>Chi tiết</NavLink>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                 
            <small className="d-block text-end mt-3">
            {/* <a href="#">All suggestions</a> */}
            </small>
            </div>
    </main>
        </>
    )
}

export default Bang_diem;