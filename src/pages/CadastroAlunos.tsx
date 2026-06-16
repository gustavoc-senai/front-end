import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import './Aluno.css'

interface AlunoResponse {
    id?: number;
    nome: string;
    idade: number;
    email: string;
    telefone: string;
    turma: string;
    status: string;
}

function CadastroAlunos() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [nome, setNome] = useState<string>('')
    const [idade, setIdade] = useState<string>('')
    const [email, setEmail] = useState<string>('') 
    const [telefone, setTelefone] = useState<string>('')
    const [status, setStatus] = useState<string>('Ativo')
    const [turma, setTurma] = useState<string>('')

    useEffect(() => {
        if (id) {
            buscarAlunoPorId()
        }
    }, [id])

    async function buscarAlunoPorId() {
        try {
            const response = await axios.get<AlunoResponse>(
                `http://localhost:8080/alunos/${id}`
            )

            const dadosAluno = response.data


            setNome(dadosAluno.nome || '')
            setIdade(String(dadosAluno.idade || ''))
            setEmail(dadosAluno.email || '')
            setTelefone(dadosAluno.telefone || '')
            setStatus(dadosAluno.status || 'Ativo')
            setTurma(dadosAluno.turma || '')
        } catch (error) {
            console.error("Erro ao buscar aluno", error)
        }
    }

    async function salvarAluno() {
        
        const payloadAluno = {
            nome,
            idade: Number(idade),
            email,
            telefone,
            turma,
            status
        }

        try {
            if (id) {
                await axios.put(
                    `http://localhost:8080/alunos/${id}`,
                    payloadAluno
                )
                alert('Aluno atualizado com sucesso!')
            } else {
                await axios.post(
                    'http://localhost:8080/alunos',
                    payloadAluno
                )
                alert('Aluno cadastrado com sucesso!');
            }

            navigate('/alunos/consulta')
        } catch (error) {
            console.error("Erro ao salvar dados do aluno", error)
            alert("Erro ao salvar! Verifique o console.")
        }
    }

    return (
        <div className="alunos-pagina">
            <div className="alunos-container">
                <div className="alunos-topo">
                    <div>
                        <h1>{id ? 'Editar Aluno' : 'Cadastro de Aluno'}</h1>
                        <p>Interface conectada diretamente ao Spring Boot</p>
                    </div>
                    <button className="alunos-botao-voltar" onClick={() => navigate('/alunos/consulta')}>
                        Consultar alunos
                    </button>
                </div>

                <div className="alunos-form-card alunos-form-centralizado">
                    <h2>{id ? 'Alterar informações' : 'Novo aluno'}</h2>

                    <div className="alunos-formulario">
                        <div style={{ textAlign: 'left', width: '100%', fontWeight: 'bold', color: '#444', marginBottom: '5px' }}>Dados do Aluno:</div>
                        
                        <input type="text" placeholder="Nome do aluno" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input type="number" placeholder="Idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        <input type="text" placeholder="Turma" value={turma} onChange={(e) => setTurma(e.target.value)} />
                        
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                            <option value="Transferido">Transferido</option>
                        </select>

                        <button className="alunos-botao-salvar" onClick={salvarAluno}>
                            {id ? 'Salvar alterações' : 'Cadastrar aluno'}
                        </button>

                        <button className="alunos-botao-cancelar" onClick={() => navigate('/logado')}>
                            Voltar ao painel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastroAlunos
