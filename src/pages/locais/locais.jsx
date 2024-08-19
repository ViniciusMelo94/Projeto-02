import { useEffect, useState } from "react";
import './locais.css'
import { BotaoVoltar } from "../../components/botaoVoltar/botao-voltar";
import {Sidebar} from "../../components/Sidebar/sidebar"

function Locais() {
    const [locais, setLocais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchLocais() {
            try {
                const response = await fetch('http://localhost:3333/locais'); 
                if (!response.ok) {
                    throw new Error('Erro ao buscar os locais');
                }
                const data = await response.json();
                setLocais(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchLocais();
    }, []);

    if (loading) return <p>Carregando locais...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="">
            <Sidebar/>
            <h1>Locais Cadastrados</h1>
            <table className="tableLocais">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                    </tr>
                </thead>
                <tbody>
                    {locais.map((local) => (
                        <tr key={local.id}>
                            <td>{local.nome}</td>
                            <td>{local.descricao}</td>
                            <td>{local.localizacao.latitude}</td>
                            <td>{local.localizacao.longitude}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BotaoVoltar/>

        </div>
    );
}

export default Locais;