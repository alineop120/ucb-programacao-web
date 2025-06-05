import React, { useState } from 'react';
import './App.css';
import Mensagem from './components/Mensagem';
import Item1 from './components/Item1';

function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState({});

  function registrar(e) {
    e.preventDefault();
    setUser({ nome, email });
  }

  return (
    <div className="container">
      <Mensagem />
      <Item1 aluno="João" />

      <form onSubmit={registrar} className="formulario">
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      {user.nome && (
        <div className="resultado">
          <h3>Bem-vindo, {user.nome}!</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;