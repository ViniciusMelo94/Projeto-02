import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'
import { useForm } from 'react-hook-form'
import './signin.css'

export function LoginPage() {
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    async function onSubmit(data) {
        if (!data.password) {
            alert('Senha é obrigatória');
            return;
        }
        try {
            const isSuccess = await signIn(data)
            if (isSuccess) {
                console.log('login efetuado')
                navigate('/dashboard')

            } else {
                alert('Email/senha inválidos')
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <main className="container">
            <div className="formSignin">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="h3 mb-3 fw-normal"> Login</h1>
                    <div className="form-floating">
                        <label htmlFor="floatingInput">Email </label>
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Esse campo é obrigatório"
                                },
                               
                            })}
                        />
                    </div>
                    <div className="form-floating">
                        <label htmlFor="floatingPassword">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            {...register("password")}
                        />
                    </div>
                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Entrar</button>
                    <p>
                        Não possui cadastro? <Link to="/cadastrar">Cadastra-se</Link>
                    </p>
                </form>
            </div>
        </main>
    );
}