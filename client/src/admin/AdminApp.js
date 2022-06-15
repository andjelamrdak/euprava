import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";
import AdminUsersPage from "./AdminUsersPage";
import AdminStatistics from "./AdminStatistics";
import UserPage from "./UserPage";

export default function AdminApp(props) {
  return (
    <div>
      <BrowserRouter>
        <AdminNavigation onLogout={props.onLogout} user={props.user} />
        <div className="container">
          <div className="content">
            <Routes>
              <Route path="/user/:id" element={<UserPage />} />
              <Route path="/statistics" element={<AdminStatistics />} />
              <Route path="*" element={<AdminUsersPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
