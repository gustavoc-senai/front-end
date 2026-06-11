import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Logado from './pages/Logado'

import CadastroAluno from './pages/CadastroAlunos'
import ConsultaAlunos from './pages/ConsultaAlunos'
import ConsultaTarefas from './pages/ConsultaTarefas' 
import CadastroTarefa from './pages/CadastroTarefas'
import CadastroMetas from './pages/CadastroMetas'
import ConsultaMetas from './pages/ConsultaMetas'
import CadastroConquistas from './pages/CadastroConquistas'
import ConsultaConquistas from './pages/ConsultaConquistas'
import CadastroCursos from './pages/CadastroCursos'
import ConsultaCursos from './pages/ConsultaCursos'
import CadastroEventos from './pages/CadastroEventos'
import ConsultaEventos from './pages/ConsultaEventos'
import CadastroHobbie from './pages/CadastroHobbie'
import ConsultaHobbie from './pages/ConsultaHobbie'
import CadastroPessoas from './pages/CadastroPessoas'
import ConsultaPessoas from './pages/ConsultaPessoas'


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/logado"
          element={<Logado />}
        />
        <Route
          path="/alunos/cadastro"
          element={<CadastroAluno />}
        />

        <Route
          path="/alunos/consulta"
          element={<ConsultaAlunos />}
        />

        <Route
          path="/alunos/editar/:id"
          element={<CadastroAluno />}
        />

        <Route
          path="/tarefas/cadastro"
          element={<CadastroTarefa />}
        />

        <Route
          path="/tarefas/consulta"
          element={<ConsultaTarefas />}
        />

        <Route
          path="/tarefas/editar/:id"
          element={<CadastroTarefa />}
        />
        
        <Route
          path="/metas/cadastro"
          element={<CadastroMetas />}
        />
        
        <Route
          path="/metas/consulta"
          element={<ConsultaMetas />}
        />

        <Route
          path="/metas/editar/:id"
          element={<CadastroMetas />}
        />  

        <Route
          path="/conquistas/cadastro"
          element={<CadastroConquistas />}
        />

        <Route
          path="/conquistas/consulta"
          element={<ConsultaConquistas />}
        />
        <Route
          path="/conquistas/editar/:id"
          element={<CadastroConquistas />}
        />
        <Route
          path="/cursos/cadastro"
          element={<CadastroCursos />}
        />
        <Route
          path="/cursos/consulta"
          element={<ConsultaCursos />}
        />
        <Route
          path="/cursos/editar/:id"
          element={<CadastroCursos />}
        />
        <Route
          path="/eventos/cadastro"
          element={<CadastroEventos />}
        />
        <Route
          path="/eventos/consulta"
          element={<ConsultaEventos />}
        />
        <Route
          path="/eventos/editar/:id"
          element={<CadastroEventos />}
        />
        <Route
          path="/hobbies/cadastro"
          element={<CadastroHobbie />}
        />
        <Route
          path="/hobbies/consulta"
          element={<ConsultaHobbie />}
        />
        <Route
          path="/hobbies/editar/:id"
          element={<CadastroHobbie />}
        />
        <Route
          path="/pessoas/cadastro"
          element={<CadastroPessoas />}
        />
        <Route
          path="/pessoas/consulta"
          element={<ConsultaPessoas />}
        />
        <Route
          path="/pessoas/editar/:id"
          element={<CadastroPessoas />}
        />
        
      </Routes>

    </BrowserRouter>
  )
}

export default App