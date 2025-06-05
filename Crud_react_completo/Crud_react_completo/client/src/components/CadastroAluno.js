import React, { useState } from 'react';
import Axios from 'axios';

function CadastroAluno() {
  const [values, setValues] = useState({ nome: '', idade: '' });

  // Atualiza o estado com os valores dos inputs
  const handleChangeValues = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envia os dados para o backend
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o recarregamento da página
    Axios.post('http://localhost:3001/register', {
      nome: values.nome,
      idade: values.idade,
    })
      .then((response) => {
        console.log('Aluno cadastrado:', response.data);
        alert('Aluno cadastrado com sucesso!');
        setValues({ nome: '', idade: '' }); // Limpa o formulário
      })
      .catch((error) => {
        console.error('Erro ao cadastrar aluno:', error);
        alert('Erro ao cadastrar aluno.');
      });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Cadastro de Aluno</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    value={values.nome}
                    onChange={handleChangeValues}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="idade" className="form-label">Idade:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="idade"
                    name="idade"
                    value={values.idade}
                    onChange={handleChangeValues}
                    required
                    min="0"
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Cadastrar Aluno
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroAluno;
