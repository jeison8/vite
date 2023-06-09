import { Routes, Route, Navigate } from 'react-router-dom';
import { FooterPage } from '../pages/FooterPage';
import { ToolbarPage } from '../pages/ToolbarPage';
import { HomePage } from '../pages/HomePage';
import { useSelector } from 'react-redux';
import { SideBarPage } from '../pages/SideBarPage';
import { CreatePage } from '../pages/CreatePage';
import { UpdatePage } from '../pages/UpdatePage';

export const DashboardRoutes = () => {

  const nameClass = useSelector(state => state.menu.nameClass);
  const layoutClasses = `layout-wrapper ${nameClass}`

  return (
    <div className={layoutClasses}>
      <ToolbarPage/> 
      <div className="layout-sidebar">
        <SideBarPage />
      </div>
      <div className="layout-main-container">
          <div className="layout-main">
            <Routes>
                <Route path="" element={ <HomePage /> } />
                <Route path="create" element={ <CreatePage /> } />
                <Route path="update" element={ <UpdatePage /> } />
                <Route path="*" element={ <Navigate to="" /> } />
            </Routes>
            <FooterPage />
          </div>
      </div>
    </div>
  )
}
