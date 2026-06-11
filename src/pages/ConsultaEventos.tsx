import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './Aluno.css'

function ConsultaEventos() {

    const navigate = useNavigate()

    const [eventos, setEventos] = useState<any[]>([])

    useEffect(() => {
        buscarEventos()
    }, [])

    async function buscarEventos() {
        const response = await axios.get(
            'http://localhost:8080/eventos'
        )

        setEventos(response.data)
    }

    async function excluirEvento(id: number) {

        const confirmar = confirm('Deseja realmente excluir este evento?')

        if (confirmar) {
            await axios.delete(
                `http://localhost:8080/eventos/${id}`
            )

            alert('Evento excluído com sucesso!')

            buscarEventos()
        }
    }

    function editarEvento(id: number) {
        navigate(`/eventos/editar/${id}`)
    }

    return (
        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>
                        <h1>Consulta de Eventos</h1>

                        <p>
                            Visualize, edite ou exclua os eventos cadastrados
                        </p>
                    </div>

                    <div className="alunos-topo-botoes">

                        <button
                            className="alunos-botao-novo"
                            onClick={() => navigate('/eventos/cadastro')}
                        >
                            Novo evento
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
                            <h2>Eventos cadastrados</h2>

                            <p>
                                Total de eventos: {eventos.length}
                            </p>
                        </div>

                    </div>

                    <div className="alunos-tabela-container">

                        <table className="alunos-tabela">

                            <thead>
                                <tr>
                                    <th>Nome do Evento</th>
                                    <th>Descrição</th>
                                    <th>Local</th>
                                    <th>Data</th>
                                    <th>Horário</th>
                                    <th>Tipo</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    eventos.map((evento) => (

                                        <tr key={evento.id}>

                                            <td>{evento.nomeEvento}</td>
                                            <td>{evento.descricao}</td>
                                            <td>{evento.local}</td>
                                            <td>{evento.data}</td>
                                            <td>{evento.horario}</td>
                                            <td>{evento.tipo}</td>

                                            <td>
                                                <div className="alunos-acoes">

                                                    <button
                                                        className="alunos-botao-editar"
                                                        onClick={() => editarEvento(evento.id)}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        className="alunos-botao-excluir"
                                                        onClick={() => excluirEvento(evento.id)}
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

export default ConsultaEventos