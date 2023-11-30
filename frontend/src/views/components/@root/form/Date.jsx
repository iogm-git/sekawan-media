import React from 'react'
import { handleChange } from 'src/env/function'

const Date = (props) => {
    return (
        <fieldset>
            <legend>{props.label}</legend>
            <input type="date" onChange={(event) => handleChange(event, props.handleChange)} />
            {props.err && <div className='badge badge-danger'>{props.err}</div>}
        </fieldset>
    )
}

export default Date