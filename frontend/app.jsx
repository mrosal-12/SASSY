import { useState } from 'preact/hooks'
import './app.css'
import QRCode from 'react-qr-code'

import NumField from './components/numfield.jsx'
import TextField from './components/textfield.jsx'
import Checkbox from './components/checkbox.jsx'
import Radio from './components/radio.jsx'
import Timer from './components/timer.jsx'


export default function App() {
  const [numValue, setNumValue] = useState(0)
  const [textValue, setTextValue] = useState('')
  const [boolValue, setBoolValue] = useState(false)
  const [optValue, setOptValue] = useState('')
  const [timerValues, setTimerValues] = useState([])
  const [back, setBack] = useState('#FFFFFF')
  const [fore, setFore] = useState('#000000')
  const [size, setSize] = useState('256')

  function getFormData() {
    return { numValue, textValue, boolValue, optValue, timerValues }
	}

  const onSubmit = (event) => {
    event.preventDefault()
    console.log('submit', getFormData())
  }

  const onReset = () => {
    setNumValue(0)
    setTextValue('')
    setBoolValue(false)
    setOptValue('')
    setTimerValues([])
  }

  return (
    <>
      <NumField label="Num field" value={numValue} setValue={setNumValue} />
      <TextField label="Text field" value={textValue} setValue={setTextValue} />
      <Checkbox label="Check box" value={boolValue} setValue={setBoolValue} />
      <Radio options={['Option A', 'Option B']} value={optValue} setValue={setOptValue} />
      <Timer values={timerValues} setValues={setTimerValues} />
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onReset}>Reset</button>
      <hr/>
      <QRCode
	      title = "QRCode"
	      value = {JSON.stringify(getFormData(), null, 2)}
	      bgColor = {back}
	      fgColor = {fore}
	      size = {size === '' ?? 0 : size}
	/>
      <pre>{JSON.stringify(getFormData(), null, 2)}</pre>
    </>
  )
}
