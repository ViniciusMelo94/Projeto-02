import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth";
import { Sidebar } from "../../components/Sidebar/sidebar";
import './cadastroLocais.css';

function CadastroLocais() {
    const { register, handleSubmit, formState, setValue, watch } = useForm({});
    const { errors } = formState;

    const { user } = useAuth();
    const [endereco, setEndereco] = useState({
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: ''
    });
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const cepValue = watch('local');

    useEffect(() => {
        async function buscarCEP() {
            const cepLimpo = cepValue?.replace(/\D/g, ''); 
            const cepValido = /^\d{8}$/.test(cepLimpo);
            if (cepValido) {
                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
                    const data = await response.json();
                    if (!data.erro) {
                        setEndereco({
                            cep: data.cep,
                            logradouro: data.logradouro,
                            bairro: data.bairro,
                            cidade: data.localidade,
                            estado: data.uf
                        });
                        const latLonResponse = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${cepLimpo}&format=json&limit=1`);
                        const latLonData = await latLonResponse.json();
                        if (latLonData.length > 0) {
                            setLatitude(latLonData[0].lat);
                            setLongitude(latLonData[0].lon);
                            setValue('latitude', latLonData[0].lat);
                            setValue('longitude', latLonData[0].lon);
                        } else {
                            console.error("Latitude e Longitude não encontradas para o CEP.");
                            setLatitude('');
                            setLongitude('');
                        }
                    } else {
                        console.error("CEP não encontrado");
                        setEndereco({
                            logradouro: '',
                            bairro: '',
                            cidade: '',
                            estado: ''
                        });
                        setLatitude('');
                        setLongitude('');
                    }
                } catch (error) {
                    console.error("Erro ao buscar CEP:", error);
                }
            } else {
                setEndereco({
                    logradouro: '',
                    bairro: '',
                    cidade: '',
                    estado: ''
                });
                setLatitude('');
                setLongitude('');
            }
        }

        buscarCEP();
    }, [cepValue, setValue]);

    async function addLocal(dados) {
        if (!user) { 
            alert("Usuário não autenticado.");
            return;
        }

        const localData = {
            id: new Date().getTime().toString(),
            nome: dados.local_name,
            descricao: dados.descricao,
            identificador_do_usuario: user.id, 
            localizacao: {
                cep: endereco.cep,
                logradouro: endereco.logradouro,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                estado: endereco.estado,
                latitude: latitude,
                longitude: longitude
            }
        };

        try {
            const resposta = await fetch('http://localhost:3333/locais', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(localData)
            });

            if (!resposta.ok) {
                alert("Houve um erro ao cadastrar o Local.");
            } else {
                alert("Cadastrado com sucesso!");
            }

        } catch (error) {
            alert("Houve um erro ao cadastrar o Local.");
        }
    }

    return (
        <>
            <Sidebar/>
            <form className="formCadastroLocal" onSubmit={handleSubmit(addLocal)}>
                <div className="layoutCadastro">
                    <div className="nameLocal">
                        <h1>Cadastro de Locais</h1>
                    </div>

                    <div className="cadastroLocalInf">
                        <label htmlFor="local_name">Nome do local</label>
                        <input
                            type="text"
                            id="local_name"
                            placeholder="Digite o nome do Local"
                            {...register('local_name', { required: "Nome do local é obrigatório" })}
                            className={errors.local_name ? 'inputError' : ''}
                        />
                        {errors.local_name && <p className="error">{errors.local_name.message}</p>}

                        <label htmlFor="descricao">Descrição do Local</label>
                        <input
                            type="text"
                            id="descricao"
                            placeholder="Descreva o local em poucas palavras"
                            {...register('descricao', { required: "Descrição é obrigatória" })}
                            className={errors.descricao ? 'inputError' : ''}
                        />
                        {errors.descricao && <p className="error">{errors.descricao.message}</p>}

                        <label htmlFor="local">Localização (CEP)</label>
                        <input
                            type="text"
                            id="local"
                            placeholder="Digite o CEP"
                            {...register('local', { 
                                required: "CEP é obrigatório", 
                                maxLength: { value: 8, message: "CEP inválido" },
                                pattern: {
                                    value: /^\d{8}$/,
                                    message: "CEP inválido"
                                }
                            })}
                            className={errors.local ? 'inputError' : ''}
                        />
                        {errors.local && <p className="error">{errors.local.message}</p>}

                        <label htmlFor="latitude">Latitude</label>
                        <input
                            type="text"
                            id="latitude"
                            placeholder="Latitude"
                            value={latitude}
                            readOnly
                        />

                        <label htmlFor="longitude">Longitude</label>
                        <input
                            type="text"
                            id="longitude"
                            placeholder="Longitude"
                            value={longitude}
                            readOnly
                        />
                    </div>
                    <button type="submit" className="btnCadastroLocal">Cadastrar</button>
                </div>
            </form>
        </>
    );
}

export default CadastroLocais;