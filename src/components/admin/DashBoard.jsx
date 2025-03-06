import React, { useRef, useState } from 'react';
import SideMenu from './common/SideMenu';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Overview from './Overview';

function Dashboard(props) {
    const contentRef = useRef();

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);


    const toggleSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    }

    return (
        <div className='grid grid-cols-6 md:grid-cols-10 xl:grid-cols-12 gap-0 h-full'>
            {/* sidebar */}
            {isSideMenuOpen && (
                <div className='col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2'>
                    <SideMenu />
                </div>
            )}
            
            {/* dashboard */}
            <div className={`col-span-5 
                ${isSideMenuOpen ? 
                'md:col-span-9 lg:col-span-8 xl:col-span-10' : 
                'md:col-span-10 xl:col-span-12'} 
                h-full`}>
                <div className='relative'>
                    <Navbar toggleSideMenu={toggleSideMenu}/>

                    <div className='overflow-y-auto h-screen flex flex-col' ref={contentRef}>
                        {/* content */}
                        <div className="flex-grow overflow-y-auto p-5 bg-slate-100" style={{ marginTop: 72, paddingBottom: '12rem' }}>
                            <Overview />
                        </div>                       

                        {/* footer */}
                        <Footer />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard;