import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setName, toggle } from '../../store/menu/menuSlice';
import { useEffect } from 'react';
import { inLogout } from '../../store/auth/authSlice';

export const ToolbarPage = () => {

    const dispatch = useDispatch();
    const { nameClass, firtsName } = useSelector(state => state.menu);

    useEffect(() => {
        let name = localStorage.getItem('name');
        let splitName = name.split(' ');
        let nameCompleted = splitName[0] = splitName[0].charAt(0).toUpperCase() + splitName[0].slice(1);
        dispatch(setName(nameCompleted));
    }, [])
    
    const setVisibleSideBar = () => {
        if (nameClass == 'layout-static') {
            dispatch( toggle('layout-overlay layout-mobile-active') )
        }else{
            dispatch( toggle('layout-static') )
        }
    }

    const logout = () => {
        localStorage.clear();
        dispatch( inLogout());
    }

    return (
        <div className="layout-topbar">
             <Link href="/" className="layout-topbar-logo">
                 <img src="/vite.svg" alt="logo" />
                 <span>Blessing</span>
             </Link> 
             <button onClick={setVisibleSideBar} type="button" className="p-link layout-menu-button layout-topbar-button">
                <i className="pi pi-bars" />
            </button>
            <button onClick={logout} type="button" className="p-link layout-topbar-menu-button layout-topbar-button">
                <i className="pi pi-sign-out" />
            </button>
            <div className="layout-topbar-menu cursor-pointer" onClick={logout}>
                <div className="flex align-items-center">
                    <i className="pi pi-sign-out mr-2" style={{ fontSize: '1.5rem' }}></i>
                    <span style={{ fontSize: '1.5rem' }}>{firtsName}</span>
                </div>
            </div>
        </div>
    );
}
