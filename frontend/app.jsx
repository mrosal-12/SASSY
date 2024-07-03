import { createRef } from 'preact'
import { useState } from 'preact/hooks'
import './app.css'

import NumField from './components/numfield.jsx'
import TextField from './components/textfield.jsx'
import Checkbox from './components/checkbox.jsx'
import Radio from './components/radio.jsx'
import Timer from './components/timer.jsx'


import config from './config.json'

function defaultValue(input) {
  switch (input) {
    case 'number':
      return 0
    case 'checkbox':
      return false
    case 'timer':
      return []
    case 'text':
    case 'radio':
    default:
      return ''
  }
}


export default function App() {

  const defaultData = {}
  for (const field of config.fields) {
    defaultData[field.name] = field.default ?? defaultValue(field.input)
  }

  const [userData, setUserData] = useState(defaultData)


  const refs = {}
  const resetHandlers = []
  for (const field of config.fields) {
    if (field.input === 'timer') {
      const ref = createRef()
      refs[field.name] = ref
      resetHandlers.push(() => {
        ref.current?.clear()
      })
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    console.log('submit', userData)
  }

  const onReset = () => {
    setUserData(defaultData)
    for (const handler of resetHandlers) {
      handler()
    }
  }

  return (
    <>
      { config.fields.map((field) => {
        const value = userData[field.name]
        const setValue = (value) => setUserData({...userData, [field.name]: value})

        switch (field.input) {
          case 'timer':
            return <Timer ref={refs[field.name]} values={value} setValues={setValue} />

          case 'radio':
            return <Radio options={field.options} value={value} setValue={setValue} />

          case 'checkbox':
            return <Checkbox label={field.label} value={userData[field.name]} setValue={setValue} />

          case 'number':
            return <NumField label={field.label} value={value} setValue={setValue} />

          case 'text':
          default:
            return <TextField label={field.label} value={value} setValue={setValue} />
        }
      })}
      <button onClick={onSubmit}>Submit</button>
      <button onClick={onReset}>Reset</button>
      <hr/>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </>
  )
}