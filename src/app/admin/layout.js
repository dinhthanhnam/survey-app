import AdminHeader from '../components/Admin/Header';

export default function AdminLayout({ children }) {
    return (
        <div className="max-h-screen flex flex-col overflow-y-auto">
            <div className="w-full bg-white shadow-lg p-4 pb-0">
                <AdminHeader />
            </div>
            <div className="w-full mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 max-h-screen overflow-y-auto ">
                <main className="flex-grow p-4">{children}</main>
            </div>
        </div>
    );
}
