import { createRef } from 'preact'
import { useState, useMemo } from 'preact/hooks'
import './app.css'
import QRCode from 'react-qr-code'

import NumField from './components/numfield.jsx'
import TextField from './components/textfield.jsx'
import Checkbox from './components/checkbox.jsx'
import Radio from './components/radio.jsx'
import Timer from './components/timer.jsx'


import config from './config.js'

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
  const fields = []
  for (const page of config.pages) {
    for (const field of page.fields) {
      fields.push(field)
    }
  }

  const defaultData = {}
  for (const field of fields) {
    defaultData[field.name] = field.default ?? defaultValue(field.input)
  }

  const refs = {}
  const resetHandlers = []
  for (const field of fields) {
    if (field.input === 'timer') {
      const ref = createRef()
      refs[field.name] = ref
      resetHandlers.push(() => {
        ref.current?.restart()
      })
    }
  }

  const [pageIndex, setPageIndex] = useState(0)
  const pageCount = config.pages.length + 1
  const currentPage = useMemo(() => config.pages[pageIndex], [pageIndex])

  const [userData, setUserData] = useState(defaultData)

  const onNextPage = () => {
    setPageIndex(Math.min(pageCount-1, pageIndex + 1))
  }

  const onPrevPage = () => {
    setPageIndex(Math.max(0, pageIndex - 1))
  }

  const onReset = () => {
    setPageIndex(0)
    setUserData(defaultData)
    for (const handler of resetHandlers) {
      handler()
    }
  }

  return (
    <>
      <div style={{minHeight: '200px'}}>
        <header>
          <h1>{currentPage?.title ?? 'QR Code'}</h1>
          <button disabled={pageIndex <= 0} onClick={onPrevPage}>Prev</button>
          <button disabled={pageIndex >= pageCount-1} onClick={onNextPage}>Next</button>
        </header>
        <hr/>
        {config.pages.map((page, index) => (
          <div style={pageIndex === index ? {} : {display: 'none'}}>
            {page.fields.map((field) => {
              const key = field.name
              const value = userData[field.name]
              const setValue = (value) => setUserData({...userData, [field.name]: value})

              switch (field.input) {
                case 'timer':
                  return <Timer key={key} ref={refs[field.name]} values={value} setValues={setValue} />

                case 'radio':
                  return <Radio key={key} options={field.options} value={value} setValue={setValue} />

                case 'checkbox':
                  return <Checkbox key={key} label={field.label} value={value} setValue={setValue} />

                case 'number':
                  return <NumField key={key} label={field.label} value={value} setValue={setValue} />

                case 'text':
                default:
                  return <TextField key={key} label={field.label} value={value} setValue={setValue} />
              }
            })}
          </div>
        ))}
        {!currentPage && (
          // QR code contents
          <>
            <QRCode
              title="QRCode"
              value={JSON.stringify(userData)}
              bgColor="#FFFFFF"
              fgColor="#000000"
              size="256"
            />
            <pre>{JSON.stringify(userData, null, 2)}</pre>
            <button onClick={onReset}>Restart</button>
          </>
        )}
      </div>
    </>
  )
}
