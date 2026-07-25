import React from 'react';
import { MessageSquare, FileText, Clock, MoreVertical, Link as LinkIcon, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Dùng để quay lại trang trước

const CourseStream = () => {
  const navigate = useNavigate();

  // Dữ liệu mẫu dễ dàng thay đổi sau này khi nối API
  const courseInfo = {
    name: "CS300 - Software Engineering",
    section: "Group 07",
    code: "SE2026_G7",
    coverColor: "bg-blue-600"
  };

  const upcomingTasks = [
    { id: 1, title: "SRS Document V1.0", due: "Chủ nhật, 23:59" },
    { id: 2, title: "Thiết kế API (Swagger)", due: "Thứ 4 tuần sau" }
  ];

  const streamPosts = [
    {
      id: 1,
      type: 'assignment',
      author: "Nguyen Xuan Hoang",
      time: "Hôm qua",
      content: "Đã đăng một bài tập mới: Project Assignment 2 (PA2)",
      icon: <FileText className="w-6 h-6 text-white" />
    },
    {
      id: 2,
      type: 'announcement',
      author: "Nguyen Xuan Hoang",
      time: "2 ngày trước",
      content: "Chào các bạn, tuần này chúng ta sẽ học về quy trình Scrum và cách ứng dụng vào đồ án nhóm. Các bạn nhớ đọc trước slide chương 3 nhé.",
      icon: <MessageSquare className="w-6 h-6 text-gray-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col items-center">
      
      {/* Nút Quay lại Dashboard tạm thời (Sau này sẽ đưa vào Navbar chung) */}
      <div className="w-full max-w-5xl px-4 py-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className="text-blue-600 hover:underline font-medium text-sm flex items-center gap-1"
        >
          &larr; Quay lại Bảng điều khiển
        </button>
      </div>

      <div className="w-full max-w-5xl px-4 flex flex-col gap-6">
        
        {/* 1. HEADER BANNERS */}
        <div className={`${courseInfo.coverColor} rounded-2xl h-60 p-6 flex flex-col justify-end text-white shadow-md relative overflow-hidden`}>
          {/* Trang trí background */}
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="400" height="400" fill="currentColor" viewBox="0 0 100 100"><path d="M50 0L100 50L50 100L0 50Z"></path></svg>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl font-semibold mb-2">{courseInfo.name}</h1>
            <p className="text-xl opacity-90">{courseInfo.section}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          
          {/* 2. CỘT TRÁI (Sắp đến hạn) */}
          <div className="md:w-1/4 flex flex-col gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-800">Sắp đến hạn</h3>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <ul className="flex flex-col gap-3">
                {upcomingTasks.map(task => (
                  <li key={task.id} className="text-sm">
                    <p className="text-gray-800 font-medium hover:text-blue-600 cursor-pointer truncate">{task.title}</p>
                    <p className="text-gray-500">{task.due}</p>
                  </li>
                ))}
              </ul>
              <button className="mt-4 text-sm font-medium text-blue-600 hover:bg-blue-50 w-full text-right p-2 rounded-md transition-colors">
                Xem tất cả
              </button>
            </div>
          </div>

          {/* 3. CỘT PHẢI (Bảng tin / Stream) */}
          <div className="md:w-3/4 flex flex-col gap-4">
            
            {/* Box Đăng thông báo */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium shrink-0">
                NH
              </div>
              <div className="text-gray-500 text-sm flex-1">
                Thông báo nội dung nào đó cho lớp học của bạn...
              </div>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <Send className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Danh sách các bài đăng */}
            {streamPosts.map(post => (
              <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm group">
                <div className="flex items-start gap-4">
                  {post.type === 'assignment' ? (
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      {post.icon}
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                       <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">NH</div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 cursor-pointer hover:underline text-sm sm:text-base">
                          {post.content}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">{post.author} • {post.time}</p>
                      </div>
                      <button className="p-1 text-gray-400 hover:bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStream;