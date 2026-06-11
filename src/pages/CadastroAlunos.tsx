import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import './Aluno.css'

// Definição das interfaces para o TypeScript
interface Curso {
    id: number;
    nomeCurso?: string;
    nome?: string;
}

interface Usuario {
    id?: number;
    login: string;
    senha?: string;
}

interface Pessoa {
    id?: number;
    nome: string;
    idade: number;
    email: string;
    telefone: string;
    status: string;
    usuario?: Usuario;
}

interface AlunoResponse {
    id?: number;
    turma: string;
    pessoa?: Pessoa;
    cursos?: Curso[];
}

function CadastroAlunos() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    // 1. Dados da entidade "Pessoa"
    const [nome, setNome] = useState<string>('')
    const [idade, setIdade] = useState<string>('')
    const [email, setEmail] = useState<string>('') 
    const [telefone, setTelefone] = useState<string>('')
    const [status, setStatus] = useState<string>('Ativo')

    // 2. Dados da entidade "Usuário"
    const [senha, setSenha] = useState<string>('')

    // 3. Dados da entidade "Aluno" & Relacionamentos
    const [turma, setTurma] = useState<string>('')
    const [cursosDisponiveis, setCursosDisponiveis] = useState<Curso[]>([]) 
    const [cursosSelecionados, setCursosSelecionados] = useState<number[]>([]) 

    useEffect(() => {
        buscarCursosDoBanco()
        if (id) {
            buscarAlunoPorId()
        }
    }, [id])

    async function buscarCursosDoBanco() {
        try {
            const response = await axios.get<Curso[]>('http://localhost:8080/cursos')
            setCursosDisponiveis(response.data)
        } catch (error) {
            console.error("Erro ao carregar cursos do banco", error)
        }
    }

    async function buscarAlunoPorId() {
        try {
            const response = await axios.get<AlunoResponse>(
                `http://localhost:8080/alunos/${id}`
            )

            const dadosAluno = response.data
            const dadosPessoa = dadosAluno.pessoa || {} as Pessoa
            const dadosUsuario = dadosPessoa.usuario || {} as Usuario

            setNome(dadosPessoa.nome || '')
            setIdade(String(dadosPessoa.idade || ''))
            setEmail(dadosPessoa.email || '')
            setTelefone(dadosPessoa.telefone || '')
            setStatus(dadosPessoa.status || 'Ativo')
            setTurma(dadosAluno.turma || '')
            setSenha(dadosUsuario.senha || '')

            const idsCursos = dadosAluno.cursos?.map(curso => curso.id) || []
            setCursosSelecionados(idsCursos)
        } catch (error) {
            console.error("Erro ao buscar aluno", error)
        }
    }
    
    const handleSelectCursos = (e: any) => {
        const options = e.target.options;
        const valores: number[] = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                valores.push(Number(options[i].value));
            }
        }
        setCursosSelecionados(valores);
    };

    async function salvarAluno() {
        const payloadAlunoCompleto = {
            turma,
            cursos: cursosSelecionados.map(idCurso => ({ id: idCurso })),
            pessoa: {
                nome,
                idade: Number(idade),
                email,
                telefone,
                status,
                usuario: {
                    login: email, 
                    senha: senha
                }
            }
        }

        try {
            if (id) {
                await axios.put(
                    `http://localhost:8080/alunos/${id}`,
                    payloadAlunoCompleto
                )
                alert('Aluno e dados de acesso atualizados com sucesso!')
            } else {
                await axios.post(
                    'http://localhost:8080/alunos',
                    payloadAlunoCompleto
                )
                alert('Aluno cadastrado com sucesso!');
            }

            navigate('/alunos/consulta')
        } catch (error) {
            console.error("Erro ao salvar dados do aluno", error)
            alert("Erro ao salvar! Verifique as propriedades ou o console.")
        }
    }

    return (
        <div className="alunos-pagina">
            <div className="alunos-container">
                <div className="alunos-topo">
                    <div>
                        <h1>{id ? 'Editar Aluno' : 'Cadastro de Aluno'}</h1>
                        <p>Conceito de Pessoa_id aplicado ao Usuário e Aluno</p>
                    </div>
                    <button className="alunos-botao-voltar" onClick={() => navigate('/alunos/consulta')}>
                        Consultar alunos
                    </button>
                </div>

                <div className="alunos-form-card alunos-form-centralizado">
                    <h2>{id ? 'Alterar informações' : 'Novo aluno'}</h2>

                    <div className="alunos-formulario">
                        <div style={{ textAlign: 'left', width: '100%', fontWeight: 'bold', color: '#444', marginBottom: '5px' }}>Dados Pessoais (Pessoa):</div>
                        <input type="text" placeholder="Nome do aluno" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input type="number" placeholder="Idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
                        <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                            <option value="Transferido">Transferido</option>
                        </select>

                        <div style={{ textAlign: 'left', width: '100%', fontWeight: 'bold', color: '#444', marginTop: '15px', marginBottom: '5px' }}>Credenciais de Acesso (Usuário):</div>
                        <input type="email" placeholder="Email (Será o Login)" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Defina a senha de acesso" value={senha} onChange={(e) => setSenha(e.target.value)} />

                        <div style={{ textAlign: 'left', width: '100%', fontWeight: 'bold', color: '#444', marginTop: '15px', marginBottom: '5px' }}>Matrícula Escolar & Cursos:</div>
                        <input type="text" placeholder="Turma" value={turma} onChange={(e) => setTurma(e.target.value)} />
                        
                        <label style={{ fontSize: '12px', color: '#777', display: 'block', textAlign: 'left', width: '100%' }}>
                            Selecione os Cursos (Segure Ctrl ou Cmd para escolher mais de um):
                        </label>
                        <select 
                            multiple 
                            value={cursosSelecionados.map(String)} 
                            onChange={handleSelectCursos}
                            style={{ height: '90px', padding: '5px' }}
                        >
                            {cursosDisponiveis.map(curso => (
                                <option key={curso.id} value={curso.id}>
                                    {curso.nomeCurso || curso.nome}
                                </option>
                            ))}
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