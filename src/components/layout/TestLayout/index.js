import React, { useState, useEffect, useRef } from "react";
import { useNavigate , useLocation } from 'react-router-dom';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';  
import axios from '../../../server/customize-axios'

import classNames from 'classnames';
import './TestLayout.scss';
import { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { imagefrombuffer } from "imagefrombuffer";



const formatTime = (second) => {
    let hours = Math.floor(second / 3600);
    let minutes = Math.floor((second - hours*3600) / 60);
    let seconds = Math.floor (second - hours*3600 - minutes*60);

    if (hours < 10) hours = "0"+hours;
    if (minutes < 10) minutes = "0"+minutes;
    if (seconds < 10) seconds = "0"+seconds;

    return <h1 className={classNames({"time__nomarl": true, "time__warning": second < 600})}>{hours} : {minutes} : {seconds}</h1>
}

// console.log(list_cau_hoi);

function TestLayout (props) {
    // eslint-disable-next-line no-restricted-globals
    const navigate = useNavigate();

    ///////Count down

    const [countdown, setCountdown] = useState(5400);
    const timeId = useRef();

    useEffect (() => {
        timeId.current = setInterval(() => {
            setCountdown(prev => prev-1);
        }, 1000);
        return () => clearInterval(timeId.current);
    }, []);

    useEffect (() => {
        if (countdown <= 0) {
            clearInterval(timeId.current);
            setShow(true);
        }
    }, [countdown])


    ////// aleart ///////

    const [show, setShow] = useState(false);
    const [titleAlert, setTitleAlert] = useState("Thời gian đã kết thúc");


    /////// tinh diem /////

    const [showTinhDiem, setShowTinhDiem] = useState(false);
    
    function TINHDIEM (ds_cau_hoi, ds_cau_tra_loi) {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        console.log(today.toISOString());
        clearInterval(timeId.current);

        
        let diem = 0; 
        let ds_result = [];

        for (let index in ds_cau_hoi) {
            if (ds_cau_hoi[index].DAP_AN === ds_cau_tra_loi[index].answer){
                diem += 0.2;
            }
            ds_result.push ({
                "ID_CAU_HOI": `${ds_cau_hoi[index].ID_CAU_HOI}`,
                "DAP_AN_USERS": `${ds_cau_tra_loi[index].answer}`
            })
        }


        var result = {
            "id_user": `${localStorage.getItem("id")}`,
            "id_de_thi": "DT_1", 
            "diem": `${diem}`, 
            "ngay_thi": `${today.toISOString()}`,
            "thoi_gian": `${5400 - countdown}`, 
            "chi_tiet": ds_result
        }

        console.log(result);
        clearInterval(timeId.current);
        SUBMIT(result);
    }

    const [loading, setLoading] = useState (true);

    async function SUBMIT (result) {
        setShowTinhDiem(true);
        setLoading(true);
        
        let respond = await axios.post('http://localhost:8082/submit', result);
        console.log(respond);
        
        setLoading(false);
        navigate('/bang_diem');
    }

    //// submit ////// 

    function submit () {
        let tmp = question_list.find((item) => item.answer === 0);
        if (tmp) {
            setShow(true);
            setTitleAlert ("Nộp bài khi chưa hoàn thành bài thi");
        } else {
            setShow(true);
            setTitleAlert ("Nộp bài")
        }
    }

    ///////Lay cau hoi 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    var test = searchParams.get('test');

    let abc = {
        ID_CAU_HOI: "",
	    ID_HOC_PHAN: "", 
	    ID_MON_HOC: "",
		ID_MUC_DO: "",
		NOI_DUNG: "",
		NOI_DUNG_ANH: "",
		DAP_AN_A: "",
		DAP_AN_A_ANH: "",
		DAP_AN_B: "", 
		DAP_AN_B_ANH: "",
		DAP_AN_C: "",
		DAP_AN_C_ANH: "",
		DAP_AN_D: "",
		DAP_AN_D_ANH: "",
		DAP_AN: "",
		NOI_DUNG_DAP_AN: "",
    };


    var list_cau_tra_loi = [];    
    var list_cau_hoi = [abc];

    const [question_list, setQuestion_list] = useState([{STT: 1, attemped: false, marked: false, answer: 0}]);
    const [list_hoi, setList_hoi] = useState(list_cau_hoi);


    const [cau_hoi, setCau_hoi] = useState(abc);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [displayFlag, setDisplayFlag] = useState(true);
    const total_question = question_list.length;

    async function getCauHoi (test) {
        let text1 = "http://localhost:8082/de_thi?de_thi=DT_1";
        list_cau_hoi = await axios.get(text1);
        let list_cau = [];
        for (let index in list_cau_hoi) {
            list_cau_tra_loi.push({STT: index, attemped: false, marked: false, answer: 0});
            list_cau.push(list_cau_hoi[index]);
        }
        setQuestion_list(list_cau_tra_loi);
        setCau_hoi(list_cau_hoi[currentQuestion-1]);
        setList_hoi(list_cau);
    };

    
    useEffect (() => {
        getCauHoi(test);
    }, [test]);

    useEffect (() => {
        setCau_hoi(list_hoi[currentQuestion-1]);
        setDisplayFlag(question_list[currentQuestion-1].marked);
    }, [currentQuestion]);

    function changeAnswer (newanswer) {
        let newData = [...question_list];
        newData[currentQuestion-1].answer = newanswer;
        setQuestion_list(newData);
    }


    return (
        <>  
            <div class="modal" tabindex="-1" style={{display: showTinhDiem ? "block" : "none", backgroundColor: "#6161613f"}}>
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> TÍNH TOÁN KẾT QUẢ </h5>
                    </div>
                    <div class="modal-body h-75">
                        {loading && <h1><i className="fas fa-circle-notch fa-spin d-flex justify-content-center" style={{color: "green"}}/></h1>}
                        {!loading && <h1><i className="fa-solid fa-circle-check d-flex justify-content-center" style={{color: "green"}}></i></h1>}
                    <p>Bạn chờ một lát để tính kết quả nhé</p>
                    </div>
                    </div>
                </div>
            </div>


            <div class="modal" tabindex="-1" style={{display: show ? "block" : "none", backgroundColor: "#6161613f"}}>
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> {titleAlert} </h5>
                    </div>
                    <div class="modal-body">
                        <p>Ấn lưu để nộp bài</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onClick={() => {
                            TINHDIEM(list_hoi, question_list);
                            setShow(false)
                        }}>Save changes</button>
                        <button type="button" class="btn btn-secondary" onClick={() => {
                            setShow(false)
                        }}>Close</button>
                    </div>
                    </div>
                </div>
            </div>

            <div className="test__container-block">
                <div className="test__content__container">
                    <div className="content__inner">
                        <div className="test__title-block sidetest-title">
                            <span>
                            THI THỬ THPT QUỐC GIA
                            </span>
                        </div>
                        <div className="test__question">
                            <div className="question__title-text">
                                <h4 className="title-text">
                                    Câu hỏi {currentQuestion}
                                </h4>
                                {displayFlag && <i className="fa-solid fa-flag flag_marked"></i>}
                            </div>
                            <div className="question__content-text">
                                <Latex>{cau_hoi.NOI_DUNG}</Latex>
                                <div>
                                    {cau_hoi.NOI_DUNG_ANH && <img  alt={`câu ${currentQuestion}`} title={`câu ${currentQuestion}`} src={imagefrombuffer({type: cau_hoi.NOI_DUNG_ANH.type, data: cau_hoi.NOI_DUNG_ANH.data,})}/>}
                                </div>
                            </div>
                            <div className="question__content-answer">
                                <div className="form-check" style={{display:'flex', alignItems: 'center', alignContent: "center"}}>
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="flexRadioDefault" 
                                        id="daA"
                                        onChange={() => {
                                            changeAnswer(1);
                                        }}    
                                        checked = {question_list[currentQuestion-1].answer === 1 ? true : false }
                                    />
                                    <label className="form-check-label" htmlFor="daA">
                                    <strong>A. &nbsp; </strong>
                                    <Latex>{cau_hoi.DAP_AN_A}</Latex>
                                    {cau_hoi.DAP_AN_A_ANH && <img  alt={`câu ${currentQuestion}`} title={`câu ${currentQuestion}`} src={imagefrombuffer({type: cau_hoi.DAP_AN_A_ANH.type, data: cau_hoi.DAP_AN_A_ANH.data,})}/>}
                                    </label>
                                </div>
                                <div className="form-check" style={{display:'flex', alignItems: 'center', alignContent: "center"}}>
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="daB"
                                            onChange={() => {
                                                changeAnswer(2);
                                            }}  
                                            checked = {question_list[currentQuestion-1].answer === 2 ? true : false }
                                            />
                                    <label className="form-check-label" htmlFor="daB">
                                    <strong>B. &nbsp; </strong>
                                    <Latex>{cau_hoi.DAP_AN_B}</Latex>
                                    {cau_hoi.DAP_AN_B_ANH && <img  alt={`câu ${currentQuestion}`} title={`câu ${currentQuestion}`} src={imagefrombuffer({type: cau_hoi.DAP_AN_B_ANH.type, data: cau_hoi.DAP_AN_B_ANH.data,})}/>}
                                    </label>
                                </div>
                                <div className="form-check" style={{display:'flex', alignItems: 'center', alignContent: "center"}}>
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="daC"
                                            onChange={() => {
                                                changeAnswer(3);
                                            }}  
                                            checked = {question_list[currentQuestion-1].answer === 3 ? true : false }
                                            />
                                    <label className="form-check-label" htmlFor="daC">
                                    <strong>C. &nbsp;</strong>
                                    <Latex>{cau_hoi.DAP_AN_C}</Latex>
                                    {cau_hoi.DAP_AN_C_ANH && <img  alt={`câu ${currentQuestion}`} title={`câu ${currentQuestion}`} src={imagefrombuffer({type: cau_hoi.DAP_AN_C_ANH.type, data: cau_hoi.DAP_AN_C_ANH.data,})}/>}
                                    </label>
                                </div>
                                <div className="form-check" style={{display:'flex', alignItems: 'center', alignContent: "center"}}>
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="daD"
                                            onChange={() => {
                                                changeAnswer(4);
                                            }}  
                                            checked = {question_list[currentQuestion-1].answer === 4 ? true : false }
                                            />
                                    <label className="form-check-label" htmlFor="daD">
                                    <strong>D. &nbsp; </strong>
                                    {cau_hoi.DAP_AN_D_ANH && <img  alt={`câu ${currentQuestion}`} title={`câu ${currentQuestion}`} src={imagefrombuffer({type: cau_hoi.DAP_AN_D_ANH.type, data: cau_hoi.DAP_AN_D_ANH.data,})}/>}
                                    <Latex>{cau_hoi.DAP_AN_D}</Latex>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>  

                    <footer>
                        <div className="footer__container">
                            <div className="footer__btn">
                                <div className="footer__btn-left">
                                    <button 
                                        className="footer__btn btn-mark"
                                        onClick={() => {
                                            let tmp_list = question_list;
                                            tmp_list[currentQuestion-1].marked = !tmp_list[currentQuestion-1].marked;
                                            setDisplayFlag(tmp_list[currentQuestion-1].marked);
                                            setQuestion_list(tmp_list);
                                        }}    
                                    >
                                        Mark for review
                                    </button>
                                    <button
                                        type="button" 
                                        className="footer__btn btn-move btn-previous"
                                        style={{cursor: currentQuestion===1?'not-allowed':'pointer'}}
                                        onClick={() => {
                                            setCurrentQuestion(currentQuestion => currentQuestion-1);
                                        }}

                                        disabled = {currentQuestion===1}
                                    >
                                        Previous
                                    </button>
                                    <button 
                                        className="footer__btn btn-move btn-next"
                                        style={{cursor: currentQuestion===total_question?'not-allowed':'pointer'}}
                                        onClick={() => {
                                            setCurrentQuestion(currentQuestion => currentQuestion+1);
                                        }}

                                        disabled = {currentQuestion===total_question}  
                                    >
                                        Next
                                    </button>
                                </div>
                                <div className="footer__btn-right">
                                    <button 
                                        className="footer__btn btn-submit"
                                        onClick={() => submit()}    
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>

                            <div className="footer__hr"></div>


                            <div className="footer__infor">
                                <div className="footer__symbol">
                                    <span className="footer__dot dot-current"></span>
                                    Current
                                </div>

                                <div className="footer__symbol">
                                    <span className="footer__dot dot-not-attempted"></span>
                                    Not Attempted
                                </div>

                                <div className="footer__symbol">
                                    <span className="footer__dot dot-answered"></span>
                                    Answered
                                </div>

                                <div className="footer__symbol">
                                    <span className="footer__dot dot-marked"></span>
                                    Marked
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            
                <aside className='sidetest__container'>
                    <div className='sidetest__item-time'>
                        <div className='time-title sidetest-title'>
                            <span>
                                Time Left
                            </span>
                        </div>
                        <div className='time-container'>
                            {formatTime(countdown)}
                        </div>
                    </div>
                    <div className='sidetest__item-questions'>
                        <div className='questions-title sidetest-title'>
                            <span>
                                Question List
                            </span>
                        </div>

                        <div className='questions-container'>
                            {question_list.map((item, index) => {
                                const question__stt = index+1;
                                return (
                                    <div 
                                        className={classNames({
                                                                "question-normal": true, 
                                                                "questions_current": question__stt===currentQuestion?true:false, 
                                                                "question_marked": item.marked, 
                                                                "question_attemped": item.answer !== 0
                                                            })}

                                        onClick={( ) => {
                                            setCurrentQuestion(question__stt)
                                        }}
                                        key={index}                        
                                    >
                                        {index+1}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default TestLayout