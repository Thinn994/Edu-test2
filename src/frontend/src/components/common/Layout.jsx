import React, { useState } from 'react';
import { Menu, Plus, Bell, GraduationCap, Search, Book, Calendar, Folder, Clock, User, Settings, LogOut } from 'lucide-react';
import SidebarItem from '../SidebarItem';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* TOP NAVBAR */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-800">EduSubmit</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className="pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-full text-sm transition-all w-64"
            />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors tooltip" title="Tham gia hoặc tạo lớp học">
            <Plus className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
          {/* AVATAR WITH HOVER DROPDOWN */}
          <div className="relative group ml-2">
            <button 
              onClick={() => navigate('/profile')}
              className="p-1 border-2 border-transparent hover:border-blue-100 rounded-full transition-all focus:outline-none"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm group-hover:shadow-md transition-all">
                NH
              </div>
            </button>
            
            {/* DROPDOWN MENU */}
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-50">
              <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm shrink-0">
                  NH
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-gray-800 truncate">Nguyen Xuan Hoang</p>
                  <p className="text-xs text-gray-500 truncate">nguyen.hoang@example.com</p>
                </div>
              </div>
              
              <div className="p-2 space-y-1">
                <button 
                  onClick={() => navigate('/profile')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <User className="w-4 h-4" /> Xem hồ sơ
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <Settings className="w-4 h-4" /> Cài đặt tài khoản
                </button>
              </div>
              
              <div className="p-2 border-t border-gray-50">
                <button 
                  onClick={() => navigate('/register')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out border-r border-gray-200 bg-white overflow-y-auto hidden md:block`}>
          <div className="py-3 px-2 flex flex-col gap-1">
            <SidebarItem 
              icon={<Book />} 
              label="Lớp học" 
              active={location.pathname === '/dashboard'} 
              onClick={() => navigate('/dashboard')} 
            />
            <SidebarItem 
              icon={<Calendar />} 
              label="Lịch" 
              active={location.pathname === '/calendar'} 
              onClick={() => navigate('/calendar')} 
            />
            <hr className="my-2 border-gray-200" />
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tiện ích</div>
            <SidebarItem icon={<Clock />} label="Việc cần làm" />
            <hr className="my-2 border-gray-200" />
            <SidebarItem icon={<Folder />} label="Thư mục EduSubmit" />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
