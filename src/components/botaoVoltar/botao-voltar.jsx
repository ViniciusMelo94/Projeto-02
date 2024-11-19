import React from 'react';
import { useNavigate } from 'react-router-dom';
import './botaoVoltar.css';

export function BotaoVoltar() {
    const navigate = useNavigate();

    return (
        <button className="botao-voltar" onClick={() => navigate(-1)}>
            Voltar
        </button>
    );
}