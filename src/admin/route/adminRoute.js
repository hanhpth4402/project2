
import TrangChu from "../pages/Home";
import Register from "../../pages/Register";
import DeDaTao from "../pages/De_da_tao";
import AdminLogin from "../pages/login";
import AdminRegister from "../pages/Register";
import UpdateDeThi from "../pages/Update_de_thi";
import ThemCauHoi from "../pages/Cau_hoi";


const adminPublicRoute = [
  {
    name: 'Trang chủ',
    icon: "fa-solid fa-house",
    path: '/admin',
    component: TrangChu
  },
  {
    name: 'Đăng nhập',
    path: '/admin/login',
    icon: "fa-solid fa-right-to-bracket",
    component: AdminLogin
  },
  {
    name: 'Đăng ký',
    path: '/admin/register',
    icon: "fa-solid fa-key",
    component: AdminRegister
  },
]

const adminPrivateRouter = [
  {
    name: 'Trang chủ',
    icon: "fa-solid fa-house",
    path: '/admin',
    component: TrangChu
  },
  {
    name: 'Danh sách đề thi',
    path: '/admin/list_de_thi',
    icon: "fa-solid fa-key",
    component: DeDaTao
  },
  {
    name: 'Tạo câu hỏi',
    path: '/admin/tao_cau_hoi',
    icon: "fa-solid fa-key",
    component: ThemCauHoi
  },
  {
    name: 'Đăng xuất',
    icon: 'fa-solid fa-right-to-bracket',
    path: '/',
    component: TrangChu
  }
]

const updatedethi = [ 
  {
    path: '/admin/list_de_thi/update',
    component: UpdateDeThi
  }
]

export { adminPublicRoute, adminPrivateRouter, updatedethi};