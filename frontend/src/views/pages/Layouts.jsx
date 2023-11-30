import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// context
import useAuthContext from '/src/context/AuthContext'

const Layouts = ({ children }) => {
    const location = useLocation()
    const { Logout } = useAuthContext()

    return (
        <>
            <header>
                <p>Applikasi</p>
                <nav>
                    {location.pathname == '/admin' || location.pathname == '/input' ?
                        <>
                            <Link to='/admin' className={location.pathname == '/admin' ? 'active' : null}>Home</Link>
                            <Link to='/input' className={location.pathname == '/input' ? 'active' : null}>Input</Link>
                            <a onClick={Logout}>Logout</a>
                        </> :
                        <a onClick={Logout}>Logout</a>
                    }
                </nav>
            </header>

            <main>
                {children}
            </main>

            <footer>
                <p>All Rights Reservered . &copy; <a href="https://iogm.website">Ilham Rahmat Akbar</a> 2023.</p>
            </footer>
        </>
    )
}

export default Layouts