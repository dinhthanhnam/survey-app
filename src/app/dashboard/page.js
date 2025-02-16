import React from 'react';
import Header from '../components/Header';

function Dashboard() {
    return (
        <div className="min-h-screen bg-custom-wave bg-cover bg-repeat flex flex-col">
            <div className="w-full bg-white shadow-lg rounded-b-lg p-4 sm:p-6 md:p-8 max-h-screen overflow-y-auto pb-32">
                <Header />
            </div>
        </div>
    );
}

export default Dashboard;
