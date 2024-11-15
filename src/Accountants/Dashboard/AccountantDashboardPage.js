import React, { useState } from 'react';
import AccountantHeader from './Header/AccountantHeader';
import AccountantSidebar from './SideBar/AccountantSidebar';
import AccountantDashboardBody from './body/AccountantDashboardBody';
import './AccountantDashboardPage.css';

const AccountantDashboardPage = () => {
    const [selectedComponent, setSelectedComponent] = useState('Transactions');

    return (
        <div className="accountant-dashboard-page">
            <AccountantHeader />
            <div className="accountant-main-content">
                <AccountantSidebar onItemClick={setSelectedComponent} />
                <AccountantDashboardBody selectedComponent={selectedComponent} />
            </div>
        </div>
    );
};

export default AccountantDashboardPage;
