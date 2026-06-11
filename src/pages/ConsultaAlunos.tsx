import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './Aluno.css'

function ConsultaAlunos() {

    const navigate = useNavigate()

    const [alunos, setAlunos] = useState<any[]>([])

    useEffect(() => {
        buscarAlunos()
    }, [])

    async function buscarAlunos() {
        try {
            const response = await axios.get(
                'http://localhost:8080/alunos'
            )
            setAlunos(response.data)
        } catch (error) {
            console.error("Erro ao buscar alunos", error)
        }
    }

    async function excluirAluno(id: number) {
        const confirmar = confirm('Deseja realmente excluir este aluno?')

        if (confirmar) {
            try {
                await axios.delete(
                    `http://localhost:8080/alunos/${id}`
                )
                alert('Aluno excluído com sucesso!')
                buscarAlunos()
            } catch (error) {
                console.error("Erro ao excluir aluno", error)
                alert("Erro ao excluir o aluno.")
            }
        }
    }

    function editarAluno(id: number) {
        navigate(`/alunos/editar/${id}`)
    }

    return (
        <div className="alunos-pagina">
            <div className="alunos-container">
                <div className="alunos-topo">
                    <div>
                        <h1>Consulta de Alunos</h1>
                        <p>Visualize, edite ou exclua os alunos cadastrados</p>
                    </div>

                    <div className="alunos-topo-botoes">
                        <button
                            className="alunos-botao-novo"
                            onClick={() => navigate('/alunos/cadastro')}
                        >
                            Novo aluno
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
                            <h2>Alunos cadastrados</h2>
                            <p>Total de alunos: {alunos.length}</p>
                        </div>
                    </div>

                    <div className="alunos-tabela-container">
                        <table className="alunos-tabela">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Idade</th>
                                    <th>Email</th>
                                    <th>Telefone</th>
                                    <th>Turma</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    alunos.map((aluno) => {
                                        // Extrai a referência de pessoa para evitar repetição e erros de undefined
                                        const pessoa = aluno.pessoa || {};
                                        return (
                                            <tr key={aluno.id}>
                                                <td>{pessoa.nome || 'Não informado'}</td>
                                                <td>{pessoa.idade || '-'}</td>
                                                <td>{pessoa.email || '-'}</td>
                                                <td>{pessoa.telefone || '-'}</td>
                                                <td>{aluno.turma}</td>
                                                <td>
                                                    <span className="alunos-status">
                                                        {pessoa.status || 'Ativo'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="alunos-acoes">
                                                        <button
                                                            className="alunos-botao-editar"
                                                            onClick={() => editarAluno(aluno.id)}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            className="alunos-botao-excluir"
                                                            onClick={() => excluirAluno(aluno.id)}
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConsultaAlunos