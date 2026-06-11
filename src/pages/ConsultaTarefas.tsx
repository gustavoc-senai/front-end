import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './Aluno.css'

function ConsultaTarefa() {

    const navigate = useNavigate()

    const [tarefas, setTarefas] = useState<any[]>([])

    useEffect(() => {
        buscarTarefas()
    }, [])

    async function buscarTarefas() {
        const response = await axios.get(
            'http://localhost:8080/tarefas'
        )

        setTarefas(response.data)
    }

    async function excluirTarefa(id: number) {

        const confirmar = confirm('Deseja realmente excluir esta tarefa?')

        if (confirmar) {
            await axios.delete(
                `http://localhost:8080/tarefas/${id}`
            )

            alert('Tarefa excluída com sucesso!')

            buscarTarefas()
        }
    }

    function editarTarefa(id: number) {
        navigate(`/tarefas/editar/${id}`)
    }

    return (
        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>
                        <h1>Consulta de Tarefas</h1>

                        <p>
                            Visualize, edite ou exclua as tarefas cadastradas
                        </p>
                    </div>

                    <div className="alunos-topo-botoes">

                        <button
                            className="alunos-botao-novo"
                            onClick={() => navigate('/tarefas/cadastro')}
                        >
                            Nova tarefa
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
                            <h2>Tarefas cadastradas</h2>

                            <p>
                                Total de tarefas: {tarefas.length}
                            </p>
                        </div>

                    </div>

                    <div className="alunos-tabela-container">

                        <table className="alunos-tabela">

                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Descrição</th>
                                    <th>Materia</th>
                                    <th>Data de Entrega</th>
                                    <th>Prioridade</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    tarefas.map((tarefa) => (

                                        <tr key={tarefa.id}>

                                            <td>{tarefa.titulo}</td>
                                            <td>{tarefa.descricao}</td>
                                            <td>{tarefa.materia}</td>
                                            <td>{tarefa.dataEntrega}</td>
                                            <td>{tarefa.prioridade}</td>

                                            <td>
                                                <span className="alunos-status">
                                                    {tarefa.status}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="alunos-acoes">

                                                    <button
                                                        className="alunos-botao-editar"
                                                        onClick={() => editarTarefa(tarefa.id)}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        className="alunos-botao-excluir"
                                                        onClick={() => excluirTarefa(tarefa.id)}
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

export default ConsultaTarefa