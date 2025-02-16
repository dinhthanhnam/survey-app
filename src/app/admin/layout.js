import AdminHeader from '../components/Admin/Header';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-custom-wave bg-cover bg-repeat flex flex-col">
            <div className="w-full bg-white shadow-lg p-4 max-h-screen overflow-y-auto pb-0">
                <AdminHeader />
            </div>
            <div className="w-full sm:w-[90%] md:w-[80%] lg:w-3/5 mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 max-h-screen overflow-y-auto pb-32">
                <main className="flex-grow p-4">{children}</main>
            </div>
        </div>
    );
}
