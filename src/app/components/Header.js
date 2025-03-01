import React from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      localStorage.removeItem("respondent");
      router.push("/auth");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <div className="pt-4 pb-4 rounded-lg mb-6 text-left px-4 bg-teal-600">
      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 mb-4">
        <img
          src="/img/coop.png"
          alt="Logo CoopBank"
          className="h-10 sm:h-14 w-auto flex-shrink-0 object-contain"
        />

        <div className="flex items-center justify-center sm:justify-start gap-6">
          <img
            src="/img/MCG.png"
            alt="Logo MCG"
            className="h-12 sm:h-16 w-auto flex-shrink-0 object-contain"
          />
          <img
            src="/img/ITDE.png"
            alt="Logo ITDE"
            className="h-14 sm:h-20 w-auto flex-shrink-0 object-contain"
          />
        </div>
      </div>

      <div>
        <h1 className="text-lg sm:text-2xl font-bold text-white text-center sm:text-left">
          Khảo sát chuyển đổi số trong hệ thống quỹ tín dụng Co-op Bank
        </h1>
        <p className="text-gray-100 mt-2 text-sm sm:text-base text-justify">
          Nghiên cứu này nhằm thu thập ý kiến về thực trạng chuyển đổi số và những khó khăn thách thức trong hành trình này.
        </p>
      </div>

      {pathname !== "/auth" && pathname !== "/refresh" && (
        <div className="mt-4 text-right">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold shadow-md hover:bg-red-600 transition"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
