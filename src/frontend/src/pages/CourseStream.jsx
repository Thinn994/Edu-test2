import React from 'react';
import { FileText, MoreVertical, Send, User, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CourseStream() {
  const navigate = useNavigate();

  // 1. DÙNG useParams ĐỂ LẤY ID CỦA LỚP HỌC TỪ URL (Ví dụ: /course/stream/2 -> ID = 2)
  const { courseId } = useParams();

  // 2. KHO DỮ LIỆU CỦA 8 MÔN HỌC (Copy từ bên Dashboard qua)
  const allCourses = [
    { id: 1, name: "CS300 - Software Engineering", section: "Group 07", teacher: "TS. Lê Trung Hiếu", color: "bg-blue-600", assignment: "Nộp tài liệu đặc tả yêu cầu (SRS) V1.0", dueDate: "Tối nay, 23:59" },
    { id: 2, name: "CS13002 - Artificial Intelligence", section: "AI Foundation", teacher: "PGS. TS. Nguyễn Văn B", color: "bg-emerald-600", assignment: "Báo cáo đồ án: Nhận diện khuôn mặt bằng CNN", dueDate: "T5, 15 thg 8" },
    { id: 3, name: "UI/UX Design Principles", section: "Frontend Mastery", teacher: "ThS. Trần Phương Thảo", color: "bg-purple-600", assignment: "Nộp bản Prototype Figma (Mid-term)", dueDate: "CN, 18 thg 8" },
    { id: 4, name: "Database Systems", section: "PostgreSQL & MongoDB", teacher: "TS. Phạm Đăng Khoa", color: "bg-orange-600", assignment: "Bài tập thực hành SQL & Tối ưu Query", dueDate: "Ngày mai, 12:00" },
    { id: 5, name: "Cloud Computing", section: "AWS & Azure", teacher: "ThS. Hoàng Minh Trí", color: "bg-pink-600", assignment: "Lab 03: Deploy Web App lên EC2", dueDate: "T6, 23 thg 8" },
    { id: 6, name: "Cybersecurity Basics", section: "Network Security", teacher: "TS. Đinh Tấn Hưng", color: "bg-red-600", assignment: "Thực hành Penetration Testing cơ bản", dueDate: "T4, 28 thg 8" },
    { id: 7, name: "Mobile App Development", section: "React Native & Flutter", teacher: "ThS. Vũ Ngọc Bảo", color: "bg-teal-600", assignment: "Source code App Quản lý chi tiêu", dueDate: "30 thg 8" },
    { id: 8, name: "Data Science", section: "Python & R", teacher: "TS. Ngô Hoài Anh", color: "bg-indigo-600", assignment: "Đồ án cuối kỳ: Phân tích Dataset Kaggle", dueDate: "5 thg 9" },
  ];

  // 3. TÌM KIẾM MÔN HỌC ĐANG ĐƯỢC CHỌN (So sánh ID trên URL với ID trong kho dữ liệu)
  // Dùng parseInt vì ID trên URL luôn là chuỗi (string)
  const currentCourse = allCourses.find(c => c.id === parseInt(courseId));

  // 4. BẮT LỖI: Lỡ người dùng gõ link bậy bạ không có ID
  if (!currentCourse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ối, không tìm thấy lớp học này!</h2>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Quay lại Bảng điều khiển
        </button>
      </div>
    );
  }

  // 5. TẠO DATA BÀI VIẾT (Tự động lấy tên Bài tập và Tên giảng viên của lớp đó ghép vào)
  const streamPosts = [
    {
      id: 1,
      type: 'assignment',
      author: currentCourse.teacher,
      time: "Hôm qua",
      title: `Đã đăng một bài tập mới: ${currentCourse.assignment}`,
      content: "Yêu cầu:\n- Các bạn nộp bài đúng định dạng file quy định.\n- Đặt tên file theo cú pháp: [Tên_Nhóm]_TenBaiTap.pdf.\n- Hạn chót đã được ghim ở cột bên trái nhé!",
      icon: <FileText className="w-5 h-5 text-white" />
    },
    {
      id: 2,
      type: 'announcement',
      author: currentCourse.teacher,
      time: "2 ngày trước",
      title: "Thông báo lớp học",
      content: `Chào các bạn sinh viên, sắp tới lớp ${currentCourse.name.split(' - ')[0]} của chúng ta sẽ học qua Google Meet. Các bạn nhớ chuẩn bị bài tập đầy đủ để tuần sau review nhé!`,
      icon: <User className="w-6 h-6 text-gray-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col items-center">

      {/* TOP NAVBAR */}
      <nav className="w-full bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors tooltip">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <span className="text-xl font-medium text-gray-800 hover:underline cursor-pointer">
            {currentCourse.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-1 border-2 border-transparent hover:border-gray-200 rounded-full">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">NH</div>
          </button>
        </div>
      </nav>

      <div className="w-full max-w-5xl px-4 flex flex-col gap-6 mt-6">

        {/* HEADER BANNERS (Tự động đổi màu theo lớp) */}
        <div className={`${currentCourse.color} rounded-xl h-48 md:h-64 p-6 flex flex-col justify-end text-white shadow-sm relative overflow-hidden`}>
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="400" height="400" fill="currentColor" viewBox="0 0 100 100"><path d="M50 0L100 50L50 100L0 50Z"></path></svg>
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-1 tracking-tight">{currentCourse.name}</h1>
            <p className="text-lg md:text-xl opacity-90 font-medium">{currentCourse.section}</p>
            <p className="text-sm md:text-base opacity-80 mt-1">{currentCourse.teacher}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 pb-10">

          {/* CỘT TRÁI (Sắp đến hạn) */}
          <div className="w-full md:w-56 lg:w-64 shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-gray-800 mb-4">Sắp đến hạn</h3>
              <ul className="flex flex-col gap-4">
                <li>
                  <p className="text-sm font-semibold text-orange-600 mb-1">{currentCourse.dueDate}</p>
                  <p className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer hover:underline line-clamp-2 leading-relaxed">
                    {currentCourse.assignment}
                  </p>
                </li>
              </ul>
              <button className="mt-4 text-sm font-medium text-blue-600 hover:bg-blue-50 w-full text-right p-2 rounded transition-colors">
                Xem tất cả
              </button>
            </div>
          </div>

          {/* CỘT PHẢI (Bảng tin / Stream) */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6">

            {/* Box Đăng thông báo */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center gap-4 cursor-text hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium shrink-0">NH</div>
              <div className="text-gray-500 text-sm md:text-base flex-1 group-hover:text-gray-700 transition-colors">
                Thông báo nội dung nào đó cho lớp học của bạn...
              </div>
            </div>

            {/* Danh sách bài đăng (Đã gắn link chuyển trang nộp bài) */}
            {streamPosts.map(post => (
              <div
                key={post.id}
                onClick={() => {
                  // Chỉ khi bài đăng là bài tập thì mới cho click qua trang Nộp bài
                  if (post.type === 'assignment') {
                    navigate(`/course/stream/${courseId}/assignment`);
                  }
                }}
                className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition-shadow ${post.type === 'assignment' ? 'cursor-pointer hover:shadow-md hover:border-blue-300' : 'hover:shadow-md'
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {post.type === 'assignment' ? (
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                        {post.icon}
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                        {post.icon}
                      </div>
                    )}
                    <div>
                      <h2 className={`font-medium text-sm md:text-base ${post.type === 'assignment' ? 'text-blue-700 hover:underline' : 'text-gray-800'}`}>
                        {post.title}
                      </h2>
                      <p className="text-xs text-gray-500">{post.author} • {post.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => e.stopPropagation()} // Thêm cái này để bấm nút 3 chấm không bị chuyển trang
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors -mt-2"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed whitespace-pre-line pl-13 md:pl-14">
                  {post.content}
                </div>

                <div
                  className="border-t border-gray-100 pt-3 flex items-center gap-3"
                  onClick={(e) => e.stopPropagation()} // Ngăn click nhầm phần bình luận cũng bị chuyển trang
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium shrink-0 text-xs">NH</div>
                  <div className="flex-1 border border-gray-300 rounded-full px-4 py-1.5 flex items-center justify-between hover:bg-gray-50 cursor-text">
                    <span className="text-sm text-gray-500">Thêm nhận xét trong lớp học...</span>
                    <Send className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}