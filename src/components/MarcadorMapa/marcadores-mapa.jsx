import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export function MarcadoresMapa({ locais }) {
    const map = useMap();

    useEffect(() => {
        if (locais.length > 0 && locais[0].localizacao) {
            const primeiroLocalDaLista = locais[0];

            map.flyTo({
                lat: primeiroLocalDaLista.localizacao.latitude,
                lng: primeiroLocalDaLista.localizacao.longitude,
            },
            13,
            { animate: true });
        }
    }, [locais, map]);

    return (
        <>
            {locais.map((local) => (
                local.localizacao ? (
                    <Marker position={[local.localizacao.latitude, local.localizacao.longitude]}
                        key={local.id}>
                        <Popup>
                            <strong>{local.nome}</strong>
                            <p>{local.descricao}</p>
                        </Popup>
                    </Marker>
                ) : null
            ))}
        </>
    );
}