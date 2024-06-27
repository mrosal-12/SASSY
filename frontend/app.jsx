import { useRef, useState } from 'preact/hooks'
import './app.css'

export function App() {
  const form = useRef()

  const [numValue, setNumValue] = useState(0)
  const [boolValue, setBoolValue] = useState(false)
  const [optValue, setOptValue] = useState('')

  function getFormData() {
    return { numValue, boolValue, optValue }
	}

  const onFormSubmit = (event) => {
    event.preventDefault()
    console.log('submit', getFormData())
  }

  return (
    <>
      <form ref={form} onSubmit={onFormSubmit}>
        <div class="field">
          <label for="numfield">Num field</label>
          <input type="number" name="numfield" value={numValue} onInput={(event) => setNumValue(event.currentTarget.value)} />
        </div>
        <div class="field">
          <input type="checkbox" name="boolfield" checked={boolValue} onClick={() => setBoolValue(!boolValue)} />
          <label for="boolfield">Check box</label>
        </div>
        <div class="field" onChange={(event) => setOptValue(event.target.value)} >
          <div class="option">
            <input type="radio" name="optfield" value="optA" checked={optValue === 'optA'} />
            <label for="optfield">Radio option A</label>
          </div>
          <div class="option">
            <input type="radio" name="optfield" value="optB" checked={optValue === 'optB'} />
            <label for="optfield">Radio option B</label>
          </div>
        </div>
        <input type="submit"/>
      </form>
      <hr/>
      <div id="debug">{JSON.stringify({ numValue, boolValue, optValue }, null, 2)}</div>
    </>
  )
}