import React, { useState } from 'react'

// assets
import 'src/assets/css/@root/form.css'
import './Login.css'

// context
import useAuthContext from '/src/context/AuthContext'

// components
import Text from 'src/views/components/@root/form/Text'

const Login = () => {
    const { Login, errors } = useAuthContext()
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    function handleLogin(e) {
        e.preventDefault()
        Login({ username: username, password: password })
    }

    return (
        <main className='main__login'>
            <section className='section__login'>
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    {errors.error && <div className='badge badge-danger'>{errors.error}</div>}
                    <Text label='Username' type='text' handleChange={(event) => setUsername(event)} />
                    {errors.username && <div className='badge badge-danger'>required</div>}
                    <Text label='Password' type='password' handleChange={(event) => setPassword(event)} />
                    {errors.password && <div className='badge badge-danger'>required</div>}
                    <button className='button' type='submit'>submit</button>
                </form>
            </section>
        </main>
    )
}

export default Login