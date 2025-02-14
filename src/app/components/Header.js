import React from "react";

const Header = () => {
  return (
    <div className="mb-8 text-center sm:text-left">
      <div>
        {/* Hàng chứa logo */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between mb-4 gap-4">
          {/* Logo lớn bên trái */}
          <img src="/img/coop.png" alt="Logo CoopBank" className="h-12 sm:h-16 max-w-full" />

          {/* Hai logo nhỏ bên phải */}
          <div className="flex space-x-4">
            <img src="/img/MCG.png" alt="Logo MCG" className="h-12 sm:h-16 max-w-full" />
            <img src="/img/ITDE.png" alt="Logo ITDE" className="h-12 sm:h-16 max-w-full" />
          </div>
        </div>
      </div>
      
      {/* Tiêu đề và mô tả */}
      <h1 className="text-xl sm:text-2xl font-bold text-teal-800">
        Khảo sát chuyển đổi số trong hệ thống quỹ tín dụng Co-op Bank
      </h1>
      <p className="text-gray-600 mt-2 text-sm sm:text-base">
        Nghiên cứu này nhằm thu thập ý kiến về thực trạng chuyển đổi số và những khó khăn thách thức trong hành trình này.
      </p>
    </div>
  );
};

export default Header;
