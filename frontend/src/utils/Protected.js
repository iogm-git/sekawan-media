import { useEffect, useState } from 'react'
import useAuthContext from 'src/context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Protected = ({ type, qualify = false, children }) => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    function check() {
        if (type == 'route') {
            if (user == null) {
                setShow(true)
                navigate('/')
            } else {
                if (qualify) {
                    user && user.username == 'admin' ? navigate('/admin') : navigate('/approver')
                }
                setShow(true)
            }
        } else {
            if (user == null) {
                qualify ? setShow(false) : setShow(true)
            } else {
                qualify ? setShow(true) : setShow(false)
            }
        }
    }

    useEffect(() => {
        check()
    }, [user])
    return (show ? children : null)
}

export default Protected