import React, { useState, useEffect } from 'react';
import { 
  User, Mail, BookOpen, GraduationCap, Award, Clock, Save, Camera, 
  Settings, Bell, Lock, LogOut, ChevronRight, CheckCircle, XCircle,
  BarChart, Calendar, Briefcase, Phone, MapPin, Edit3
} from 'lucide-react';

const MOCK_TEACHER = {
  full_name: 'Dr. John Doe',
  email: 'john.doe@university.edu',
  role: 'teacher',
  bio: 'Associate Professor of Computer Science with 10+ years of experience in Software Engineering and Distributed Systems.',
  phone: '+1 (555) 123-4567',
  address: 'Room 402, Tech Building',
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  cover_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  created_at: 'Aug 2023',
};

const MOCK_STUDENT = {
  full_name: 'Alice Smith',
  email: 'alice.smith@student.edu',
  role: 'student',
  bio: 'Junior CS Major. Passionate about AI and Web Development. Seeking summer internship opportunities.',
  phone: '+1 (555) 987-6543',
  address: 'Dormitory B, Room 112',
  avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  cover_url: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  created_at: 'Sep 2024',
};

const MOCK_STATS = {
  teacher: { active_classes: 4, total_students: 156, avg_class_score: '88%', assignments_graded: 420 },
  student: { gpa: '3.8', completed_courses: 12, missing_assignments: 0, current_semester: 'Fall 2026' }
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('overview');

  // For Demo purposes: toggle roles
  const [demoRole, setDemoRole] = useState('student');

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const selectedUser = demoRole === 'teacher' ? MOCK_TEACHER : MOCK_STUDENT;
      setUser(selectedUser);
      setStats(MOCK_STATS[demoRole]);
      setFormData(selectedUser);
      setIsLoading(false);
    }, 600);
  }, [demoRole]);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(formData);
      setIsEditing(false);
      setIsLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-[#00a8ff]"></div>
      </div>
    );
  }

  const role = user?.role || 'student';
  const roleStats = stats || {};

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 px-4 sm:px-6 lg:px-8 font-sans animate-in fade-in duration-500">
      
      {/* DEV TOOLS (Role Toggle) */}
      <div className="flex justify-end gap-2 mb-4">
        <span className="text-sm text-gray-500 self-center mr-2">Demo Role:</span>
        <button 
          onClick={() => setDemoRole('student')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${demoRole === 'student' ? 'bg-[#00a8ff] text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
        >
          Student
        </button>
        <button 
          onClick={() => setDemoRole('teacher')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${demoRole === 'teacher' ? 'bg-[#9c27b0] text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
        >
          Teacher
        </button>
      </div>

      {/* Premium Profile Header - Glassmorphism */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-white/20 bg-white">
        {/* Cover Photo */}
        <div className="h-48 md:h-64 relative group">
          <img src={user?.cover_url} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
          <button className="absolute top-4 right-4 p-2.5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100 shadow-lg">
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="px-6 sm:px-10 pb-8 relative bg-white/80 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 md:-mt-20 mb-6">
            <div className="relative inline-block z-10 group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-100">
                <img src={user?.avatar_url} alt="Avatar" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <button className="absolute bottom-2 right-2 p-3 bg-white/90 backdrop-blur-sm rounded-full border border-gray-100 shadow-lg hover:bg-[#00a8ff] hover:text-white transition-all text-gray-600 group-hover:scale-110">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              {isEditing ? (
                <>
                  <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all shadow-sm">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="px-5 py-2.5 bg-[#00a8ff] text-white rounded-xl font-semibold hover:bg-[#0097e6] hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Profile
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/30 transition-all flex items-center gap-2">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>
          
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{user?.full_name}</h1>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase shadow-sm tracking-wider flex items-center gap-1.5 ${role === 'teacher' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'}`}>
                {role === 'teacher' ? <Briefcase className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                {role}
              </span>
            </div>
            <p className="text-gray-500 flex items-center gap-2 font-medium">
              <Mail className="w-4 h-4 text-gray-400" /> {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-x-auto w-max">
        {['overview', 'settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm capitalize transition-all ${activeTab === tab ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* STATS SECTION */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-bottom-4 duration-500">
              {role === 'teacher' ? (
                <>
                  <StatCard label="Active Classes" value={roleStats?.active_classes} icon={<BookOpen />} color="from-purple-500 to-indigo-500" />
                  <StatCard label="Total Students" value={roleStats?.total_students} icon={<User />} color="from-blue-500 to-cyan-500" />
                  <StatCard label="Avg Score" value={roleStats?.avg_class_score} icon={<BarChart />} color="from-emerald-400 to-green-500" />
                  <StatCard label="Graded" value={roleStats?.assignments_graded} icon={<CheckCircle />} color="from-orange-400 to-amber-500" />
                </>
              ) : (
                <>
                  <StatCard label="Current GPA" value={roleStats?.gpa} icon={<Award />} color="from-blue-500 to-indigo-500" />
                  <StatCard label="Courses" value={roleStats?.completed_courses} icon={<BookOpen />} color="from-emerald-400 to-green-500" />
                  <StatCard label="Missing" value={roleStats?.missing_assignments} icon={<XCircle />} color={roleStats?.missing_assignments > 0 ? "from-red-500 to-rose-600" : "from-gray-400 to-gray-500"} />
                  <StatCard label="Semester" value={roleStats?.current_semester} icon={<Calendar />} color="from-purple-500 to-pink-500" />
                </>
              )}
            </div>
          )}

          {/* PERSONAL INFO FORM / DISPLAY */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm shadow-gray-200/50">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
              <span className="p-2 bg-blue-50 text-[#00a8ff] rounded-xl"><User className="w-5 h-5" /></span>
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InputField label="Full Name" name="full_name" value={formData.full_name} isEditing={isEditing} onChange={handleInputChange} icon={<User />} />
              <InputField label="Email Address" name="email" value={formData.email} isEditing={isEditing} onChange={handleInputChange} type="email" icon={<Mail />} />
              <InputField label="Phone Number" name="phone" value={formData.phone} isEditing={isEditing} onChange={handleInputChange} icon={<Phone />} />
              <InputField label="Location/Address" name="address" value={formData.address} isEditing={isEditing} onChange={handleInputChange} icon={<MapPin />} />
              
              <div className="md:col-span-2">
                <label className="text-sm font-bold text-gray-700 mb-2 block">Bio / About Me</label>
                {isEditing ? (
                  <textarea 
                    name="bio"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-[#00a8ff] focus:ring-4 focus:ring-[#00a8ff]/10 outline-none transition-all resize-none h-32 text-gray-700"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700 min-h-[80px] leading-relaxed">
                    {user?.bio || <span className="text-gray-400 italic">No bio provided yet.</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm shadow-gray-200/50">
            <h3 className="text-lg font-extrabold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <QuickActionButton icon={<Lock />} label="Change Password" color="text-indigo-600" bg="bg-indigo-50" hover="hover:bg-indigo-100" />
              <QuickActionButton icon={<Bell />} label="Notification Preferences" color="text-blue-600" bg="bg-blue-50" hover="hover:bg-blue-100" />
              <QuickActionButton icon={<Settings />} label="Account Settings" color="text-gray-600" bg="bg-gray-50" hover="hover:bg-gray-100" />
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button className="w-full flex items-center justify-between p-4 text-red-600 bg-red-50 hover:bg-red-100 rounded-2xl font-bold transition-colors">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </div>
              </button>
            </div>
          </div>
          
          {/* Join Info */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl shadow-lg text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
              <Award className="w-48 h-48" />
            </div>
            <h3 className="font-bold text-gray-300 mb-1">Member Since</h3>
            <p className="text-2xl font-extrabold">{user?.created_at}</p>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              You've been a valued member of the EduSubmit platform. Keep up the great work!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

// Sub-components

const StatCard = ({ label, value, icon, color }) => (
  <div className="p-5 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${color} opacity-10 rounded-bl-full`}></div>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${color} text-white shadow-lg`}>
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
    </div>
    <div>
      <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
      <p className="text-sm text-gray-500 font-medium mt-1">{label}</p>
    </div>
  </div>
);

const InputField = ({ label, name, value, isEditing, onChange, type = "text", icon }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-gray-700 block">{label}</label>
    {isEditing ? (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          {React.cloneElement(icon, { className: 'w-4 h-4' })}
        </div>
        <input 
          type={type} 
          name={name}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#00a8ff] focus:ring-4 focus:ring-[#00a8ff]/10 outline-none transition-all text-gray-700 font-medium"
          value={value || ''}
          onChange={onChange}
        />
      </div>
    ) : (
      <div className="flex items-center gap-3 p-3 bg-gray-50 border border-transparent rounded-xl text-gray-800 font-medium h-[50px]">
        <div className="text-gray-400">
          {React.cloneElement(icon, { className: 'w-4 h-4' })}
        </div>
        {value || <span className="text-gray-400 italic">Not set</span>}
      </div>
    )}
  </div>
);

const QuickActionButton = ({ icon, label, color, bg, hover }) => (
  <button className={`w-full flex items-center justify-between p-3.5 ${bg} ${hover} rounded-2xl transition-all group`}>
    <div className={`flex items-center gap-3 font-semibold ${color}`}>
      <div className="p-1.5 bg-white rounded-lg shadow-sm">
        {React.cloneElement(icon, { className: 'w-4 h-4' })}
      </div>
      {label}
    </div>
    <ChevronRight className={`w-5 h-5 ${color} opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
  </button>
);

export default ProfilePage;
