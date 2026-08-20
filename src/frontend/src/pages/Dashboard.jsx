import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Plus, Bell, User, Book, Calendar, Folder, MoreVertical, GraduationCap, Clock, ChevronLeft, ChevronRight, Shield, Moon, LogOut, X } from 'lucide-react';

const Dashboard = ({ userRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('classes');
  const [currentDate, setCurrentDate] = useState(new Date());

  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const navigate = useNavigate();

  const courses = [
    { id: 1, name: "CS300 - Software Engineering", section: "Group 07", teacher: "TS. Lê Trung Hiếu", color: "bg-blue-600", assignment: "Nộp tài liệu đặc tả yêu cầu (SRS) V1.0", dueDate: "Tối nay, 23:59" },
    { id: 2, name: "CS13002 - Artificial Intelligence", section: "AI Foundation", teacher: "PGS. TS. Nguyễn Văn B", color: "bg-emerald-600", assignment: "Báo cáo đồ án: Nhận diện khuôn mặt bằng CNN", dueDate: "T5, 15 thg 8" },
    { id: 3, name: "UI/UX Design Principles", section: "Frontend Mastery", teacher: "ThS. Trần Phương Thảo", color: "bg-purple-600", assignment: "Nộp bản Prototype Figma (Mid-term)", dueDate: "CN, 18 thg 8" },
    { id: 4, name: "Database Systems", section: "PostgreSQL & MongoDB", teacher: "TS. Phạm Đăng Khoa", color: "bg-orange-600", assignment: "Bài tập thực hành SQL & Tối ưu Query", dueDate: "Ngày mai, 12:00" },
    { id: 5, name: "Cloud Computing", section: "AWS & Azure", teacher: "ThS. Hoàng Minh Trí", color: "bg-pink-600", assignment: "Lab 03: Deploy Web App lên EC2", dueDate: "T6, 23 thg 8" },
    { id: 6, name: "Cybersecurity Basics", section: "Network Security", teacher: "TS. Đinh Tấn Hưng", color: "bg-red-600", assignment: "Thực hành Penetration Testing cơ bản", dueDate: "T4, 28 thg 8" },
    { id: 7, name: "Mobile App Development", section: "React Native & Flutter", teacher: "ThS. Vũ Ngọc Bảo", color: "bg-teal-600", assignment: "Source code App Quản lý chi tiêu", dueDate: "30 thg 8" },
    { id: 8, name: "Data Science", section: "Python & R", teacher: "TS. Ngô Hoài Anh", color: "bg-indigo-600", assignment: "Đồ án cuối kỳ: Phân tích Dataset Kaggle", dueDate: "5 thg 9" },
  ];

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const bgMain = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const bgCard = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textMain = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const textSub = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const borderCol = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverBg = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';

  return (
    <div className={`min-h-screen font-sans flex ${bgMain} ${textMain} transition-colors duration-300`}>

      {/* SIDEBAR TRÁI */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 -ml-64'} transition-all duration-300 ease-in-out ${bgCard} border-r ${borderCol} h-screen sticky top-0 overflow-y-auto shrink-0 flex flex-col`}>
        <div className={`p-4 border-b ${borderCol} flex items-center gap-3 cursor-pointer`} onClick={() => navigate('/dashboard')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">EduSubmit</span>
        </div>

        <div className="flex-1 py-4">
          <div className="px-3 mb-2">
            <button onClick={() => setActiveView('classes')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${activeView === 'classes' ? 'bg-blue-500 text-white' : `${textMain} ${hoverBg}`}`}>
              <Book className="w-5 h-5" />
              <span className="font-medium">Lớp học</span>
            </button>
            <button onClick={() => setActiveView('calendar')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors mt-1 ${activeView === 'calendar' ? 'bg-blue-500 text-white' : `${textMain} ${hoverBg}`}`}>
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Lịch</span>
            </button>
          </div>

          <div className="mt-6">
            <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${textSub}`}>
              {userRole === 'teacher' ? 'Đang giảng dạy' : 'Đã đăng ký'}
            </div>

            <div className="mt-2 flex flex-col gap-1 px-3">
              {/* ĐÃ PHỤC HỒI NÚT "VIỆC CẦN LÀM" */}
              <button className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-xl transition-colors group ${hoverBg} ${textMain}`}>
                <div className={`w-8 h-8 rounded-full border ${borderCol} flex items-center justify-center ${textSub} group-hover:text-blue-500 group-hover:border-blue-300 transition-colors`}>
                  <Clock className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm truncate">Việc cần làm</span>
              </button>

              {courses.map(course => (
                <button key={course.id} onClick={() => navigate(`/course/stream/${course.id}`)} className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-xl transition-colors group ${hoverBg} ${textMain}`}>
                  <div className={`w-8 h-8 rounded-full ${course.color} flex items-center justify-center text-white font-medium text-sm group-hover:shadow-md transition-shadow`}>
                    {course.name.charAt(0)}
                  </div>
                  <span className="font-medium text-sm truncate">{course.name.split(' - ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* NỘI DUNG CHÍNH (BÊN PHẢI) */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* NAVBAR TRÊN CÙNG */}
        <nav className={`h-16 ${bgCard} border-b ${borderCol} px-4 flex items-center justify-between shrink-0 transition-colors duration-300`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`p-2 rounded-full transition-colors ${hoverBg} ${textSub}`}>
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setShowAddMenu(!showAddMenu)} className={`p-2 rounded-full transition-colors ${hoverBg} ${textSub}`}>
                <Plus className="w-6 h-6" />
              </button>
              {showAddMenu && (
                <div className={`absolute right-0 mt-2 w-48 ${bgCard} border ${borderCol} rounded-lg shadow-lg py-1 z-50`}>
                  {userRole === 'teacher' ? (
                    <button onClick={() => { alert('Mở form: Tạo lớp học mới'); setShowAddMenu(false); }} className={`w-full text-left px-4 py-2 text-sm font-medium ${textMain} ${hoverBg}`}>Tạo lớp học</button>
                  ) : (
                    <button onClick={() => { alert('Mở form: Nhập mã tham gia lớp học'); setShowAddMenu(false); }} className={`w-full text-left px-4 py-2 text-sm font-medium ${textMain} ${hoverBg}`}>Tham gia lớp học</button>
                  )}
                </div>
              )}
            </div>

            <button className={`p-2 rounded-full transition-colors ${hoverBg} ${textSub}`}>
              <Bell className="w-6 h-6" />
            </button>

            <div className="relative ml-2">
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="p-1 border-2 border-transparent focus:border-blue-300 rounded-full transition-all">
                <div className="w-8 h-8 bg-blue-500 hover:bg-blue-600 transition-colors rounded-full flex items-center justify-center text-white font-medium shadow-sm">
                  NH
                </div>
              </button>

              {showProfileMenu && (
                <div className={`absolute right-0 mt-2 w-64 ${bgCard} border ${borderCol} rounded-xl shadow-xl py-2 z-50 animate-fade-in`}>
                  <div className={`px-4 py-3 border-b ${borderCol}`}>
                    <p className={`text-sm font-bold ${textMain}`}>Nguyễn Hoàng</p>
                    <p className={`text-xs truncate mt-0.5 ${textSub}`}>
                      {userRole === 'teacher' ? 'hoang.nguyen@teacher.edu.vn' : 'hoang.nguyen@student.edu.vn'}
                    </p>
                  </div>

                  <div className="py-2">
                    <button onClick={() => { setShowProfileModal(true); setShowProfileMenu(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${hoverBg} ${textMain}`}>
                      <User className={`w-4 h-4 ${textSub}`} /><span className="font-medium">Thông tin cá nhân</span>
                    </button>

                    <button onClick={() => { setShowSecurityModal(true); setShowProfileMenu(false); }} className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${hoverBg} ${textMain}`}>
                      <Shield className={`w-4 h-4 ${textSub}`} /><span className="font-medium">Bảo mật</span>
                    </button>

                    <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${hoverBg} ${textMain}`}>
                      <div className="flex items-center gap-3">
                        <Moon className={`w-4 h-4 ${textSub}`} /><span className="font-medium">Giao diện (Dark)</span>
                      </div>
                      <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 shadow transition-all duration-300 ${isDarkMode ? 'left-4' : 'left-1'}`}></div>
                      </div>
                    </button>
                  </div>

                  <div className={`border-t ${borderCol} py-2`}>
                    <button onClick={() => navigate('/register')} className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 ${hoverBg}`}>
                      <LogOut className="w-4 h-4" /><span className="font-bold">Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* KHU VỰC HIỂN THỊ */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {activeView === 'classes' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map(course => (
                <div key={course.id} className={`${bgCard} rounded-xl border ${borderCol} overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-[280px]`}>
                  <div className={`${course.color} h-28 p-4 relative cursor-pointer`} onClick={() => navigate(`/course/stream/${course.id}`)}>
                    <div className="flex justify-between items-start text-white">
                      <div className="w-5/6">
                        <h2 className="text-xl font-bold truncate hover:underline">{course.name}</h2>
                        <p className="text-sm opacity-90 mt-1 truncate">{course.section}</p>
                        <p className="text-xs opacity-75 mt-1 truncate">{course.teacher}</p>
                      </div>
                      <button className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white" onClick={(e) => { e.stopPropagation(); alert('Menu tùy chọn'); }}>
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    <div className={`absolute -bottom-8 right-4 w-16 h-16 ${bgCard} rounded-full p-1 shadow-md transition-colors duration-300`}>
                      <div className={`w-full h-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full flex items-center justify-center ${textSub}`}>
                        <User className="w-8 h-8" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-10 flex-1 flex flex-col cursor-pointer" onClick={() => navigate(`/course/stream/${course.id}/assignment`)}>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-semibold text-orange-600">Sắp đến hạn: {course.dueDate}</span>
                    </div>
                    <p className={`text-sm line-clamp-2 hover:text-blue-500 hover:underline ${textMain}`}>
                      <span className="font-medium text-red-500 mr-1">📌</span>
                      {course.assignment}
                    </p>
                  </div>

                  <div className={`px-4 py-3 border-t ${borderCol} flex justify-end gap-2 shrink-0 transition-colors duration-300`}>
                    <button className={`p-2 rounded-full transition-colors tooltip ${hoverBg} ${textSub}`} title="Mở Drive">
                      <Folder className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // ==========================================
            // SIÊU PHẨM: BẢNG LỊCH XỊN XÒ CÓ CHỨA SỰ KIỆN
            // ==========================================
            <div className={`${bgCard} rounded-xl border ${borderCol} p-6 h-full flex flex-col`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${textMain}`}>Lịch học & Deadline</h2>
                <div className="flex items-center gap-4">
                  <span className={`text-lg font-medium ${textSub}`}>
                    Tháng {currentDate.getMonth() + 1}, {currentDate.getFullYear()}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={prevMonth} className={`p-2 rounded-full transition-colors border ${borderCol} ${hoverBg} ${textMain}`}><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={nextMonth} className={`p-2 rounded-full transition-colors border ${borderCol} ${hoverBg} ${textMain}`}><ChevronRight className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>

              <div className={`flex-1 border ${borderCol} rounded-xl overflow-hidden flex flex-col bg-gray-200`}>
                {/* Thanh ngang: Các ngày trong tuần */}
                <div className={`grid grid-cols-7 border-b ${borderCol} ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                    <div key={day} className={`p-3 text-center font-bold text-sm ${textSub}`}>{day}</div>
                  ))}
                </div>

                {/* Lưới ngày tháng (Có hiệu ứng hover và Dark Mode) */}
                <div className={`flex-1 grid grid-cols-7 grid-rows-5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} gap-px`}>
                  {/* Fake các ô trống đầu tháng */}
                  {[...Array(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay())].map((_, i) => (
                    <div key={`empty-${i}`} className={`${bgCard} p-2`}></div>
                  ))}

                  {/* Load các ngày trong tháng (từ mùng 1 đến 30/31) */}
                  {[...Array(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate())].map((_, i) => {
                    const isToday = (i + 1) === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();
                    return (
                      <div key={i} className={`${bgCard} p-2 flex flex-col gap-1 transition-colors ${hoverBg}`}>
                        <span className={`font-medium text-sm ${textMain} ${isToday ? 'bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-sm' : ''}`}>
                          {i + 1}
                        </span>

                        {/* Fake 3 sự kiện để lịch nhìn chuyên nghiệp */}
                        {i + 1 === 15 && <div className="p-1.5 mt-1 bg-emerald-100 text-emerald-700 text-xs rounded-md truncate font-medium shadow-sm">Báo cáo CNN</div>}
                        {i + 1 === 18 && <div className="p-1.5 mt-1 bg-purple-100 text-purple-700 text-xs rounded-md truncate font-medium shadow-sm">Nộp Prototype</div>}
                        {i + 1 === 23 && <div className="p-1.5 mt-1 bg-pink-100 text-pink-700 text-xs rounded-md truncate font-medium shadow-sm">Lab AWS EC2</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* POPUP THÔNG TIN CÁ NHÂN */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className={`${bgCard} rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border ${borderCol}`}>
            <div className={`px-6 py-4 border-b ${borderCol} flex justify-between items-center`}>
              <h3 className={`text-lg font-bold ${textMain}`}>Thông tin cá nhân</h3>
              <button onClick={() => setShowProfileModal(false)} className={`p-1 rounded-full ${hoverBg} ${textSub}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">NH</div>
              <h2 className={`text-2xl font-bold ${textMain}`}>Nguyễn Hoàng</h2>
              <p className={`text-sm ${textSub} mb-6`}>{userRole === 'teacher' ? 'Giảng viên' : 'Sinh viên Khoa CNTT'}</p>
              <div className={`w-full bg-opacity-50 rounded-xl p-4 space-y-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex justify-between border-b border-gray-500/20 pb-2">
                  <span className={textSub}>Email</span>
                  <span className={`font-medium ${textMain}`}>{userRole === 'teacher' ? 'hoang.nguyen@teacher.edu.vn' : 'hoang.nguyen@student.edu.vn'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-500/20 pb-2">
                  <span className={textSub}>Mã số</span>
                  <span className={`font-medium ${textMain}`}>{userRole === 'teacher' ? 'GV-2026' : 'SV-20260407'}</span>
                </div>
                <div className="flex justify-between">
                  <span className={textSub}>Trạng thái</span>
                  <span className="font-medium text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Đang hoạt động
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POPUP BẢO MẬT */}
      {showSecurityModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className={`${bgCard} rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border ${borderCol}`}>
            <div className={`px-6 py-4 border-b ${borderCol} flex justify-between items-center`}>
              <h3 className={`text-lg font-bold ${textMain}`}>Bảo mật tài khoản</h3>
              <button onClick={() => setShowSecurityModal(false)} className={`p-1 rounded-full ${hoverBg} ${textSub}`}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <h4 className={`font-semibold mb-3 ${textMain}`}>Đổi mật khẩu</h4>
                <div className="space-y-3">
                  <input type="password" placeholder="Mật khẩu hiện tại" className={`w-full px-4 py-2 rounded-lg border ${borderCol} ${bgMain} ${textMain} focus:outline-none focus:border-blue-500`} />
                  <input type="password" placeholder="Mật khẩu mới" className={`w-full px-4 py-2 rounded-lg border ${borderCol} ${bgMain} ${textMain} focus:outline-none focus:border-blue-500`} />
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">Cập nhật mật khẩu</button>
                </div>
              </div>
              <hr className={borderCol} />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-semibold ${textMain}`}>Xác thực 2 bước (2FA)</h4>
                  <p className={`text-xs mt-1 ${textSub}`}>Tăng cường bảo mật bằng mã gửi về điện thoại</p>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-7 shadow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;