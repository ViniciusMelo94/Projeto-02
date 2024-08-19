import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';

export function Sidebar() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        navigate('/'); 
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div>
            <button className={`menu-toggle ${isSidebarVisible ? 'active' : ''}`} onClick={toggleSidebar}>
                ☰
            </button>
            <div className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
                <h2 >Dashboard</h2>
                <ul>
                    <li>
                        <Link to="/dashboard">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/cadastrarlocais">Cadastrar Locais</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/locais">Locais</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/users">Usuários</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}