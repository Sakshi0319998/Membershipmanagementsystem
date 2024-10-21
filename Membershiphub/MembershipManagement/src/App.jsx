import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components
import Login from './login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Category from './Components/Category';
import Profile from './Components/Profile';
import Membership from './Components/Membership';
import AddCategory from './Components/AddCategory';
import AddMembership from './Components/AddMembership';
import EditMembership from './Components/EditMembership';
import Start from './start';
import MembershipLogin from './MembershipLogin';
import AdminLogin from './AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/start' element={<Start />} />
        <Route path='/auth/adminlogin' element={<Login />} />
        <Route path='/membership_login' element={<MembershipLogin />} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/' element={<Home />} />
        <Route path='/membership' element={<Membership />} />
        <Route path='/dashboard/category' element={<Category />} />
        <Route path='/dashboard/profile' element={<Profile />} />
        <Route path='/dashboard/add_category' element={<AddCategory />} />
        <Route path='/dashboard/add_membership' element={<AddMembership />} />
        <Route path='/dashboard/edit_membership/:id' element={<EditMembership />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;