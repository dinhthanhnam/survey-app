import React from "react";

const Header = () => {
  return (
    <div className="mb-8">
      <div>
        {/* Hàng chứa logo */}
        <div className="flex justify-between items-center mb-4">
          {/* Logo lớn bên trái */}
          <img src="/img/coop.png" alt="Logo CoopBank" className="h-16" />

          {/* Hai logo nhỏ bên phải */}
          <div className="flex space-x-4">
            <img src="/img/MCG.png" alt="Logo MCG" className="h-16" />
            <img src="/img/ITDE.png" alt="Logo ITDE" className="h-16" />
          </div>
        </div>
      </div>
      
      {/* Tiêu đề và mô tả */}
      <h1 className="text-2xl font-bold text-teal-800">
        Khảo sát chuyển đổi số trong hệ thống quỹ tín dụng Co-op Bank
      </h1>
      <p className="text-gray-600 mt-2">
        Nghiên cứu này nhằm thu thập ý kiến về thực trạng chuyển đổi số và những khó khăn thách thức trong hành trình này.
      </p>
    </div>
  );
};

export default Header;
