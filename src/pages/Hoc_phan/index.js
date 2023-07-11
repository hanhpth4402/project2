import { NavLink, useLocation } from 'react-router-dom';
import styles from './Hoc_phan.module.scss';
import classNames from 'classnames/bind';
// import axios from 'axios';
import axios from '../../server/customize-axios';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const cx = classNames.bind(styles);

const formatTime = (second) => {
    let hours = Math.floor(second / 3600);
    let minutes = Math.floor((second - hours*3600) / 60);
    let seconds = Math.floor (second - hours*3600 - minutes*60);

    if (hours < 10) hours = "0"+hours;
    if (minutes < 10) minutes = "0"+minutes;
    if (seconds < 10) seconds = "0"+seconds;

    return `${hours} : ${minutes} : ${seconds}`
}

function Hoc_phan () {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    var hoc_phan = searchParams.get('hoc_phan');

    const [hp, setHp] = useState({
        ID_HOC_PHAN: null,
        ID_MON_HOC: null,
        TEN: null,
        SO_DE: null,
        MO_TA: null
    });

    const [deThi, setDeThi] = useState([
        {
            TEN_DE: "",
            ID_DE_THI: "",
            ID_MON_HOC: "",
            ID_HOC_PHAN: "",
            THOI_GIAN: "",
            TYPE: "",
        }
    ]);

    console.log(hoc_phan)

    async function getThongTinHocPhan (hoc_phan) {
        let text1 = `http://localhost:8082/hoc_phan?hoc_phan=${hoc_phan}`;
        let tmp = await axios.get(text1);
        setHp(tmp[0]);
    }

    async function getDeThiTheoHocPhan (hoc_phan) {
        let text = `http://localhost:8082/de_thi_theo_hoc_phan?de_thi_theo_hoc_phan=${hoc_phan}`;
        let tmp = await axios.get(text);
        setDeThi(tmp);
    }

    useEffect(() => {
        getDeThiTheoHocPhan (hoc_phan);
        getThongTinHocPhan(hoc_phan);
    }, [hoc_phan]);


    const handlePageClick = (event) => {
        console.log(event);
    }

    return (
<main className="container">
        <div className="d-flex align-items-center justify-content-between p-3 my-3 text-blue bg-purple rounded shadow-sm">
            <div className="lh-1">
            <h1 className="h3 mb-0 text-black lh-1">{hp.TEN}</h1>
            <small>{hp.MO_TA}</small>
            </div>

            <form className="d-flex" style={{width: "500px"}} role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            </form>
        </div>

        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h6 className="border-bottom pb-2 mb-0"><strong>Danh sách đề thi rút gọn</strong></h6>
                {deThi.map((item, index) => (
                    <div className="d-flex text-muted pt-3"
                        key={index}
                    >
                        <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                        <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <strong className="text-gray-dark">{deThi[index].TEN_DE}</strong>
                                    <span className="d-block">{deThi[index].TYPE === 1 ? "Đề đầy đủ": "Đề rút gọn"}</span>
                                </div>
                                <div>
                                    <div> <strong>Thời gian làm: {formatTime(parseInt(deThi[index].THOI_GIAN))}</strong> </div>
                                </div>
                                <NavLink href="#">Chi tiết</NavLink>
                            </div>
                        </div>
                    </div>
                ))}

                
        <small className="d-block text-end mt-3">
        {/* <a href="#">All suggestions</a> */}
        </small>
    </div>
</main>
    )
}

export default Hoc_phan;