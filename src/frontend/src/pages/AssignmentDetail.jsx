import React, { useState, useRef } from 'react';
import { ArrowLeft, FileText, Plus, X, File, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AssignmentDetail() {
    const navigate = useNavigate();
    const { courseId } = useParams();

    // 1. TẠO REF ĐỂ LIÊN KẾT VỚI THẺ INPUT FILE BỊ GIẤU
    const fileInputRef = useRef(null);

    const [uploadedFile, setUploadedFile] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const assignment = {
        title: "Nộp tài liệu đặc tả yêu cầu (SRS) V1.0",
        teacher: "TS. Lê Trung Hiếu",
        points: "100 điểm",
        dueDate: "Đến hạn: Tối nay, 23:59",
        content: "Yêu cầu:\n- Các nhóm trưởng đại diện nộp file PDF hoặc link Google Docs.\n- Đặt tên file theo cú pháp: [Group_XX]_SRS_V1.pdf (Ví dụ: Group_07_SRS_V1.pdf).\n- Tiêu chí chấm điểm: 40% Use case, 30% UI mockups, 30% Database schema.",
    };

    // 2. HÀM KÍCH HOẠT CỬA SỔ CHỌN FILE
    const handleFileUploadClick = () => {
        // Gọi lệnh click() ảo vào thẻ input đang bị ẩn
        fileInputRef.current.click();
    };

    // 3. HÀM XỬ LÝ KHI NGƯỜI DÙNG ĐÃ CHỌN FILE XONG
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Lấy file đầu tiên người dùng chọn

        if (file) {
            // Tính toán dung lượng file (MB hoặc KB) cho chuyên nghiệp
            let fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
            if (file.size < 1024 * 1024) {
                fileSize = (file.size / 1024).toFixed(2) + ' KB';
            }

            // Lưu thông tin file thật vào state để hiển thị ra màn hình
            setUploadedFile({
                name: file.name,
                size: fileSize,
                rawFile: file // Lưu lại file gốc để mốt gửi lên server (API)
            });
        }

        // Reset lại giá trị thẻ input để chọn lại cùng 1 file không bị lỗi
        event.target.value = null;
    };

    const handleSubmit = () => {
        if (uploadedFile) {
            setIsSubmitted(true);
        }
    };

    const handleCancelSubmit = () => {
        setIsSubmitted(false);
    };

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col">
            {/* TOP NAVBAR */}
            <nav className="w-full bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors tooltip">
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <span className="text-xl font-medium text-gray-800">
                        Chi tiết bài tập
                    </span>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium cursor-pointer">
                    NH
                </div>
            </nav>

            <main className="max-w-6xl mx-auto w-full p-4 md:p-6 lg:p-8 flex-1">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* CỘT TRÁI: Nội dung đề bài */}
                    <div className="flex-1">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-medium text-blue-600 mb-2">{assignment.title}</h1>
                                <p className="text-gray-700 font-medium">{assignment.teacher}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1 font-medium">
                                    <span>{assignment.points}</span>
                                    <span>•</span>
                                    <span className="text-gray-800">{assignment.dueDate}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <p className="text-gray-800 whitespace-pre-line leading-relaxed text-sm md:text-base">
                                {assignment.content}
                            </p>
                        </div>

                        <div className="border-t border-gray-200 pt-6 mt-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0 text-gray-400">
                                    <User className="w-6 h-6" />
                                </div>
                                <div className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 cursor-text">
                                    Thêm nhận xét của lớp học...
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: Form nộp bài */}
                    <div className="w-full lg:w-[350px] shrink-0">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-medium text-gray-800">Bài tập của bạn</h2>
                                <span className={`text-sm font-medium ${isSubmitted ? 'text-green-600' : 'text-green-600'}`}>
                                    {isSubmitted ? 'Đã nộp' : 'Đã giao'}
                                </span>
                            </div>

                            {/* Box hiển thị file thật sau khi chọn */}
                            {uploadedFile && (
                                <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-3 mb-4 bg-gray-50 relative group">
                                    <File className="w-8 h-8 text-blue-500" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate" title={uploadedFile.name}>
                                            {uploadedFile.name}
                                        </p>
                                        <p className="text-xs text-gray-500">{uploadedFile.size}</p>
                                    </div>
                                    {!isSubmitted && (
                                        <button
                                            onClick={() => setUploadedFile(null)}
                                            className="p-1 hover:bg-gray-200 rounded-full text-gray-500"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* THẺ INPUT FILE BỊ GIẤU TÀNG HÌNH */}
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />

                            {!isSubmitted ? (
                                <div className="flex flex-col gap-3">
                                    {!uploadedFile && (
                                        <button
                                            onClick={handleFileUploadClick} 
                                            className="w-full py-2.5 px-4 flex items-center justify-center gap-2 border border-gray-300 rounded-md text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Thêm hoặc tạo
                                        </button>
                                    )}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!uploadedFile}
                                        className={`w-full py-2.5 px-4 rounded-md font-medium transition-colors ${uploadedFile
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        Nộp bài
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleCancelSubmit}
                                    className="w-full py-2.5 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors mt-2"
                                >
                                    Hủy nộp bài
                                </button>
                            )}
                        </div>

                        <div className="mt-4 flex items-center gap-3 cursor-text">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0">NH</div>
                            <div className="flex-1 border border-gray-300 rounded-full px-4 py-1.5 text-sm text-gray-500 hover:bg-gray-50">
                                Nhận xét riêng tư...
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}