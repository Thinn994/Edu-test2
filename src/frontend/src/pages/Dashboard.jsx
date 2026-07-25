import React, { useState } from 'react';
import { Menu, Plus, Bell, User, Book, Calendar, Folder, MoreVertical, GraduationCap, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Đã thêm khai báo navigate ở đây!
  const navigate = useNavigate();

  // Dữ liệu mẫu (Mock data) cho các lớp học
  const mockClasses = [
    { id: 1, name: "CS300 - Software Engineering", section: "Group 07", teacher: "A", color: "bg-blue-600" },
    { id: 2, name: "CS13002 - Artificial Intelligence", section: "AI Foundation", teacher: "B", color: "bg-emerald-600" },
    { id: 3, name: "UI/UX Design Principles", section: "Frontend Mastery", teacher: "C", color: "bg-purple-600" },
    { id: 4, name: "Database Systems", section: "PostgreSQL & MongoDB", teacher: "D", color: "bg-orange-600" },
    { id: 5, name: "Cloud Computing", section: "AWS & Azure", teacher: "E", color: "bg-pink-600" },
    { id: 6, name: "Cybersecurity Basics", section: "Network Security", teacher: "F", color: "bg-red-600" },
    { id: 7, name: "Mobile App Development", section: "React Native & Flutter", teacher: "G", color: "bg-teal-600" },
    { id: 8, name: "Data Science", section: "Python & R", teacher: "H", color: "bg-indigo-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* 1. TOP NAVBAR */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-800">EduSubmit</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors tooltip" title="Tham gia hoặc tạo lớp học">
            <Plus className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
          <button className="ml-2 p-1 border-2 border-transparent hover:border-gray-200 rounded-full">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
              NH
            </div>
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* 2. SIDEBAR MENU */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out border-r border-gray-200 bg-white overflow-y-auto hidden md:block`}>
          <div className="py-3 px-2 flex flex-col gap-1">
            <SidebarItem icon={<Book />} label="Lớp học" active />
            <SidebarItem icon={<Calendar />} label="Lịch" />
            <hr className="my-2 border-gray-200" />
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Đang giảng dạy</div>
            <SidebarItem icon={<Clock />} label="Việc cần làm" />
            {mockClasses.map(cls => (
              <SidebarItem key={cls.id} icon={<div className={`w-6 h-6 rounded-full ${cls.color} text-white flex items-center justify-center text-xs`}>{cls.name.charAt(0)}</div>} label={cls.name.split(' - ')[0]} />
            ))}
            <hr className="my-2 border-gray-200" />
            <SidebarItem icon={<Folder />} label="Thư mục EduSubmit" />
          </div>
        </aside>

        {/* 3. MAIN CONTENT (Lưới danh sách lớp học) */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockClasses.map((cls) => (
              <div key={cls.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 group relative">
                
                {/* Header thẻ lớp học - ĐÃ ĐƯỢC CHỈNH LẠI CHUẨN XÁC */}
                <div 
                  className={`${cls.color} h-28 p-4 text-white relative cursor-pointer`}
                  onClick={() => navigate('/course/stream')}
                >
                  <div className="flex justify-between items-start">
                    <div className="truncate pr-4">
                      <h2 className="text-xl font-medium truncate hover:underline">{cls.name}</h2>
                      <p className="text-sm opacity-90 mt-1">{cls.section}</p>
                    </div>
                    {/* Thêm e.stopPropagation() để bấm nút 3 chấm không bị chuyển trang */}
                    <button 
                      className="p-1 hover:bg-black/10 rounded-full relative z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <p className="text-xs mt-3 opacity-80">{cls.teacher}</p>
                </div>

                {/* Avatar giáo viên đè lên viền */}
                <div className="absolute top-20 right-4 w-16 h-16 bg-white rounded-full border-4 border-white flex items-center justify-center overflow-hidden shadow-sm">
                  <User className="w-8 h-8 text-gray-400" />
                </div>

                {/* Body thẻ lớp học */}
                <div 
                  className="h-32 p-4 cursor-pointer"
                  onClick={() => navigate('/course/stream')}
                >
                  <p className="text-sm text-gray-500 font-medium mb-1">Sắp đến hạn</p>
                  <p className="text-sm text-gray-600 truncate hover:text-blue-600">Bài tập: SRS Document V1.0</p>
                </div>

                {/* Footer thẻ lớp học */}
                <div className="border-t border-gray-100 p-3 flex justify-end gap-3 text-gray-500">
                  <button className="p-2 hover:bg-gray-100 rounded-full tooltip" title="Mở sổ điểm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full tooltip" title="Mở thư mục trên Google Drive">
                    <Folder className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

// Component phụ cho các nút ở Sidebar
const SidebarItem = ({ icon, label, active }) => (
  <button className={`w-full flex items-center gap-4 px-4 py-3 rounded-r-full transition-colors ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
    <span className={`${active ? 'text-blue-600' : 'text-gray-500'}`}>{icon}</span>
    <span className="font-medium text-sm truncate">{label}</span>
  </button>
);

export default Dashboard;