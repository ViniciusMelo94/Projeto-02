import { useEffect, useState } from 'react';
import './listar-usuarios.css';
import { BotaoVoltar } from '../../components/botaoVoltar/botao-voltar';
import {Sidebar} from '../../components/Sidebar/sidebar'

export function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const response = await fetch('http://localhost:3333/users');
                if (!response.ok) {
                    throw new Error('Erro ao buscar os usuários');
                }
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUsuarios();
    }, []);

    if (loading) return <p>Carregando usuários...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="containerUsuarios">
            <Sidebar/>
            <h1>Usuários Cadastrados</h1>
            <table className="tableUsuarios">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Sexo</th>
                        <th>Data de Nascimento</th>
                        <th>CPF</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.sexo}</td>
                            <td>{usuario.dataNascimento}</td>
                            <td>{usuario.cpf}</td>
                            <td>{usuario.cidade}</td>
                            <td>{usuario.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BotaoVoltar/>

        </div>
    );
}