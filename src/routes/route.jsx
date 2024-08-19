import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/Signin/signin";
import { Cadastro } from "../pages/Signup/signup";
import { PaginaEditarLocal } from "../pages/editar-local/editar-local";
import Locais from "../pages/locais/locais";
import { Dashboard } from "../pages/dashboard/dashboard";
import {PrivateRouteLayout} from "../template/private"
import CadastroLocais from "../pages/cadastrar-locais/cadastro-locais";
import { ListaUsuarios } from "../pages/usuarios/listar-usuarios";

export const routes = createBrowserRouter([
    {
        path:'/',
        element: <LoginPage/>,
    },
    {
        path:'/cadastrar',
        element: <Cadastro/>,
    },
    {
        path: '/dashboard',
        element: <PrivateRouteLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard/>,
            },
            {
                path:'/dashboard/users',
                element: <ListaUsuarios/>
            },
            {
                path: '/dashboard/cadastrarlocais',
                element: <CadastroLocais/>
            },
            {
                path: '/dashboard/locais',
                element: <Locais/>,
            },
            {
                path: '/dashboard/locais/:id',
                element: <PaginaEditarLocal/>,
            },
        ],
    },
])