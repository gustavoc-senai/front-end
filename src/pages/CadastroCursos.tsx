import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import './Aluno.css'

interface CursoResponse {
    nomeCurso?: string;
    nome?: string;
    instituicao: string;
    cargaHoraria: number;
    area?: string;
    nivel?: string;
    status: string;
}

function CadastroCursos() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [nomeCurso, setNomeCurso] = useState<string>('')
    const [instituicao, setInstituicao] = useState<string>('')
    const [cargaHoraria, setCargaHoraria] = useState<string>('')
    const [area, setArea] = useState<string>('')
    const [nivel, setNivel] = useState<string>('')
    const [status, setStatus] = useState<string>('Ativo')

    useEffect(() => {
        if (id) {
            buscarCursoPorId()
        }
    }, [id])

    async function buscarCursoPorId() {
        try {
            const response = await axios.get<CursoResponse>(
                `http://localhost:8080/cursos/${id}`
            )

            setNomeCurso(response.data.nomeCurso || response.data.nome || '')
            setInstituicao(response.data.instituicao)
            setCargaHoraria(String(response.data.cargaHoraria))
            setArea(response.data.area || '')
            setNivel(response.data.nivel || '')
            setStatus(response.data.status)
        } catch (error) {
            console.error("Erro ao buscar curso por ID", error)
        }
    }

    async function salvarCurso() {
        const curso = {
            nomeCurso: nomeCurso,
            instituicao: instituicao,
            cargaHoraria: Number(cargaHoraria),
            area: area,
            nivel: nivel,
            status: status
        }

        try {
            if (id) {
                await axios.put(
                    `http://localhost:8080/cursos/${id}`,
                    curso
                )
                alert('Curso updated com sucesso!')
            } else {
                await axios.post(
                    'http://localhost:8080/cursos',
                    curso
                )
                alert('Curso cadastrado com sucesso!')
            }

            navigate('/cursos/consulta')
        } catch (error) {
            console.error("Erro ao salvar curso", error)
            alert("Erro ao salvar o curso. Verifique os dados passados.")
        }
    }

    return (
        <div className="alunos-pagina">
            <div className="alunos-container">
                <div className="alunos-topo">
                    <div>
                        <h1>{id ? 'Editar Curso' : 'Cadastro de Cursos'}</h1>
                        <p>Preencha os dados do curso abaixo</p>
                    </div>
                    <button className="alunos-botao-voltar" onClick={() => navigate('/cursos/consulta')}>
                        Consultar cursos
                    </button>
                </div>

                <div className="alunos-form-card alunos-form-centralizado">
                    <h2>{id ? 'Alterar informações' : 'Novo curso'}</h2>

                    <div className="alunos-formulario">
                        <input type="text" placeholder="Nome do curso" value={nomeCurso} onChange={(e) => setNomeCurso(e.target.value)} />
                        <input type="number" placeholder="Carga horária" value={cargaHoraria} onChange={(e) => setCargaHoraria(e.target.value)} />
                        <input type="text" placeholder="Instituição" value={instituicao} onChange={(e) => setInstituicao(e.target.value)} />
                        <input type="text" placeholder="Área de estudo" value={area} onChange={(e) => setArea(e.target.value)} />
                        <input type="text" placeholder="Nível do curso" value={nivel} onChange={(e) => setNivel(e.target.value)} />

                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                            <option value="Transferido">Transferido</option>
                        </select>

                        <button className="alunos-botao-salvar" onClick={salvarCurso}>
                            {id ? 'Salvar alterações' : 'Cadastrar curso'}
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

export default CadastroCursos