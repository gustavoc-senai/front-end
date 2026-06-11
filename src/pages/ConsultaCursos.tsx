import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './Aluno.css'

function ConsultaCursos() {

    const navigate = useNavigate()

    const [cursos, setCursos] = useState<any[]>([])

    useEffect(() => {
        buscarCursos()
    }, [])

    async function buscarCursos() {
        try {
            const response = await axios.get(
                'http://localhost:8080/cursos'
            )
            setCursos(response.data)
        } catch (error) {
            console.error("Erro ao carregar lista de cursos", error)
        }
    }

    async function excluirCurso(id: number) {
        const confirmar = confirm('Deseja realmente excluir este curso?')

        if (confirmar) {
            try {
                await axios.delete(
                    `http://localhost:8080/cursos/${id}`
                )
                alert('Curso excluído com sucesso!')
                buscarCursos()
            } catch (error) {
                console.error("Erro ao deletar curso", error)
                alert("Não foi possível excluir o curso. Verifique dependências.")
            }
        }
    }

    function editarCurso(id: number) {
        navigate(`/cursos/editar/${id}`)
    }

    return (
        <div className="alunos-pagina">
            <div className="alunos-container">
                <div className="alunos-topo">
                    <div>
                        <h1>Consulta de Cursos</h1>
                        <p>Visualize, edite ou exclua os cursos cadastrados</p>
                    </div>

                    <div className="alunos-topo-botoes">
                        <button
                            className="alunos-botao-novo"
                            onClick={() => navigate('/cursos/cadastro')}
                        >
                            Novo curso
                        </button>

                        <button
                            className="alunos-botao-voltar"
                            onClick={() => navigate('/logado')}
                        >
                            Voltar
                        </button>
                    </div>
                </div>

                <div className="alunos-lista-card">
                    <div className="alunos-lista-topo">
                        <div>
                            <h2>Cursos cadastrados</h2>
                            <p>Total de cursos: {cursos.length}</p>
                        </div>
                    </div>

                    <div className="alunos-tabela-container">
                        <table className="alunos-tabela">
                            <thead>
                                <tr>
                                    <th>Nome do Curso</th>
                                    <th>Instituição</th>
                                    <th>Carga Horária</th>
                                    <th>Área de Estudo</th>
                                    <th>Nível do Curso</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    cursos.map((curso) => (
                                        <tr key={curso.id}>
                                            {/* Aceita tanto nomeCurso quanto nome vindo da API */}
                                            <td>{curso.nomeCurso || curso.nome}</td>
                                            <td>{curso.instituicao}</td>
                                            <td>{curso.cargaHoraria}h</td>
                                            <td>{curso.area || 'N/A'}</td>
                                            <td>{curso.nivel || 'N/A'}</td>
                                            <td>
                                                <span className="alunos-status">
                                                    {curso.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="alunos-acoes">
                                                    <button
                                                        className="alunos-botao-editar"
                                                        onClick={() => editarCurso(curso.id)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="alunos-botao-excluir"
                                                        onClick={() => excluirCurso(curso.id)}
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsultaCursos