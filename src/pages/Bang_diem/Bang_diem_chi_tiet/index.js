// import axios from "axios";
import { useEffect } from 'react';
import axios from '../../../server/customize-axios'
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import Latex from 'react-latex-next';
import classNames from 'classnames';
import { imagefrombuffer } from "imagefrombuffer";

function ChiTiet ({}) {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const id_de_thi = params.get('chi_tiet');
    const id_user = localStorage.getItem('id');


    const [chiTietBaiLam, setChiTietBaiLam] = useState (
        {
            "ID_DE_THI": "",
            "DIEM": "",
            "NGAY_THI": "",
            "THOI_GIAN": "",
            "TEN_DE": "",
            "ID_HOC_PHAN": "",
            "TYPE": "",
            "CHI_TIET_CAU_TRA_LOI": [
                {
                    "STT": "",
                    "ID_USERS": "",
                    "ID_DE_THI": "",
                    "ID_CAU_HOI": "",
                    "DAP_AN_USERS": "",
                    "TEN_HOC_PHAN": "",
                    "ID_MON_HOC": "",
                    "ID_MUC_DO": "",
                    "NOI_DUNG": "",
                    "NOI_DUNG_ANH": "",
                    "DAP_AN_A": "",
                    "DAP_AN_A_ANH": "",
                    "DAP_AN_B": "",
                    "DAP_AN_B_ANH": "",
                    "DAP_AN_C": "",
                    "DAP_AN_C_ANH": "",
                    "DAP_AN_D": "",
                    "DAP_AN_D_ANH": "",
                    "DAP_AN": "",
                    "NOI_DUNG_DAP_AN": ""
                }
            ]
        }
    );
    const [chiTietSearch, setChiTietSearch] = useState (
        {
            "ID_DE_THI": "",
            "DIEM": "",
            "NGAY_THI": "",
            "THOI_GIAN": "",
            "TEN_DE": "",
            "ID_HOC_PHAN": "",
            "TYPE": "",
            "CHI_TIET_CAU_TRA_LOI": [
                {
                    "ID_USERS": "",
                    "STT": "",
                    "ID_DE_THI": "",
                    "ID_CAU_HOI": "",
                    "DAP_AN_USERS": "",
                    "TEN_HOC_PHAN": "",
                    "ID_MON_HOC": "",
                    "ID_MUC_DO": "",
                    "NOI_DUNG": "",
                    "NOI_DUNG_ANH": "",
                    "DAP_AN_A": "",
                    "DAP_AN_A_ANH": "",
                    "DAP_AN_B": "",
                    "DAP_AN_B_ANH": "",
                    "DAP_AN_C": "",
                    "DAP_AN_C_ANH": "",
                    "DAP_AN_D": "",
                    "DAP_AN_D_ANH": "",
                    "DAP_AN": "",
                    "NOI_DUNG_DAP_AN": ""
                }
            ]
        }
    );

    const thongtin = {
        "id_user": id_user,
        "id_de_thi": id_de_thi
    };
    const [anh, setAnh] = useState(null);
    const [searchValue, setSearchValue] = useState(0);

    function handelSearch (search) {
        if (search === '0') {
            setChiTietBaiLam(chiTietSearch)
        }else {
            if (search === 'câu đúng') {
                let newList = [...chiTietSearch.CHI_TIET_CAU_TRA_LOI];
                let newArray = newList.filter((item) => {
                    return item.DAP_AN === item.DAP_AN_USERS;
                });
                // console.log(newArray);
                setChiTietBaiLam({...chiTietSearch, CHI_TIET_CAU_TRA_LOI: newArray});
            }
            if (search === 'câu sai') {
                let newList = [...chiTietSearch.CHI_TIET_CAU_TRA_LOI];
                let newArray = newList.filter((item) => {
                    return item.DAP_AN !== item.DAP_AN_USERS;
                });
                // console.log(newArray);
                setChiTietBaiLam({...chiTietSearch, CHI_TIET_CAU_TRA_LOI: newArray});
            }
            if (search === 'câu bỏ trống') {
                let newList = [...chiTietSearch.CHI_TIET_CAU_TRA_LOI];
                let newArray = newList.filter((item) => {
                    return item.DAP_AN_USERS === 0;
                });
                setChiTietBaiLam({...chiTietSearch, CHI_TIET_CAU_TRA_LOI: newArray});
            }
            if (search !== 'câu đúng' && search !== 'câu sai' && search !== '0' && search !== 'câu bỏ trống') {
                let newList = [...chiTietSearch.CHI_TIET_CAU_TRA_LOI];
                let newArray = newList.filter((item) => {
                    return item.ID_MUC_DO === parseInt(search);
                });
                // console.log(newArray);
                setChiTietBaiLam({...chiTietSearch, CHI_TIET_CAU_TRA_LOI: newArray});
            }
        }
    }

    async function getThongTin (thongtin) {
        let result = await axios.post('http://localhost:8082/chi_tiet', thongtin);
        if (result.ID_DE_THI) {
            result.CHI_TIET_CAU_TRA_LOI.map((item, index) => {
                item.STT = index+1;
                return true;
            })
            setChiTietBaiLam(result);
            setChiTietSearch(result);
        }

        // let anh = await axios.post('http://localhost:8082/getanh');
        // setAnh(anh[0].NOI_DUNG_ANH);
        // console.log(anh);

    }

    useEffect (() => {
        getThongTin(thongtin);
        // getAnh()     {<img src={imagefrombuffer({type: anh.type, data: anh.data,})}/>}
    }, [])
    
    return (
        <>
        
<main className="container" style={{userSelect: "none"}}>
        <div className="d-flex align-items-center justify-content-between p-3 my-3 text-blue bg-purple rounded shadow-sm">
            <div className="lh-1">
            <h1 className="h3 mb-0 text-black lh-1">{chiTietBaiLam.TEN_DE}</h1>
            <small>{chiTietBaiLam.TEN_DE}</small>
            </div>

            <form className="d-flex" style={{width: "500px"}} role="search">
            <select class="form-select" aria-label="Default select example" placeholder='Chọn câu muốn lọc' onChange={(event) => {
                handelSearch(event.target.value);
            }}>
                <option value={0}>Chọn câu muốn lọc</option>
                <option value={'câu đúng'}>Câu đúng</option>
                <option value={'câu sai'}>Câu sai</option>
                <option value={'câu bỏ trống'}>Câu bỏ trống</option>
                <option value={1}>Nhận biết</option>
                <option value={2}>Thông hiểu</option>
                <option value={3}>Vận dụng</option>
                <option value={4}>Vận dụng cao</option>
            </select>            
            </form>
        </div>

        <div className="d-flex align-items-center justify-content-between p-3 my-3 text-blue bg-purple rounded shadow-sm">
            <div className="lh-1">
            <h4 className="h3 mb-0 text-black lh-1 text-success">Điểm: {parseFloat(chiTietBaiLam.DIEM).toFixed(2)}</h4>
            </div>
            <div className="lh-1">
            {chiTietBaiLam.NGAY_THI && <h4 className="h3 mb-0 text-black lh-1 text-success">Ngày làm bài: {chiTietBaiLam.NGAY_THI.substring(0,10)}</h4>}
            </div>
        </div>

        <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h6 className="border-bottom pb-2 mb-0"><strong>Đáp án chi tiết</strong></h6>
                {chiTietBaiLam.CHI_TIET_CAU_TRA_LOI.map(
                    (item, index) => {
                        let nd_anh = ""
                        let mucDo = "";
                        switch(item.ID_MUC_DO) {
                            case 1:
                              mucDo = "Nhận biết"
                              break;
                            case 2:
                              mucDo = "Thông hiểu"
                              break;
                            case 3:
                              mucDo = "Vận dụng"
                              break;
                            case 4:
                              mucDo = "Vận dụng cao"
                              break;
                            default:
                              mucDo = ""
                              break;
                          };

                        const luaChonCuaUser = item.DAP_AN_USERS;
                        const luaChonDung = item.DAP_AN;
                        var dung = luaChonCuaUser === luaChonDung ? 1 : 0;
                        if (luaChonCuaUser === 0) dung = 2;


                        const list_da = [{}, {
                            ten: "A",
                            noi_dung: item.DAP_AN_A,
                            anh: item.DAP_AN_A_ANH
                        },
                        {
                            ten: "B",
                            noi_dung: item.DAP_AN_B,
                            anh: item.DAP_AN_B_ANH
                        },
                        {
                            ten: "C",
                            noi_dung: item.DAP_AN_C,
                            anh: item.DAP_AN_A_ANH
                        },
                        {
                            ten: "D",
                            noi_dung: item.DAP_AN_D,
                            anh: item.DAP_AN_D_ANH
                        }]
                                                 
                        return (
                            <div className="d-flex text-muted pt-3"
                            key={index}
                        >
                            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <strong className="text-gray-dark">
                                            <h4 className={classNames({
                                                
                                            })}>Câu. {item.STT} ({dung === 1 ? "Đúng" : (dung === 2) ? "Bỏ trống": "Sai"})</h4>
                                            <div>
                                                <Latex>{item.NOI_DUNG}</Latex>
                                                <div>
                                                    {item.NOI_DUNG_ANH && <img  alt={`câu ${index+1}`} title={`câu ${index+1}`} src={imagefrombuffer({type: item.NOI_DUNG_ANH.type, data: item.NOI_DUNG_ANH.data,})}/>}
                                                </div>
                                            </div>
                                        </strong>
                                        <span className="d-block">
                                            {list_da.map ((item, index) => {
                                                if (index !== 0) {
                                                    return (
                                                        <div style={{width: "fit-content", margin:"20px 0px", display:'flex', alignItems: "center"}} 
                                                            className={classNames({
                                                            
                                                        })}>
                                                            {item.ten}. <Latex>{item.noi_dung}</Latex> &nbsp; {luaChonDung === index && <i class="fa-solid fa-check"></i>} 
                                                            {luaChonCuaUser === index && !dung && <i class="fa-solid fa-xmark"></i>}
                                                            {/* {item.DAP_AN_A_ANH && <image></image>}  */}
                                                        </div>  
                                                    )
                                                }
                                            })}
                                        </span>
                                        <div 
                                            className={classNames({
                                                "badge rounded-pill bg-primary": true, 
                                                "bg-success": item.ID_MUC_DO===2, 
                                                "bg-warning": item.ID_MUC_DO===3,
                                                "bg-danger": item.ID_MUC_DO === 4
                                            })}>{ mucDo }</div>
                                            
                                        <div style={{marginTop: "10px"}}>
                                            <h6>
                                                <strong>
                                                Lời giải: {item.TEN_HOC_PHAN}
                                                </strong>
                                                {item.NOI_DUNG_DAP_AN && <Latex>{item.NOI_DUNG_DAP_AN}</Latex>}
                                            </h6>
                                        </div>
                                    </div>
                                    <h6 style={{color: dung===1?"green":"red"}}>{dung === 1 ? "0.2/0.2" : "0/0.2"}</h6>
                                </div>
                            </div>
                        </div>
                        )
                    }
                )}

                
        <small className="d-block text-end mt-3">
        {/* <a href="#">All suggestions</a> */}
        </small>
    </div>
</main>
        </>
    )
}

export default ChiTiet;