import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, BookOpen, ShieldCheck, ArrowLeft, LogIn } from 'lucide-react';
import heroImg from '../assets/hero.png';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
export default function Register() {
  const navigate = useNavigate();
  // Quản lý các trạng thái: 'login' | 'register' | 'forgot' | 'otp' | 'reset'
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login' || mode === 'register') {
      navigate('/dashboard');
    } else if (mode === 'forgot') {
      // Chuyển sang bước nhập OTP 6 số gửi qua email
      setMode('otp');
    } else if (mode === 'otp') {
      // Chuyển sang bước nhập mật khẩu mới
      setMode('reset');
    } else if (mode === 'reset') {
      alert('Password updated successfully!');
      setMode('login');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      alert(`Đăng nhập thành công! Xin chào ${user.displayName}`);
      navigate('/dashboard');
    } catch (error) {
      console.error("Lỗi Google Sign-In:", error);
      alert("Đăng nhập thất bại: " + error.message);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Welcome Back';
      case 'register': return 'Create Account';
      case 'forgot': return 'Reset Password';
      case 'otp': return 'Email Verification';
      case 'reset': return 'New Password';
      default: return 'Sign In';
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* CỘT TRÁI */}
      <div className="hidden w-1/2 flex-col justify-center bg-[#eef6fc] p-12 lg:flex xl:p-24">
        <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-800">
          EDUSUBMIT PLATFORM
        </div>
        <div className="mb-12 flex items-center gap-2">
          <BookOpen size={48} className="text-[#00a8ff]" />
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-[#00a8ff]">EduSubmit</h1>
            <p className="font-medium text-slate-600">Smart Education System</p>
          </div>
        </div>
        <div className="w-full max-w-lg">
          <img src={heroImg} alt="EduSubmit Hero" className="w-full object-contain" />
        </div>
      </div>

      {/* CỘT PHẢI */}
      <div className="flex w-full flex-col justify-center bg-white px-8 lg:w-1/2 sm:px-16 xl:px-32">
        <div className="w-full max-w-lg">

          {mode !== 'login' && mode !== 'register' && (
            <button
              onClick={() => setMode('login')}
              className="mb-6 flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#00a8ff]"
            >
              <ArrowLeft size={16} /> Back to Sign In
            </button>
          )}

          <h2 className="mb-8 text-3xl font-bold text-slate-800">
            {getTitle()}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NHẬP EMAIL (Dùng cho Login, Register, Forgot Password) */}
            {(mode === 'login' || mode === 'register' || mode === 'forgot') && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={20} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-[#00a8ff] py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#00a8ff]"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
            )}

            {/* NHẬP MẬT KHẨU (Dùng cho Login, Register, Reset Password) */}
            {(mode === 'login' || mode === 'register' || mode === 'reset') && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  {mode === 'reset' ? 'New Password' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full rounded-2xl border border-[#00a8ff] py-3 pl-12 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-[#00a8ff]"
                    placeholder={mode === 'reset' ? "Enter new password" : "Password"}
                  />
                  <Eye
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-300 hover:text-slate-500"
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
            )}

            {/* BƯỚC NHẬP MÃ OTP 6 SỐ */}
            {mode === 'otp' && (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#00a8ff]">
                  <ShieldCheck size={32} />
                </div>
                <p className="mb-4 text-sm text-slate-600">
                  A 6-digit verification code has been sent to <span className="font-bold text-slate-800">{email}</span>.
                </p>
                <input
                  type="text"
                  required
                  maxLength="6"
                  className="w-full rounded-2xl border border-[#00a8ff] bg-slate-50 py-3 text-center text-2xl font-bold tracking-[0.5em] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#00a8ff]"
                  placeholder="------"
                />
              </div>
            )}

            {/* LINK QUÊN MẬT KHẨU */}
            {mode === 'login' && (
              <div className="flex justify-end text-sm">
                <span
                  className="cursor-pointer text-[#00a8ff] hover:underline"
                  onClick={() => setMode('forgot')}
                >
                  Forgot password?
                </span>
              </div>
            )}

            {/* NÚT SUBMIT CHÍNH */}
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00a8ff] py-3.5 font-bold text-white shadow-[0_4px_0_0_#e2e8f0] transition hover:bg-[#0097e6] active:translate-y-1 active:shadow-none"
            >
              {mode === 'login' && <>Sign In <LogIn size={20} /></>}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot' && 'Send Verification Code'}
              {mode === 'otp' && 'Verify Code'}
              {mode === 'reset' && 'Update Password'}
            </button>
          </form>

          {/* ĐĂNG NHẬP BẰNG GOOGLE */}
          {(mode === 'login' || mode === 'register') && (
            <>
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-slate-200"></div>
                <span className="mx-4 text-sm text-slate-500">Or continue with</span>
                <div className="flex-1 border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                Sign in with Google
              </button>
            </>
          )}

          {/* CHUYỂN ĐỔI QUA LẠI GIỮA LOGIN VÀ REGISTER */}
          {(mode === 'login' || mode === 'register') && (
            <div className="mt-8 text-center text-sm text-slate-600">
              {mode === 'login' ? (
                <p>Don't have an account? <span className="cursor-pointer font-semibold text-[#00a8ff] hover:underline" onClick={() => setMode('register')}>Sign up</span></p>
              ) : (
                <p>Already have an account? <span className="cursor-pointer font-semibold text-[#00a8ff] hover:underline" onClick={() => setMode('login')}>Sign in</span></p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}