import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sexo: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    senha: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCepChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, cep });

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          alert('CEP não encontrado!');
        } else {
          setFormData({
            ...formData,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
          });
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar o CEP!');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.cpf) {
      setErrors({ ...errors, form: 'Todos os campos obrigatórios devem ser preenchidos.' });
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar usuário');
      }

      const data = await response.json();
      alert('Usuário cadastrado com sucesso!', data);

      navigate('/'); // Redirecionar para a página de login

    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      setErrors({ ...errors, form: 'Erro ao salvar usuário. Tente novamente mais tarde.' });
    }
  };

  return (
    <form className='form-usuario' onSubmit={handleSubmit}>
      <h1>Cadastro de Usuário</h1>
      {errors.form && <p className="error">{errors.form}</p>}
      <div>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="sexo">Sexo:</label>
        <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      <div>
        <label htmlFor="cpf">CPF:</label>
        <input 
          type="text" 
          id="cpf" 
          name="cpf" 
          value={formData.cpf} 
          onChange={handleChange} 
          required 
        />
        {errors.cpf && <p className="error">{errors.cpf}</p>}
      </div>
      <div>
        <label htmlFor="dataNascimento">Data de Nascimento:</label>
        <input type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="senha">Senha:</label>
        <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="cep">CEP:</label>
        <input 
          type="text" 
          id="cep" 
          name="cep" 
          value={formData.cep} 
          onChange={handleCepChange} 
          required 
          maxLength="8"
        />
      </div>
      <div>
        <label htmlFor="logradouro">Logradouro:</label>
        <input type="text" id="logradouro" name="logradouro" value={formData.logradouro} readOnly />
      </div>
      <div>
        <label htmlFor="bairro">Bairro:</label>
        <input type="text" id="bairro" name="bairro" value={formData.bairro} readOnly />
      </div>
      <div>
        <label htmlFor="cidade">Cidade:</label>
        <input type="text" id="cidade" name="cidade" value={formData.cidade} readOnly />
      </div>
      <div>
        <label htmlFor="estado">Estado:</label>
        <input type="text" id="estado" name="estado" value={formData.estado} readOnly />
      </div>
      <button className="btn-cadastro" type="submit">Cadastrar</button>
    </form>
  );
};

export { Cadastro };