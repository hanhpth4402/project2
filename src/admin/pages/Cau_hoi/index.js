import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function ThemCauHoi(props) {

    const [idCauHoi, setIdCauHoi] = useState('');
    const [idHocPhan, setIdHocPhan] = useState(null);
    const [idMonHoc, setIdMonHoc] = useState('MH_1');
    const [idMucDo, setIdMucDo] = useState(1);
    const [noiDung, setNoiDung] = useState('');
    const [dapAnA, setdapAnA] = useState();
    const [dapAnB, setdapAnB] = useState('');
    const [dapAnC, setdapAnC] = useState('');
    const [dapAnD, setdapAnD] = useState('');
    const [dapAn, setDapAn] = useState();
    const [noiDungDapAn, setNoiDungDapAn] = useState('')

    // const [noiDungAnh, setNoiDungAnh] = useState('');
    const [noiDungImage, setNoiDungImage] = useState(null);
    const [dapAnAImage, setDapAnAImage] = useState(null)
    const [dapAnBImage, setDapAnBImage] = useState(null)
    const [dapAnCImage, setDapAnCImage] = useState(null)
    const [dapAnDImage, setDapAnDImage] = useState(null)

    // luu anh vao server
    const [noiDungAnh, setNoiDungAnh] = useState(null);
    const [dapAnAAnh, setDapAnAAnh] = useState(null)
    const [dapAnBAnh, setDapAnBAnh] = useState(null)
    const [dapAnCAnh, setDapAnCAnh] = useState(null)
    const [dapAnDAnh, setDapAnDAnh] = useState(null)

    const [errorFields, setErrorFields] = useState({
        idCauHoi: false,
        noiDung: false,
        dapAnA: false,
        dapAnB: false,
        dapAnC: false,
        dapAnD: false,
        dapAn: false,
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setErrorFields((prevErrors) => ({ ...prevErrors, [name]: false }));
        switch (name) {
            case 'idCauHoi':
                setIdCauHoi(value);
                break;
            case 'idHocPhan':
                setIdHocPhan(value);
                break;
            case 'idMonHoc':
                setIdMonHoc(value);
                break;
            case 'idMucDo':
                setIdMucDo(value);
                break;
            case 'noiDung':
                setNoiDung(value);
                break;
            case 'noiDungAnh':
                handleImageUpload(event);
                break;
            case 'dapAnA':
                setdapAnA(value)
                break;
            case 'dapAnAAnh':
                handleImageUpload(event);
                break;
            case 'dapAnB':
                setdapAnB(value);
                break;
            case 'dapAnBAnh':
                handleImageUpload(event);
                break;
            case 'dapAnC':
                setdapAnC(value);
                break;
            case 'dapAnCAnh':
                handleImageUpload(event);
                break;
            case 'dapAnD':
                setdapAnD(value);
                break;
            case 'dapAnDAnh':
                handleImageUpload(event);
                break;
            case 'dapAn':
                setDapAn(value);
                break;
            case 'noiDungDapAn':
                setNoiDungDapAn(value);
                break;
            default:
                break;
        }
    };

    const handleImageUpload = (event) => {
        const name = event.target.name
        const file = event.target.files[0];


        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            switch (name) {
                case "noiDungAnh":
                    setNoiDungImage(imageUrl);
                    setNoiDungAnh(file);
                    break;
                case "dapAnAAnh":
                    setDapAnAImage(imageUrl);
                    setDapAnAAnh(file);
                    break;
                case "dapAnBAnh":
                    setDapAnBImage(imageUrl);
                    setDapAnBAnh(file);
                    break;
                case "dapAnCAnh":
                    setDapAnCImage(imageUrl);
                    setDapAnCAnh(file);
                    break;
                case "dapAnDAnh":
                    setDapAnDImage(imageUrl);
                    setDapAnDAnh(file);
                    break;
                default:
                    break;
            }

        }
    };

    async function handleSubmit(e) {
        e.preventDefault();


        const requiredFields = ['idCauHoi', 'noiDung', 'dapAnA', 'dapAnB', 'dapAnC', 'dapAnD', 'dapAn'];
        const errors = {};
        let hasValidationError = false;

        requiredFields.forEach((field) => {
            if (!eval(field)) {
                errors[field] = true;
                hasValidationError = true;
            } else {
                errors[field] = false;
            }
        });
        
        if (!dapAn) {
            errors['dapAn'] = true;
            hasValidationError = true;
          }

        setErrorFields(errors);

        if (hasValidationError) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
            return;
        }

        const formData = new FormData();
        formData.append('ID_CAU_HOI', idCauHoi);
        // Thêm các dữ liệu ảnh vào FormData
        formData.append('NOI_DUNG_ANH', noiDungAnh);

        formData.append('DAP_AN_A_ANH', dapAnAAnh);
        formData.append('DAP_AN_B_ANH', dapAnBAnh);
        formData.append('DAP_AN_C_ANH', dapAnCAnh);
        formData.append('DAP_AN_D_ANH', dapAnDAnh);
        // Thêm các dữ liệu không phải ảnh vào FormData
        formData.append('ID_HOC_PHAN', idHocPhan);
        formData.append('ID_MON_HOC', idMonHoc);
        formData.append('ID_MUC_DO', idMucDo);
        formData.append('NOI_DUNG', noiDung);
        formData.append('DAP_AN_A', dapAnA);
        formData.append('DAP_AN_B', dapAnB);
        formData.append('DAP_AN_C', dapAnC);
        formData.append('DAP_AN_D', dapAnD);
        formData.append('DAP_AN', dapAn);
        formData.append('NOI_DUNG_DAP_AN', noiDungDapAn);

        await axios.post('http://localhost:8082/admin/them_cau_hoi', formData)
            .then((response) => {

                if (response.data && response.data === "create success!") {
                    toast.success("Thêm mới thành công!")
                    setIdCauHoi('')
                    setIdHocPhan(null)
                    setIdMonHoc('')
                    setIdMucDo(1)
                    setNoiDung('')
                    setdapAnA('')
                    setdapAnB('')
                    setdapAnC('')
                    setdapAnD('')
                    setDapAn()
                    setNoiDungDapAn('')
                    setNoiDungImage()
                    setDapAnAImage()
                    setDapAnBImage()
                    setDapAnCImage()
                    setDapAnDImage()
                } else {
                    console.log(response)
                    toast.error("Thêm mới không thành công!")

                }
            })
    }

    return (
        <>

            <div className="container">
                <h1>Tạo mới câu hỏi</h1>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="idCauHoi">ID câu hỏi<span className="text-danger">*</span>:</label>
                        <input
                            type="text"
                            id="idCauHoi"
                            name="idCauHoi"
                            className={`form-control ${errorFields.idCauHoi ? "border border-danger" : ""}`}
                            value={idCauHoi}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="idHocPhan">ID học phần:</label>
                        <input
                            type="text"
                            id="idHocPhan"
                            name="idHocPhan"
                            className="form-control"
                            value={idHocPhan}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="idMonHoc">Môn học<span className="text-danger">*</span>:</label>
                        <select
                            id="idMonHoc"
                            name="idMonHoc"
                            className="form-control"
                            value={idMonHoc}
                            onChange={handleInputChange}
                        >
                            <option value={'MH_1'}>Toán</option>
                            <option value={'MH_2'}>Lý</option>
                            <option value={'MH_3'}>Hóa</option>
                            <option value={'MH_4'}>Tiếng Anh</option>
                            <option value={'MH_5'}>Sinh học</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="idMucDo">Mức độ<span className="text-danger">*</span>:</label>
                        <select
                            id="idMucDo"
                            name="idMucDo"
                            className="form-control"
                            value={idMucDo}
                            onChange={handleInputChange}
                        >
                            <option value="1">Nhận biết</option>
                            <option value="2">Thông hiểu</option>
                            <option value="3">Vận dụng</option>
                            <option value="4">Vận dụng cao</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="noiDung">Nội dung<span className="text-danger">*</span>:</label>
                        <textarea
                            id="noiDung"
                            name="noiDung"
                            className={`w-100 ${errorFields.noiDung ? "border border-danger" : ""}`}
                            value={noiDung}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <label className='d-block' htmlFor="noiDungAnh">Nội dung ảnh:</label>
                        <input
                            type="file"
                            id="noiDungAnh"
                            name="noiDungAnh"
                            onChange={handleInputChange}
                        />
                        {/* Hiển thị ảnh */}
                        {noiDungImage && (
                            <img
                                src={noiDungImage}
                                alt="Ảnh câu hỏi"
                                className="img-thumbnail"
                                style={{ maxWidth: '200px', marginTop: '10px' }}
                            />
                        )}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="dapAnA">Đáp án A<span className="text-danger">*</span>:</label>
                        <textarea
                            id="dapAnA"
                            name="dapAnA"
                            className={`w-100 ${errorFields.dapAnA ? "border border-danger" : ""}`}
                            value={dapAnA}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col ">
                        <label className='d-block' htmlFor="dapAnAAnh">Đáp án A ảnh:</label>
                        <input
                            type="file"
                            id="dapAnAAnh"
                            name="dapAnAAnh"
                            onChange={handleInputChange}
                        />
                        {/* Hiển thị ảnh */}
                        {dapAnAImage && (
                            <img
                                src={dapAnAImage}
                                alt="Ảnh câu hỏi"
                                className="img-thumbnail"
                                style={{ maxWidth: '200px', marginTop: '10px' }}
                            />
                        )}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="dapAnB">Đáp án B<span className="text-danger">*</span>:</label>
                        <textarea
                            id="dapAnB"
                            name="dapAnB"
                            className={`w-100 ${errorFields.dapAnB ? "border border-danger" : ""}`}
                            value={dapAnB}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col ">
                        <label className='d-block' htmlFor="dapAnBAnh">Đáp án B ảnh:</label>
                        <input
                            type="file"
                            id="dapAnBAnh"
                            name="dapAnBAnh"
                            onChange={handleInputChange}
                        />
                        {/* Hiển thị ảnh */}
                        {dapAnBImage && (
                            <img
                                src={dapAnBImage}
                                alt="Ảnh câu hỏi"
                                className="img-thumbnail"
                                style={{ maxWidth: '200px', marginTop: '10px' }}
                            />
                        )}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="dapAnC">Đáp án C<span className="text-danger">*</span>:</label>
                        <textarea
                            id="dapAnC"
                            name="dapAnC"
                            className={`w-100 ${errorFields.dapAnC ? "border border-danger" : ""}`}
                            value={dapAnC}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col ">
                        <label className='d-block' htmlFor="dapAnCAnh">Đáp án C ảnh:</label>
                        <input
                            type="file"
                            id="dapAnCAnh"
                            name="dapAnCAnh"
                            onChange={handleInputChange}
                        />
                        {/* Hiển thị ảnh */}
                        {dapAnCImage && (
                            <img
                                src={dapAnCImage}
                                alt="Ảnh câu hỏi"
                                className="img-thumbnail"
                                style={{ maxWidth: '200px', marginTop: '10px' }}
                            />
                        )}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="dapAnD">Đáp án D<span className="text-danger">*</span>:</label>
                        <textarea
                            id="dapAnD"
                            name="dapAnD"
                            className={`w-100 ${errorFields.dapAnD ? "border border-danger" : ""}`}
                            value={dapAnD}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col ">
                        <label className='d-block' htmlFor="dapAnDAnh">Đáp án D ảnh:</label>
                        <input
                            type="file"
                            id="dapAnDAnh"
                            name="dapAnDAnh"
                            onChange={handleInputChange}
                        />
                        {/* Hiển thị ảnh */}
                        {dapAnDImage && (
                            <img
                                src={dapAnDImage}
                                alt="Ảnh câu hỏi"
                                className="img-thumbnail"
                                style={{ maxWidth: '200px', marginTop: '10px' }}
                            />
                        )}
                    </div>
                </div>

                <div className="row  pb-3">
                    <label>Đáp án<span className="text-danger">*</span>:</label>
                    <div className='col'>
                        <label className="form-check-label">
                            <input
                                type="radio"
                                name="dapAn"
                                value={1}
                                className={`form-check-input ${errorFields.dapAn ? "border border-danger" : ""}`}
                                onChange={handleInputChange}
                            />
                            A
                        </label>
                    </div>
                    <div className='col'>
                        <label className="form-check-label">
                            <input
                                type="radio"
                                name="dapAn"
                                value={2}
                                className={`form-check-input ${errorFields.dapAn ? "border border-danger" : ""}`}
                                onChange={handleInputChange}
                            />
                            B
                        </label>
                    </div>
                    <div className='col'>
                        <label className="form-check-label">
                            <input
                                type="radio"
                                name="dapAn"
                                value={3}
                                onChange={handleInputChange}
                                className={`form-check-input ${errorFields.dapAn ? "border border-danger" : ""}`}
                            />
                            C
                        </label>
                    </div>
                    <div className='col'>
                        <label className="form-check-label">
                            <input
                                type="radio"
                                name="dapAn"
                                value={4}
                                onChange={handleInputChange}
                                className={`form-check-input ${errorFields.dapAn ? "border border-danger" : ""}`}
                            />
                            D
                        </label>
                    </div>
                    <label htmlFor="noiDungDapAn">Nội dung đáp án:</label>
                    <div className='col'>
                        <textarea
                            id="noiDungDapAn"
                            name="noiDungDapAn"
                            className="w-100 border-0"
                            value={noiDungDapAn}
                            onChange={handleInputChange}
                        />
                    </div>

                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Tạo mới
                </button>

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

            </div >
        </>
    );
};


export default ThemCauHoi;