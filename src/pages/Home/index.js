import './Home.scss';
import { ToastContainer } from 'react-toastify';


function Home () {
    
    return (
        <>
<main class="container py-5" style={{height: '100vh'}}>
  <h1>Thi thử THPT Quốc Gia</h1>
  <p>Thi Thử Online được thành lập để tạo ra một Thư Viện các Đề Thi Trung Học Phổ Thông (THPT) Quốc Gia. Các đề thi được tổng hợp và chọn lọc từ các đề thi chính thức, tham khảo của Bộ Giáo Dục, các Sở Giáo Dục và các Trường Chuyên trong cả nước. Hy vọng Thi Thử Online sẽ là nguồn tài liệu tham khảo hữu ích cho các bạn học sinh (và giáo viên) để chuẩn bị tốt nhất cho kỳ thi đại học hay thi THPT Quốc gia. Hãy đăng ký thành viên và bắt đầu Thi Thử Online hoàn toàn miễn phí. Bài làm sẽ được chấm điểm ngay sau khi Nộp bài và được lưu lại trong phần Bảng Điểm của từng thành viên để cho các bạn tiện theo dõi.

Nếu các bạn thấy trang Thi Thử Online hữu ích, các bạn hãy chia sẻ để cho nhiều người cùng sử dụng (khi đó các bạn sẽ được thi thử miễn phí không bị giới hạn bởi số đề thi). Và khi có nhiều người cùng sử dụng trang Thi Thử Online, chúng tôi sẽ cập nhật càng nhiều đề thi, đáp án và nhiều tính năng khác nữa.

</p>

  {/* <p>By adding <code>data-masonry='{"percentPosition": true }'</code> to the <code>.row</code> wrapper, we can combine the powers of Bootstrap's responsive grid and Masonry's positioning.</p> */}

  <hr class="my-5"/>

</main>



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
        </>
    )
}

export default Home;