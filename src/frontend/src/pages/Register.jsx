import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Mail, Lock, User as UserIcon, BookOpen, ArrowLeft } from 'lucide-react';

// ==========================================
// 1. IMPORT CÁC HÀM FIREBASE THẬT VÀO ĐÂY
// ==========================================
// LƯU Ý: Bro phải điều chỉnh lại đường dẫn '../firebase' cho đúng với chỗ file cấu hình firebase của dự án nhé!
import { auth } from '../firebase'; // Thay bằng đường dẫn file config của bro
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register({ setUserRole }) {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoginView, setIsLoginView] = useState(false);

  // ==========================================
  // 2. STATE ĐỂ LƯU DỮ LIỆU NHẬP VÀO & HIỂN THỊ LỖI
  // ==========================================
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); // State để quăng lỗi (VD: sai pass, email tồn tại)
  const [isLoading, setIsLoading] = useState(false); // Làm hiệu ứng loading cho xịn

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setStep(2);
    setErrorMsg(''); // Xóa lỗi cũ khi đổi role
  };

  const handleBackToRoleSelection = () => {
    setStep(1);
    setSelectedRole(null);
    setErrorMsg('');
  };

  // ==========================================
  // 3. HÀM XỬ LÝ FORM EMAIL / MẬT KHẨU (THẬT 100%)
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (isLoginView) {
        // GỌI HÀM ĐĂNG NHẬP FIREBASE
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // GỌI HÀM TẠO TÀI KHOẢN FIREBASE
        await createUserWithEmailAndPassword(auth, email, password);

        // MẸO THỰC TẾ: Ở bước đăng ký này, thường người ta sẽ viết thêm 1 đoạn code lưu Name và Role (selectedRole) vào Database (như Firestore) nữa.
      }

      // Thành công thì set Role cho UI và bay vào Dashboard
      setUserRole(selectedRole);
      navigate('/dashboard');

    } catch (error) {
      console.error("Lỗi Auth:", error);
      // Dịch vài lỗi cơ bản của Firebase ra tiếng Việt cho thân thiện
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setErrorMsg('Sai email hoặc mật khẩu!');
      } else if (error.code === 'auth/email-already-in-use') {
        setErrorMsg('Email này đã được sử dụng!');
      } else if (error.code === 'auth/weak-password') {
        setErrorMsg('Mật khẩu quá yếu (cần ít nhất 6 ký tự).');
      } else {
        setErrorMsg('Có lỗi xảy ra: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // 4. HÀM XỬ LÝ ĐĂNG NHẬP BẰNG GOOGLE (THẬT 100%)
  // ==========================================
  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      // GỌI HÀM BẬT POPUP GOOGLE
      await signInWithPopup(auth, provider);

      setUserRole(selectedRole);
      navigate('/dashboard');
    } catch (error) {
      console.error("Lỗi Google Auth:", error);
      setErrorMsg('Lỗi đăng nhập Google: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl flex overflow-hidden min-h-[550px]">

        {/* Cột trái */}
        <div className="hidden md:flex md:w-5/12 bg-blue-600 flex-col justify-between p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={handleBackToRoleSelection}>
              <GraduationCap className="w-10 h-10" />
              <span className="text-2xl font-bold">EduSubmit</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Quản lý học tập<br />Dễ dàng hơn bao giờ hết
            </h2>
            <p className="text-blue-100 text-lg">
              Tham gia cùng hàng ngàn giảng viên và sinh viên trên nền tảng của chúng tôi.
            </p>
          </div>
          <BookOpen className="absolute -bottom-10 -left-10 w-64 h-64 text-blue-500 opacity-50" />
        </div>

        {/* Cột phải */}
        <div className="w-full md:w-7/12 p-8 sm:px-12 flex flex-col justify-center">

          {step === 1 && (
            <div className="animate-fade-in">
              {/* ... UI BƯỚC 1 GIỮ NGUYÊN ... */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Bạn là ai?</h2>
                <p className="text-gray-500 text-lg">Vui lòng chọn vai trò để bắt đầu</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                  onClick={() => handleSelectRole('student')}
                  className="group flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-10 h-10" />
                  </div>
                  <span className="text-xl font-bold text-gray-800 group-hover:text-blue-700">Học sinh</span>
                </button>

                <button
                  onClick={() => handleSelectRole('teacher')}
                  className="group flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10" />
                  </div>
                  <span className="text-xl font-bold text-gray-800 group-hover:text-orange-700">Giáo viên</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in relative h-full flex flex-col justify-center py-4">

              <button onClick={handleBackToRoleSelection} className="absolute -top-2 sm:-top-4 left-0 flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Đổi vai trò</span>
              </button>

              <div className="text-center mb-6 mt-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  {isLoginView ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới'}
                </h2>
                <p className="text-gray-500 flex items-center justify-center gap-2">
                  Đăng nhập dưới quyền:
                  <span className={`font-bold ${selectedRole === 'teacher' ? 'text-orange-600' : 'text-blue-600'}`}>
                    {selectedRole === 'teacher' ? 'Giáo viên' : 'Học sinh'}
                  </span>
                </p>
              </div>

              {/* KHUNG HIỂN THỊ LỖI MÀU ĐỎ THẦN THÁNH */}
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm text-center font-medium">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {!isLoginView && (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    {/* BẮT SỰ KIỆN LƯU DỮ LIỆU */}
                    <input type="text" placeholder="Họ và tên" required
                      value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    />
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === 'teacher' ? 'Email (VD: teacher@gmail.com)' : 'Email (VD: student@gmail.com)'}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="password" placeholder="Mật khẩu" required
                      value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  {isLoginView && (
                    <div className="flex justify-end mt-2">
                      <button type="button" className="text-sm font-medium text-blue-600 hover:underline">
                        Quên mật khẩu?
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 mt-2 rounded-lg font-bold text-white shadow-md transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    } ${selectedRole === 'teacher' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                  {isLoading ? 'Đang xử lý...' : (isLoginView ? 'Đăng nhập' : 'Tạo tài khoản')}
                </button>
              </form>

              <div className="mt-6 flex items-center justify-between">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <span className="text-xs text-center text-gray-500 uppercase font-medium">Hoặc tiếp tục với</span>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>

              {/* GẮN HÀM GOOGLE VÀO ĐÂY */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 mt-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-70"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>

              <div className="mt-6 text-center text-sm text-gray-600">
                {isLoginView ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
                <button
                  onClick={() => setIsLoginView(!isLoginView)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {isLoginView ? 'Đăng ký ngay' : 'Đăng nhập'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}