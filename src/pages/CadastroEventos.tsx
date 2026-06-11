import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import './Aluno.css'

function CadastroEventos() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [nomeEvento, setNomeEvento] = useState('')
    const [descricao, setDescricao] = useState('')
    const [local, setLocal] = useState('')
    const [data, setData] = useState('')
    const [horario, setHorario] = useState('')
    const [tipo, setTipo] = useState('Ativo')

    useEffect(() => {
        if (id) {
            buscarEventoPorId()
        }
    }, [id])

    async function buscarEventoPorId() {
        const response = await axios.get(
            `http://localhost:8080/eventos/${id}`
        )

        setNomeEvento(response.data.nomeEvento)
        setDescricao(response.data.descricao)
        setLocal(response.data.local)
        setData(response.data.data)
        setHorario(response.data.horario)
        setTipo(response.data.tipo)
    }

    async function salvarEvento() {

        const evento     = {
            nomeEvento: nomeEvento,
            descricao: descricao,
            local: local,
            data: data,
            horario: horario,
            tipo: tipo
        }

        if (id) {
            await axios.put(
                `http://localhost:8080/eventos/${id}`,
                evento
            )

            alert('Evento atualizado com sucesso!')
        } else {
            await axios.post(
                'http://localhost:8080/eventos',
                evento
            )

            alert('Evento cadastrado com sucesso!')
        }

        navigate('/eventos/consulta')
    }

    return (
        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>
                        <h1>
                            {id ? 'Editar Evento' : 'Cadastro de Eventos'}
                        </h1>

                        <p>
                            Preencha os dados do evento abaixo
                        </p>
                    </div>

                    <button
                        className="alunos-botao-voltar"
                        onClick={() => navigate('/eventos/consulta')}
                    >
                        Consultar eventos
                    </button>

                </div>

                <div className="alunos-form-card alunos-form-centralizado">

                    <h2>
                        {id ? 'Alterar informações' : 'Novo evento'}
                    </h2>

                    <div className="alunos-formulario">

                        <input
                            type="text"
                            placeholder="Nome do evento"
                            value={nomeEvento}
                            onChange={(e) => setNomeEvento(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Descrição"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Local"
                            value={local}
                            onChange={(e) => setLocal(e.target.value)}
                        />

                        <input
                            type="date"
                            placeholder="Data"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />

                        <input
                            type="time"
                            placeholder="Horário"
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                        />

                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <option value="Profissional">Profissional</option>
                            <option value="Pessoal">Pessoal</option>
                            <option value="Acadêmico">Acadêmico</option>
                            <option value="Livre">Livre</option>
                            <option value="Outro">Outro</option>
                        </select>

                        <button
                            className="alunos-botao-salvar"
                            onClick={salvarEvento}
                        >
                            {id ? 'Salvar alterações' : 'Cadastrar evento'}
                        </button>

                        <button
                            className="alunos-botao-cancelar"
                            onClick={() => navigate('/logado')}
                        >
                            Voltar ao painel
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default CadastroEventos