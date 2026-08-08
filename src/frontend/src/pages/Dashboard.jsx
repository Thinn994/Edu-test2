import React from 'react';
import { User, Folder, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockClasses.map((cls) => (
        <div key={cls.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 group relative">
          
          {/* Header thẻ lớp học */}
          <div 
            className={`${cls.color} h-28 p-4 text-white relative cursor-pointer`}
            onClick={() => navigate('/course/stream/1')}
          >
            <div className="flex justify-between items-start">
              <div className="truncate pr-4">
                <h2 className="text-xl font-medium truncate hover:underline">{cls.name}</h2>
                <p className="text-sm opacity-90 mt-1">{cls.section}</p>
              </div>
              <button 
                className="p-1 hover:bg-black/10 rounded-full relative z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-xs mt-3 opacity-80">{cls.teacher}</p>
          </div>

          {/* Avatar giáo viên */}
          <div className="absolute top-20 right-4 w-16 h-16 bg-white rounded-full border-4 border-white flex items-center justify-center overflow-hidden shadow-sm">
            <User className="w-8 h-8 text-gray-400" />
          </div>

          {/* Body thẻ lớp học */}
          <div 
            className="h-32 p-4 cursor-pointer"
            onClick={() => navigate('/course/stream/1')}
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
  );
};

export default Dashboard;