import React from "react";

const Header = () => {
  return (
    <div className="pt-4 pb-4 rounded-lg mb-6 text-left px-2 bg-teal-600">
      {/* Hàng chứa logo */}
      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 mb-4">
        {/* Logo lớn bên trái */}
        <img
          src="/img/coop.png"
          alt="Logo CoopBank"
          className="h-12 sm:h-16 w-32 sm:w-52 flex-shrink-0"
        />

        {/* Hai logo nhỏ bên phải */}
        <div className="flex items-center justify-center sm:justify-start space-x-4">
          <img src="/img/MCG.png" alt="Logo MCG" className="h-10 sm:h-14 max-w-[120px] flex-shrink-0" />
          <img src="/img/ITDE.png" alt="Logo ITDE" className="h-10 sm:h-14 max-w-[90px] flex-shrink-0" />
        </div>
      </div>

      {/* Tiêu đề và mô tả */}
      <h1 className="text-lg sm:text-2xl font-bold text-white">
        Khảo sát chuyển đổi số trong hệ thống quỹ tín dụng Co-op Bank
      </h1>
      <p className="text-gray-100 mt-2 text-sm sm:text-base">
        Nghiên cứu này nhằm thu thập ý kiến về thực trạng chuyển đổi số và những khó khăn thách thức trong hành trình này.
      </p>
    </div>
  );
};

export default Header;
