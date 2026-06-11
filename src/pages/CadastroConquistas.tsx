import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import './Aluno.css'

function CadastroConquistas() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [dataConquista, setDataConquista] = useState('')
    const [categoria, setCategoria] = useState('')
    const [pontuacao, setPontuacao] = useState('')
    const [nivel, setNivel] = useState('Ativo')

    useEffect(() => {
        if (id) {
            buscarConquistaPorId()
        }
    }, [id])

    async function buscarConquistaPorId() {
        const response = await axios.get(
            `http://localhost:8080/conquistas/${id}`
        )

        setTitulo(response.data.titulo)
        setDescricao(response.data.descricao)
        setDataConquista(response.data.dataConquista)
        setCategoria(response.data.categoria)
        setPontuacao(String(response.data.pontuacao))
        setNivel(response.data.nivel)
    }

    async function salvarConquista() {

        const conquista = {
            titulo,
            descricao,
            dataConquista,
            categoria,
            pontuacao: Number(pontuacao),
            nivel
        }

        if (id) {
            await axios.put(
                `http://localhost:8080/conquistas/${id}`,
                conquista
            )

            alert('Conquista atualizada com sucesso!')
        } else {
            await axios.post(
                'http://localhost:8080/conquistas',
                conquista
            )

            alert('Conquista cadastrada com sucesso!')
        }

        navigate('/conquistas/consulta')
    }

    return (
        <div className="alunos-pagina">

            <div className="alunos-container">

                <div className="alunos-topo">

                    <div>
                        <h1>
                            {id ? 'Editar Conquista' : 'Cadastro de Conquista'}
                        </h1>

                        <p>
                            Preencha os dados da conquista abaixo
                        </p>
                    </div>

                    <button
                        className="alunos-botao-voltar"
                        onClick={() => navigate('/conquistas/consulta')}
                    >
                        Consultar conquistas
                    </button>

                </div>

                <div className="alunos-form-card alunos-form-centralizado">

                    <h2>
                        {id ? 'Alterar informações' : 'Nova conquista'}
                    </h2>

                    <div className="alunos-formulario">

                        <input
                            type="text"
                            placeholder="Título da conquista"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Descrição da conquista"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />

                        <input
                            type="date" 
                            placeholder="Data da conquista"
                            value={dataConquista}
                            onChange={(e) => setDataConquista(e.target.value)}
                        />

                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="Profissional">Profissional</option>
                            <option value="Acadêmica">Acadêmica</option>
                            <option value="Esportiva">Esportiva</option>
                            <option value="Pessoal">Pessoal</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Pontuação da conquista"
                            value={pontuacao}
                            onChange={(e) => setPontuacao(e.target.value)}
                        />

                        <select
                            value={nivel}
                            onChange={(e) => setNivel(e.target.value)}
                        >
                            <option value="Baixo">Baixo</option>
                            <option value="Médio">Médio</option>
                            <option value="Alto">Alto</option>
                        </select>

                        <button
                            className="alunos-botao-salvar"
                            onClick={salvarConquista}
                        >
                            {id ? 'Salvar alterações' : 'Cadastrar conquista'}
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

export default CadastroConquistas