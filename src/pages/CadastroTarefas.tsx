import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import './Aluno.css'

function CadastroTarefa() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [materia, setMateria] = useState('')
    const [dataEntrega, setDataEntrega] = useState('')
    const [prioridade, setPrioridade] = useState('Baixa')
    const [status, setStatus] = useState('Realizado')

    useEffect(() => {
        if (id) {
            buscarTarefaPorId()
        }
    }, [id])

    async function buscarTarefaPorId() {
        const response = await axios.get(
            `http://localhost:8080/tarefas/${id}`
        )

        setTitulo(response.data.titulo)
        setDescricao(response.data.descricao)
        setMateria(response.data.materia)
        setDataEntrega(response.data.dataEntrega)
        setPrioridade(response.data.prioridade)
        setStatus(response.data.status)
    }

    async function salvarTarefa() {

        const tarefa = {
            titulo,
            descricao,
            materia,
            dataEntrega,
            prioridade,
            status
        }
        if (id) {
            await axios.put(
                `http://localhost:8080/tarefas/${id}`,
                tarefa
            )

            alert('Tarefa atualizada com sucesso!')
        } else {
            await axios.post(
                'http://localhost:8080/tarefas',
                tarefa
            )

            alert('Tarefa cadastrada com sucesso!')
        }

        navigate('/tarefas/consulta')
    }

    return (
        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>
                        <h1>
                            {id ? 'Editar Tarefa' : 'Cadastro de Tarefa'}
                        </h1>

                        <p>
                            Preencha os dados da tarefa abaixo
                        </p>
                    </div>

                    <button
                        className="alunos-botao-voltar"
                        onClick={() => navigate('/tarefas/consulta')}
                    >
                        Consultar tarefas
                    </button>

                </div>

                <div className="alunos-form-card alunos-form-centralizado">

                    <h2>
                        {id ? 'Alterar informações' : 'Nova tarefa'}
                    </h2>

                    <div className="alunos-formulario">

                        <input
                            type="text"
                            placeholder="Título da tarefa"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Descrição da tarefa"
                            value={descricao}
                            onChange={(e) => setDescricao (e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Materia"
                            value={materia}
                            onChange={(e) => setMateria(e.target.value)}
                        />

                        <input
                            type="date"
                            placeholder="Data de entrega"
                            value={dataEntrega}
                            onChange={(e) => setDataEntrega(e.target.value)}
                        />

                        <select
                            value={prioridade}
                            onChange={(e) => setPrioridade(e.target.value)}
                        >
                            <option value="Baixa">Baixa</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
                        </select>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Realizado">Realizado</option>
                            <option value="Incompleto">Incompleto</option>
                            <option value="Não Realizado">Não Realizado</option>
                        </select>

                        <button
                            className="alunos-botao-salvar"
                            onClick={salvarTarefa}
                        >
                            {id ? 'Salvar alterações' : 'Cadastrar tarefa'}
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

export default CadastroTarefa