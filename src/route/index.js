import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Feedback from "../pages/Feedback";
import Bang_diem from "../pages/Bang_diem";
import Mon_hoc from "../pages/Mon_hoc";
import Hoc_phan from "../pages/Hoc_phan";
import TestLayout from "../components/layout/TestLayout";

const publicRoutes = [
    {
        name: 'Trang chủ',
        icon: "fa-solid fa-house",
        path: '/', 
        component: Home

    },
    {
      name: 'Đăng nhập',
      path: '/login',
      icon: "fa-solid fa-right-to-bracket",
      component: Login
    }, 
    {
      name: 'Đăng ký',
      path: '/register',
      icon: "fa-solid fa-key",
      component: Register
    }, 
    {
      name: 'Môn học', 
      path: '/mon_hoc',
      icon: "fa-solid fa-book",
      component: Mon_hoc,
      submenu: [{
        name: 'Toán',
        id_subject: 'MH_1',
        icon: "fa-solid fa-calculator"
      }, {
        name: 'Vật lý',
        id_subject: 'MH_2',
        icon: "fa-solid fa-gears"
      }, {
        name: 'Hóa học',
        id_subject: 'MH_3',
        icon: "fa-solid fa-flask-vial"
      }, {
        name: 'Sinh học',
        id_subject: 'MH_4',
        icon: "fa-solid fa-dna"
      }
      , {
        name: 'Tiếng anh',
        id_subject: 'MH_5',
        icon: "fa-solid fa-spell-check"
      }],
      show: true
    }, 
    {
      name: 'Liên hệ',
      path: '/feedback',
      icon: "fa-solid fa-comment",
      component: Feedback
    }
];

const hoc_phan = [
  {
    path: '/hoc_phan',
    component: Hoc_phan,
  }
];

const test = [
  {
    path: '/test',
    component: TestLayout
  }
]

const privateRoutes = [
    {
        name: 'Trang chủ',
        icon: "fa-solid fa-house",
        path: '/', 
        component: Home

    },
    {
      name: 'Bảng điểm',
      path: '/bang_diem',
      icon: "fa-solid fa-right-to-bracket",
      component: Bang_diem
    }, 
    {
      name: 'Môn học', 
      path: '/mon_hoc',
      icon: "fa-solid fa-book",
      component: Mon_hoc,
      submenu: [{
        name: 'Toán',
        id_subject: 'MH_1',
        icon: "fa-solid fa-calculator"
      }, {
        name: 'Vật lý',
        id_subject: 'MH_2',
        icon: "fa-solid fa-gears"
      }, {
        name: 'Hóa học',
        id_subject: 'MH_3',
        icon: "fa-solid fa-flask-vial"
      }, {
        name: 'Sinh học',
        id_subject: 'MH_4',
        icon: "fa-solid fa-dna"
      }
      , {
        name: 'Tiếng anh',
        id_subject: 'MH_5',
        icon: "fa-solid fa-spell-check"
      }],
      show: true
    }, 
    {
      name: 'Liên hệ',
      path: '/feedback',
      icon: "fa-solid fa-comment",
      component: Feedback
    }
];

export { publicRoutes, privateRoutes, hoc_phan, test};