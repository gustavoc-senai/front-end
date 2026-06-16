import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './Aluno.css'

// 1. Criada a interface para mapear os dados exatamente como vêm do Java
interface Aluno {
    id: number;
    nome: string;
    idade: number;
    email: string;
    telefone: string;
    turma: string;
    status: string;
}

function ConsultaAlunos() {

    const navigate = useNavigate()

    // 2. Estado tipado corretamente com a nossa interface para o TypeScript não reclamar
    const [alunos, setAlunos] = useState<Aluno[]>([])

    useEffect(() => {
        buscarAlunos()
    }, [])

    async function buscarAlunos() {
        try {
            const response = await axios.get<Aluno[]>(
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
                                        // 3. Removida a lógica antiga de "const pessoa = ...". 
                                        // Agora lemos as propriedades direto do 'aluno', combinando com seu Spring Boot.
                                        return (
                                            <tr key={aluno.id}>
                                                <td>{aluno.nome || ''}</td>
                                                <td>{aluno.idade || '-'}</td>
                                                <td>{aluno.email || '-'}</td>
                                                <td>{aluno.telefone || '-'}</td>
                                                <td>{aluno.turma || '-'}</td>
                                                <td>
                                                    <span className="alunos-status">
                                                        {aluno.status || 'Ativo'}
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
