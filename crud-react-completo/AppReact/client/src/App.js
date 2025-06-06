import './App.css';
import CadastroAluno from './components/CadastroAluno';
import ListaAlunos from './components/ListaAlunos';
import QrCodeGenerator from './components/QrCodeGenerator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Alunos</h1>
        <p>Cadastre e visualize alunos com facilidade</p>
      </header>

      <main className="App-main container">
        <CadastroAluno />
        <hr />
        <ListaAlunos />
        <QrCodeGenerator />
      </main>

      <footer className="App-footer">
        <p>© 2025 Sistema Escolar</p>
      </footer>
    </div>
  );
}

export default App;
