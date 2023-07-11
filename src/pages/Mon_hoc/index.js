import { NavLink, useLocation } from 'react-router-dom';
import styles from './Mon_hoc.module.scss';
import classNames from 'classnames/bind';
// import axios from 'axios';
import axios from '../../server/customize-axios';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const cx = classNames.bind(styles);

function Items({ currentItems }) {
    return (
      <>
        {/* {currentItems &&
          currentItems.map((item) => (
            <div>
              <h3>Item #{item}</h3>
            </div>
          ))} */}
      </>
    );
  }

function Mon_hoc ({}) {


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    var name = searchParams.get('mon_hoc');

    var mon_hoc1 = {
        ID_MON_HOC: null,
        TEN_MON: null, 
        MO_TA: null
    };

    var hoc_phan1
    = [
        {
            ID_HOC_PHAN: null,
            ID_MON_HOC: null,
            TEN: null,
            SO_DE: null,
            MO_TA: null
        }
    ];

    var test__full1
    = [
        {
            TEN_DE: null,
            ID_DE_THI: null,
            ID_MON_HOC: null,
            ID_HOC_PHAN: null,
            SO_NGUOI_THAM_GIA: null,
            DIEM_CAO_NHAT: null,
            THOI_GIAN: null,
            TYPE: null,
            SO_CAU: null,
            DIEM_TB: null,
        }
    ]

    const mon_01 =  {
        mon_hoc: mon_hoc1,
        hoc_phan: hoc_phan1,
        test__full: test__full1
    }
    const [mon, setMon] = useState(mon_01);
    const [tong_de, setTong_de] = useState(0);

    async function setFullTestList (de_thi_mon, so_hien_thi, trang_hien_thi) {
        let text3 = `http://localhost:8082/de_thi_mon?de_thi_mon=${de_thi_mon}&so_hien_thi=${so_hien_thi}&trang_hien_thi=${(trang_hien_thi*5)}`;
        let test_full_list = await axios.get(text3);
        setMon({
            ...mon,
            test__full: test_full_list, 
        })
    };


    const [page, setPage] = useState ({
        per_page: 5,
        page_count: 0,
    })


    var myFunction = async () => {
        let text1 = `http://localhost:8082/mon_thi?mon_thi=${name}`;
        let mon_hoc111 = await axios.get(text1)

        let text2 = `http://localhost:8082/mon_thi_hoc_phan?mon_thi_hoc_phan=${name}`;
        let hoc_phan111 = await axios.get(text2)

        let text3 = `http://localhost:8082/de_thi_mon?de_thi_mon=${name}&so_hien_thi=5&trang_hien_thi=0`;
        let test__full111 = await axios.get(text3);

        let text4 = `http://localhost:8082/ten_mon?ten_mon=${name}&type=1`;
        let respond = await axios.get(text4);
        let so_de_full = respond[0].sodethi;
        setTong_de(so_de_full);
        setPage({
            ...page,
            page_count: Math.ceil(so_de_full/5)
        })

        if (mon_hoc111.length !== 0) {
            setMon ({
                ...mon_01,
                mon_hoc: mon_hoc111[0]
            })
            if (hoc_phan111.length !==0 && test__full111.length !== 0) {
                setMon({
                    test__full: test__full111,
                    mon_hoc: mon_hoc111[0],
                    hoc_phan: hoc_phan111,
                })
            }
        } else {
            console.log('result')
        };
    };

    useEffect(() => {
        myFunction();
    }, [name]);
  
    const handlePageClick = (event) => {
        const newOffset = event.selected;
        setFullTestList(name, page.per_page, newOffset);
    };


    function changePage_Count (event) {
        setPage ({
            per_page: event.target.value,
            page_count: Math.ceil(tong_de/event.target.value)
        });
        setFullTestList (name, event.target.value, 0);
    };

    
  

    return (
        <>
            <div className={cx('mon_hoc__container')}>
                <div className={cx('subject__title')}> 
                    MÔN {mon.mon_hoc.TEN_MON}
                </div>

                <div className={cx('subject__inner')}>
                    <div className={cx('subject__description')}>
                        <div className={cx('subject__des-title')}>
                            Tuyển Chọn Các Đề Thi
                        </div>
                        <div className={cx('subject__des-text')}>
                            {mon.mon_hoc.MO_TA}
                        </div>
                    </div>

                    { 
                    mon.hoc_phan[0].ID_HOC_PHAN && 
                    <div>
                    <div className={cx('subject__mini')}>
                        <div className={cx('subject__mini-title')}>
                            Thi Nhanh Theo Chủ Đề
                        </div>
                        <div className={cx('subject__mini-container')}>
                            <table className={cx('subject__mini-table')}>
                                <tr className={cx('subject__mini-head')}>
                                    <th className={cx('subject__mini-head-name')}>
                                        Học Phần
                                    </th>
                                    <th className={cx('subject__mini-head-notname')}>
                                        Chi Tiết
                                    </th>
                                </tr>
                                {mon.hoc_phan.map((item, index) => {
                                    let link_text = `/hoc_phan?hoc_phan=${item.ID_HOC_PHAN}`;
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {item.TEN}
                                            </td> 
                                            <td >
                                                <NavLink to={link_text}>Chi Tiêt</NavLink>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                    </div>

                    <div className={cx('subject__full')}>
                        <div className={cx('subject__full-title')}>
                            Đề Thi Đầy Đủ
                        </div>
                        <div className={cx('subject__full-tools')}>
                            <div className={cx('tools__display')}>
                                <span className={cx('tool__display-text')}>
                                    Hiển thị danh mục
                                </span>                        <select value={page.per_page} 
                                className={cx('tool__display-select')}
                                onChange={(event) => {
                                    changePage_Count(event)
                                }}
                                >
                                    <option defaultValue value={5}> 5 </option>
                                    <option value={10}> 10 </option>
                                    <option value={15}> 15 </option>
                                </select>
                            </div>
                            {/* <div className={cx('tools__sort')}>
                                Sắp xếp
                            </div> */}
                        </div>
                        <div className={cx('subject__full-container')}>
                            <ul className={cx('subject__full-list')}>
                            {
                                mon.test__full.map ((item, index) => (
                                    <li key={"subject_full_"+index} className={cx('subject__full-item')}>
                                        <div className={cx('subject__full-short')}>
                                            <div className={cx('test__title')}>
                                                {item.TEN_DE}
                                            </div>
                                            <NavLink 
                                                className={cx('test__btn')}
                                                to={`/test?test=${item.ID_DE_THI}`}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    textDecoration: 'none'
                                                }}
                                                onClick={() => {
                                                    alert('Thông báo', 'Xác nhận tham gia thi');
                                                }}
                                            >
                                                Thi Thử
                                            </NavLink>
                                        </div>
                                        <div className={cx('subject__full-detail')}>
                                            <div className={cx('test__socau')}>
                                                <i className="fa-solid fa-book"/> {item.SO_CAU} Câu Hỏi
                                            </div>
                                            <div className={cx('test__thoigian')}>
                                            <i className="fa-solid fa-clock"/> {item.THOI_GIAN} Phút
                                            </div>
                                            <div className={cx('test__diemcaonha')}>
                                            <i className="fa-solid fa-star"/> Điểm cao nhất: <span style={{color: 'rgba(60,141,188, 1)', fontWeight: '600'}}>{item.DIEM_CAO_NHAT}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                            </ul>
                        </div>
                        <ReactPaginate
                            style={{color: 'red'}}
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={page.page_count}
                            previousLabel="< previous"
                            pageClassName='page-item'
                            pageLinkClassName='page-link'
                            previousClassName='page-item'
                            previousLinkClassName='page-link'
                            nextClassName='page-item'
                            nextLinkClassName='page-link'
                            breakClassName='page-item'
                            breakLinkClassName='page-link'
                            containerClassName='pagination'
                            activeClassName={'active'}

                        />
                    </div>
                    </div>
                    }
                </div>
            </div>
        </>
        // <Thi_thu/>
    )
}


export default Mon_hoc
