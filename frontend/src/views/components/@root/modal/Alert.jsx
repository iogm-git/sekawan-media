import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'src/assets/css/@root/modal.css'

const Alert = (props) => {
    const navigate = useNavigate()

    function movePage() {
        navigate(`/${props.link}`)
        props.modalClose()
    }

    return (
        <div className="modal">
            <div className="modal__box content-wrapper">
                <div className="modal__close badge-danger" onClick={props.modalClose}>&times;</div>
                <div className="modal__msg">
                    <p>{props.msg}</p>
                </div>
                <div className="modal__button">
                    <div className="button" onClick={movePage}>Ke halaman {props.link}</div>
                    <div className="button" onClick={props.modalClose}>Close</div>
                </div>
            </div>
        </div>
    )
}

export default Alert