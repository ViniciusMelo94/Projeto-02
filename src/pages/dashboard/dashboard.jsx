import { useEffect, useState } from "react"
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Link } from 'react-router-dom'
import { api } from '../../utils/api'
import { MarcadoresMapa } from "../../components/MarcadorMapa/marcadores-mapa"
import {
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableHeader,
    TableRow,
} from '../../components/table/table'
import { Card } from '../../components/Cards/card'
import { Sidebar } from "../../components/Sidebar/sidebar"
import './dashboard.css'


export function Dashboard() {
    const [locais, setLocais] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    async function buscarLocais() {
        const response = await api('/locais');
        const data = await response.json();
        setLocais(data);
    }

    async function buscarUsuarios() {
        const response = await api('/users');
        const data = await response.json();
        setUsuarios(data);
    }

    useEffect(() => {
        buscarLocais();
        buscarUsuarios();
    }, []);

    const totalLocais = locais.length;
    const totalUsuarios = usuarios.length;

    return (
        <div>
            <Sidebar />
            <div className="containerCards">
                <Card title="Usuários" total={totalUsuarios} redirectTo="/dashboard/users" />
                <Card title="Locais" total={totalLocais} redirectTo="/dashboard/locais" />
            </div>

            <div className="containerTableAndMap">
                <div className="containerLocais">
                    <div className="headerContainer">
                        <h4>Locais</h4>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Opções</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {locais.map((local) => (
                                <TableRow key={local.id}>
                                    <TableCell>{local.nome}</TableCell>
                                    <TableCell>{local.descricao}</TableCell>
                                    <TableCell>
                                        <Link to={`/dashboard/locais/${local.id}`}>Editar</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="containerMap">
                    <div className="headerContainer">
                        <h4>Map</h4>
                        <p>Localidades marcadas no mapa</p>
                    </div>
                    <div>
                        <MapContainer
                            center={[-27.59257015, -48.55539625]}
                            zoom={13} style={{
                                height: '280px', width: '480px'

                            }} >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                            <MarcadoresMapa locais={locais} />
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}