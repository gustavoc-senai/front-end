import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './Aluno.css'

function ConsultaHobbie() {

    const navigate = useNavigate()

    const [hobbies, setHobbies] = useState<any[]>([])

    useEffect(() => {
        buscarHobbies()
    }, [])

    async function buscarHobbies() {

        const response = await axios.get(
            'http://localhost:8080/hobbies'
        )

        setHobbies(response.data)
    }

    async function excluirHobbie(id: number) {

        const confirmar = confirm(
            'Deseja realmente excluir este hobbie?'
        )

        if (confirmar) {

            await axios.delete(
                `http://localhost:8080/hobbies/${id}`
            )

            alert('Hobbie excluído com sucesso!')

            buscarHobbies()
        }
    }

    function editarHobbie(id: number) {
        navigate(`/hobbies/editar/${id}`)
    }

    return (

        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>

                        <h1>Consulta de Hobbies</h1>

                        <p>
                            Visualize, edite ou exclua os hobbies cadastrados
                        </p>

                    </div>

                    <div className="alunos-topo-botoes">

                        <button
                            className="alunos-botao-novo"
                            onClick={() => navigate('/hobbies/cadastro')}
                        >
                            Novo hobbie
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

                            <h2>Hobbies cadastrados</h2>

                            <p>
                                Total de hobbies: {hobbies.length}
                            </p>

                        </div>

                    </div>

                    <div className="alunos-tabela-container">

                        <table className="alunos-tabela">

                            <thead>

                                <tr>
                                    <th>Nome do Hobbie</th>
                                    <th>Categoria</th>
                                    <th>Plataforma</th>
                                    <th>Tempo Semanal</th>
                                    <th>Nível de Habilidade</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    hobbies.map((hobbie) => (

                                        <tr key={hobbie.id}>

                                            <td>{hobbie.nomeHobbie}</td>
                                            <td>{hobbie.categoria}</td>
                                            <td>{hobbie.plataforma}</td>
                                            <td>{hobbie.tempoSemanal}</td>
                                            <td>{hobbie.nivelHabilidade}</td>

                                            <td>
                                                <span className="alunos-status">
                                                    {hobbie.status}
                                                </span>
                                            </td>

                                            <td>

                                                <div className="alunos-acoes">

                                                    <button
                                                        className="alunos-botao-editar"
                                                        onClick={() => editarHobbie(hobbie.id)}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        className="alunos-botao-excluir"
                                                        onClick={() => excluirHobbie(hobbie.id)}
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

export default ConsultaHobbie