import React from 'react'
import { handleChange } from 'src/env/function'

const Text = (props) => {
    return (
        <fieldset>
            <legend>{props.label}</legend>
            <input className='form__input' type={props.type} placeholder='...' autoComplete='off' onChange={(event) => handleChange(event, props.handleChange)} />
        </fieldset>
    )
}

export default Text