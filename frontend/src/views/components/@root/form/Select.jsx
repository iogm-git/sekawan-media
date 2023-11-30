import React, { useState } from 'react'
import 'src/views/components/@root/svg/Icon'

import Icon from 'src/views/components/@root/svg/Icon'

const Select = (props) => {
  const [value, setValue] = useState({ option: null, label: '-- Pilih --' })
  const [show, setShow] = useState(false)

  function handleOption(option, label) {
    setValue({ option: option, label: label })
    setShow(false)
    props.handleChange(option)
  }

  function showOption() {
    setShow(current => !current)
  }

  return (
    <fieldset>
      <legend>{props.label}</legend>
      <div className="select-form">
        <div className='select-ed' onClick={showOption}><p>{value.label}</p> <Icon style={show ? 'svg-small fill-black active' : 'svg-small fill-black'} icon='right-arrow' /></div>
        {show &&
          <div className="select-option">
            {props.select.map((item, index) => (
              <div className="select-value" key={index} onClick={() => handleOption(Object.values(item)[0], Object.values(item)[1])}>
                {Object.values(item).splice(1).map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            ))}
          </div>}
      </div>
      {props.err && <div className='badge badge-danger'>{props.err}</div>}
    </fieldset >
  )
}

export default Select