import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth'; // Hook de autenticação fictício

export const PrivateRouteLayout = () => {
    const { isAuthenticated } = useAuth(); // Substitua com a lógica real de autenticação

    if (!isAuthenticated) {
        // Se o usuário não estiver autenticado, redireciona para a página de login
        return <Navigate to="/" replace />;
    }

    return (
        <div className='divAqui'>
            <main className='mainAq'>
                <Outlet /> {/* Renderiza o componente filho da rota */}
            </main>
            <footer>
                {/* Rodapé comum */}
                <p>© 2024 Minha Aplicação</p>
            </footer>
        </div>
    );
};