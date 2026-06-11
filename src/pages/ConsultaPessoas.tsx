import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './Aluno.css'

function ConsultaPessoas() {

    const navigate = useNavigate()

    const [pessoas, setPessoas] = useState<any[]>([])

    useEffect(() => {
        buscarPessoas()
    }, [])

    async function buscarPessoas() {
        try {
            const response = await axios.get(
                'http://localhost:8080/pessoas'
            )
            setPessoas(response.data)
        } catch (error) {
            console.error("Erro ao buscar pessoas", error)
        }
    }

    async function excluirPessoa(id: number) {
        const confirmar = confirm('Deseja realmente excluir esta pessoa?')

        if (confirmar) {
            try {
                await axios.delete(
                    `http://localhost:8080/pessoas/${id}`
                )
                alert('Pessoa excluída com sucesso!')
                buscarPessoas()
            } catch (error) {
                console.error("Erro ao excluir pessoa", error)
                alert("Erro ao excluir a pessoa.")
            }
        }
    }

    function editarPessoa(id: number) {
        navigate(`/pessoas/editar/${id}`)
    }

    return (
        <div className="alunos-pagina">
            <div className="alunos-container">
                <div className="alunos-topo">
                    <div>
                        <h1>Consulta de Pessoas</h1>
                        <p>Visualize, edite ou exclua as pessoas cadastradas</p>
                    </div>

                    <div className="alunos-topo-botoes">
                        <button
                            className="alunos-botao-novo"
                            onClick={() => navigate('/pessoas/cadastro')}
                        >
                            Nova pessoa
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
                            <h2>Pessoas cadastrados</h2>
                            <p>Total de pessoas: {pessoas.length}</p>
                        </div>
                    </div>

                    <div className="alunos-tabela-container">
                        <table className="alunos-tabela">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CPF</th>
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
                                    pessoas.map((pessoa) => {
                                        // Acessa de forma segura a turma vinculada à tabela aluno
                                        const turmaVinculada = pessoa.aluno?.turma || 'Nenhum vínculo';
                                        return (
                                            <tr key={pessoa.id}>
                                                <td>{pessoa.nome}</td>
                                                <td>{pessoa.cpf}</td>
                                                <td>{pessoa.idade}</td>
                                                <td>{pessoa.email}</td>
                                                <td>{pessoa.telefone}</td>
                                                <td>{turmaVinculada}</td>
                                                <td>
                                                    <span className="alunos-status">
                                                        {pessoa.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="alunos-acoes">
                                                        <button
                                                            className="alunos-botao-editar"
                                                            onClick={() => editarPessoa(pessoa.id)}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            className="alunos-botao-excluir"
                                                            onClick={() => excluirPessoa(pessoa.id)}
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

export default ConsultaPessoas