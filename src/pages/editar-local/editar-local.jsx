import { useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import './editar-local.css'
import { BotaoVoltar } from "../../components/botaoVoltar/botao-voltar";

export function PaginaEditarLocal(){
    const {id} = useParams()
    const {register, handleSubmit, reset} = useForm()

    async function onUpdate(data) {
        const response = await api('/locais/' + id, {
            method: 'PUT',
            body: JSON.stringify(data),
        })

        if(response.ok) {
            alert('Local atualizado com sucesso!')
        }
    }

    async function recuperarLocal() {
        const response = await api('/locais/' + id)
        const data = await response.json()

        if (data) {
            reset(data)
        }
    }

    useEffect(() => {
        if (id) {
            recuperarLocal()
        }
    }, [id])

    return (
        <form className="form-locais" onSubmit={handleSubmit(onUpdate)}>

            <h1>Editar Local</h1>
            <input type="text" placeholder="nome" {...register('nome')} />
            <textarea type="text" placeholder="descricao" {...register('descricao')}/>
            <button className="btn-locais">Atualizar Local</button>

            <BotaoVoltar/>

        </form>
    )
}