import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [editingAluno, setEditingAluno] = useState(null);
  const [editedData, setEditedData] = useState({ nome: '', idade: '' });

  useEffect(() => {
    Axios.get('http://localhost:3001/listar')
      .then((response) => {
        setAlunos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleExcluirAluno = (alunoId) => {
    Axios.delete(`http://localhost:3001/excluir/${alunoId}`)
      .then(() => {
        setAlunos((prev) => prev.filter((aluno) => aluno.id !== alunoId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditClick = (aluno) => {
    setEditingAluno(aluno);
    setEditedData({ nome: aluno.nome, idade: aluno.idade });
  };

  const handleSaveClick = () => {
    Axios.put(`http://localhost:3001/editar/${editingAluno.id}`, editedData)
      .then(() => {
        setAlunos((prevAlunos) =>
          prevAlunos.map((aluno) =>
            aluno.id === editingAluno.id ? { ...aluno, ...editedData } : aluno
          )
        );
        setEditingAluno(null);
        setEditedData({ nome: '', idade: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="mt-5">
      <h2 className="mb-4">Lista de Alunos</h2>
      {alunos.length === 0 ? (
        <p className="text-muted">Nenhum aluno cadastrado.</p>
      ) : (
        <ul className="list-group">
          {alunos.map((aluno) => (
            <li key={aluno.id} className="list-group-item">
              {editingAluno?.id === aluno.id ? (
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Nome"
                      value={editedData.nome}
                      onChange={(e) =>
                        setEditedData({ ...editedData, nome: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Idade"
                      value={editedData.idade}
                      onChange={(e) =>
                        setEditedData({ ...editedData, idade: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6 text-end">
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={handleSaveClick}
                    >
                      Salvar
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingAluno(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <strong>{aluno.nome}</strong> <br />
                    <span className="text-muted">Idade: {aluno.idade}</span>
                  </div>
                  <div className="col-md-6 text-end">
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEditClick(aluno)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleExcluirAluno(aluno.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaAlunos;