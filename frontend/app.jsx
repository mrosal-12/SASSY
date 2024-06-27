import { useState } from 'preact/hooks'
import './app.css'

import { Timer } from './components/timer.jsx'


export function App() {
  const [numValue, setNumValue] = useState(0)
  const [textValue, setTextValue] = useState('')
  const [boolValue, setBoolValue] = useState(false)
  const [optValue, setOptValue] = useState('')
  const [timerValues, setTimerValues] = useState([])

  function getFormData() {
    return { numValue, boolValue, optValue }
	}

  const onFormSubmit = (event) => {
    event.preventDefault()
    console.log('submit', getFormData())
  }

  return (
    <>
      <div class="field">
        <label for="numfield">Num field</label>
        <input type="number" name="numfield" id="numfield" value={numValue} onInput={(event) => setNumValue(event.currentTarget.value)} />
      </div>
      <div class="field">
        <label for="textfield">Text field</label>
        <input type="text" name="textfield" id="textfield" value={textValue} onInput={(event) => setTextValue(event.currentTarget.value)} />
      </div>
      <div class="field">
        <input type="checkbox" name="boolfield" id="boolfield" checked={boolValue} onClick={() => setBoolValue((value) => !value)} />
        <label for="boolfield">Check box</label>
      </div>
      <div class="field" onChange={(event) => setOptValue(event.target.value)}>
        <div class="option">
          <input type="radio" name="optfield" value="Option A" checked={optValue === 'Option A'} />
          <label for="optfield">Option A</label>
        </div>
        <div class="option">
          <input type="radio" name="optfield" value="Option B" checked={optValue === 'Option B'} />
          <label for="optfield">Option B</label>
        </div>
      </div>
      <div class="field">
        <Timer values={timerValues} setValues={setTimerValues} />
      </div>
      <input type="submit" onClick={onFormSubmit}/>
      <hr/>
      <pre>{JSON.stringify({ numValue, textValue, boolValue, optValue, timerValues }, null, 2)}</pre>
    </>
  )
}