import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import './Aluno.css'

interface PessoaResponse {
    nome: string;
    cpf: string;
    idade: number;
    email: string;
    telefone: string;
    status: string;
    usuario?: { senha?: string };
    aluno?: { turma?: string };
}

function CadastroPessoas() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [nome, setNome] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [idade, setIdade] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [telefone, setTelefone] = useState<string>('')
    const [status, setStatus] = useState<string>('Ativo')
    
    const [senha, setSenha] = useState<string>('') 
    const [turma, setTurma] = useState<string>('')

    useEffect(() => {
        if (id) {
            buscarPessoaPorId()
        }
    }, [id])

    async function buscarPessoaPorId() {
        try {
            const response = await axios.get<PessoaResponse>(
                `http://localhost:8080/pessoas/${id}`
            )

            setNome(response.data.nome)
            setCpf(response.data.cpf)
            setIdade(String(response.data.idade))
            setEmail(response.data.email)
            setTelefone(response.data.telefone)
            setStatus(response.data.status)
            
            if (response.data.usuario) setSenha(response.data.usuario.senha || '')
            if (response.data.aluno) setTurma(response.data.aluno.turma || '')
        } catch (error) {
            console.error("Erro ao buscar pessoa", error)
        }
    }

    async function salvarPessoa() {
        const pessoaCompleto = {
            nome,
            cpf,
            id: id ? Number(id) : undefined,
            idade: Number(idade),
            email,
            telefone,
            status,
            usuario: {
                login: email,
                senha: senha
            },
            aluno: {
                turma: turma
            }
        }

        try {
            if (id) {
                await axios.put(
                    `http://localhost:8080/pessoas/${id}`,
                    pessoaCompleto
                )
                alert('Pessoa atualizada!')
            } else {
                await axios.post(
                    'http://localhost:8080/pessoas',
                    pessoaCompleto
                )
                alert('Pessoa cadastrada!')
            }

            navigate('/pessoas/consulta')
        } catch (error) {
            console.error("Erro ao salvar pessoa", error)
            alert("Erro ao salvar. Verifique a integração com o Back.")
        }
    }

    return (
        <div className="alunos-pagina">
            <div className="alunos-container">
                <div className="alunos-topo">
                    <div>
                        <h1>{id ? 'Editar Aluno' : 'Cadastro de Aluno'}</h1>
                        <p>Preencha os dados da pessoa abaixo</p>
                    </div>
                    <button className="alunos-botao-voltar" onClick={() => navigate('/pessoas/consulta')}>
                        Consultar pessoas
                    </button>
                </div>

                <div className="alunos-form-card alunos-form-centralizado">
                    <h2>{id ? 'Alterar informações' : 'Nova pessoa'}</h2>

                    <div className="alunos-formulario">
                        <input type="text" placeholder="Nome da pessoa" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input type="number" placeholder="Idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
                        <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                        <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        <input type="email" placeholder="Email (Será o Login)" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Senha de Acesso" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        <input type="text" placeholder="Turma do Aluno" value={turma} onChange={(e) => setTurma(e.target.value)} />

                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                            <option value="Bloqueado">Bloqueado</option>
                        </select>
                            
                        <button className="alunos-botao-salvar" onClick={salvarPessoa}>
                            {id ? 'Salvar alterações' : 'Cadastrar pessoa'}
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

export default CadastroPessoas
