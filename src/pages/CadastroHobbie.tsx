import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import './Aluno.css'

function CadastroHobbie() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [nomeHobbie, setNomeHobbie] = useState('')
    const [categoria, setCategoria] = useState('Gamer')
    const [plataforma, setPlataforma] = useState('')
    const [tempoSemanal, setTempoSemanal] = useState('')
    const [nivelHabilidade, setNivelHabilidade] = useState('Médio')
    const [status, setStatus] = useState('Amo')

    useEffect(() => {
        if (id) {
            buscarHobbiePorId()
        }
    }, [id])

    async function buscarHobbiePorId() {

        const response = await axios.get(
            `http://localhost:8080/hobbies/${id}`
        )

        setNomeHobbie(response.data.nomeHobbie)
        setCategoria(response.data.categoria)
        setPlataforma(response.data.plataforma)
        setTempoSemanal(response.data.tempoSemanal)
        setNivelHabilidade(response.data.nivelHabilidade)
        setStatus(response.data.status)
    }

    async function salvarHobbie() {

        const hobbie = {
            nomeHobbie: nomeHobbie,
            categoria: categoria,
            plataforma: plataforma,
            tempoSemanal: Number(tempoSemanal),
            nivelHabilidade: nivelHabilidade,
            status: status
        }

        if (id) {

            await axios.put(
                `http://localhost:8080/hobbies/${id}`,
                hobbie
            )

            alert('Hobbie atualizado com sucesso!')

        } else {

            await axios.post(
                'http://localhost:8080/hobbies',
                hobbie
            )

            alert('Hobbie cadastrado com sucesso!')
        }

        navigate('/hobbies/consulta')
    }

    return (

        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>

                        <h1>
                            {id ? 'Editar Hobbie' : 'Cadastro de Hobbies'}
                        </h1>

                        <p>
                            Preencha os dados do hobbie abaixo
                        </p>

                    </div>

                    <button
                        className="alunos-botao-voltar"
                        onClick={() => navigate('/hobbies/consulta')}
                    >
                        Consultar hobbies
                    </button>

                </div>

                <div className="alunos-form-card alunos-form-centralizado">

                    <h2>
                        {id ? 'Alterar informações' : 'Novo hobbie'}
                    </h2>

                    <div className="alunos-formulario">

                        <input
                            type="text"
                            placeholder="Nome do hobbie"
                            value={nomeHobbie}
                            onChange={(e) => setNomeHobbie(e.target.value)}
                        />

                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="Gamer">Gamer</option>
                            <option value="Esporte">Esporte</option>
                            <option value="Música">Música</option>
                            <option value="Leitura">Leitura</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Plataforma"
                            value={plataforma}
                            onChange={(e) => setPlataforma(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Tempo semanal (horas)"
                            value={tempoSemanal}
                            onChange={(e) => setTempoSemanal(e.target.value)}
                        />

                        <select
                            value={nivelHabilidade}
                            onChange={(e) => setNivelHabilidade(e.target.value)}
                        >
                            <option value="Alto">Alto</option>
                            <option value="Médio">Médio</option>
                            <option value="Baixo">Baixo</option>
                        </select>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Amo">Amo</option>
                            <option value="Gosto">Gosto</option>
                            <option value="Já Parei">Já Parei</option>
                        </select>

                        <button
                            className="alunos-botao-salvar"
                            onClick={salvarHobbie}
                        >
                            {id ? 'Salvar alterações' : 'Cadastrar hobbie'}
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

export default CadastroHobbie