import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './Aluno.css'

function ConsultaConquistas() {

    const navigate = useNavigate()

    const [conquistas, setConquistas] = useState<any[]>([])

    useEffect(() => {
        buscarConquistas()
    }, [])

    async function buscarConquistas() {
        const response = await axios.get(
            'http://localhost:8080/conquistas'
        )

        setConquistas(response.data)
    }

    async function excluirConquista(id: number) {

        const confirmar = confirm('Deseja realmente excluir esta conquista?')

        if (confirmar) {
            await axios.delete(
                `http://localhost:8080/conquistas/${id}`
            )

            alert('Conquista excluída com sucesso!')

            buscarConquistas()
        }
    }

    function editarConquista(id: number) {
        navigate(`/conquistas/editar/${id}`)
    }

    return (
        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>
                        <h1>Consulta de Conquistas</h1>

                        <p>
                            Visualize, edite ou exclua as conquistas cadastradas
                        </p>
                    </div>

                    <div className="alunos-topo-botoes">

                        <button
                            className="alunos-botao-novo"
                            onClick={() => navigate('/conquistas/cadastro')}
                        >
                            Nova conquista
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
                            <h2>Conquistas cadastradas</h2>

                            <p>
                                Total de conquistas: {conquistas.length}
                            </p>
                        </div>

                    </div>

                    <div className="alunos-tabela-container">

                        <table className="alunos-tabela">

                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Descrição</th>
                                    <th>Data da Conquista</th>
                                    <th>Categoria</th>
                                    <th>Pontuação</th>
                                    <th>Nível</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    conquistas.map((conquista) => (

                                        <tr key={conquista.id}>

                                            <td>{conquista.titulo}</td>
                                            <td>{conquista.descricao}</td>
                                            <td>{conquista.dataConquista}</td>
                                            <td>{conquista.categoria}</td>
                                            <td>{conquista.pontuacao}</td>
                                            <td>{conquista.nivel}</td>

                                            <td>
                                                <span className="alunos-status">
                                                    {conquista.nivel}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="alunos-acoes">

                                                    <button
                                                        className="alunos-botao-editar"
                                                        onClick={() => editarConquista(conquista.id)}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        className="alunos-botao-excluir"
                                                        onClick={() => excluirConquista(conquista.id)}
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

export default ConsultaConquistas