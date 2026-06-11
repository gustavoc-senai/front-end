import { useState } from 'react'
import axios from 'axios'
import {
    Link,
    useNavigate
} from 'react-router-dom'

import './Login.css'

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function login() {

        const usuario = {
            email,
            senha
        }

        const response = await axios.post(
            'http://localhost:8080/usuario/login',
            usuario
        )

        alert(response.data)

        if (response.data === 'Login realizado') {
            navigate('/logado')
        }
    }

    return (

        <div className="login-pagina">

            <div className="login-card">

                <h1>
                    Bem-vindo - Alunos
                </h1>

                <p>
                    Faça login para continuar
                </p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <button onClick={login}>
                    Entrar
                </button>

                <Link to="/cadastro">
                    Criar conta
                </Link>

            </div>

        </div>
    )
}

export default Login