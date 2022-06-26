import React from 'react'
import UserNavigation from './UserNavigation'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IdCardsPage from './IdCardsPage';
import VaccinePage from './VaccinePage';
import CriminalRecordPage from './CriminalRecordPage';

function UserApp(props) {
    return (
        <div>
            <BrowserRouter>
                <UserNavigation user={props.user} onLogout={props.onLogout} />
                <div className="container">
                    <div className="content">
                        <Routes>
                            <Route path="/vaccine" element={<VaccinePage />} />
                            <Route path="/criminal-record" element={<CriminalRecordPage />} />
                            <Route path="*" element={<IdCardsPage />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default UserApp
