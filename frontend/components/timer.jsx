import { useRef, useState, useEffect } from 'preact/hooks'
import { forwardRef, useImperativeHandle } from 'preact/compat'

const Timer = forwardRef(({values, setValues}, ref) => {
  const [time, setTime] = useState(0)

  const prevTimeRef = useRef(null)
  const requestRef = useRef(null)

  const [running, setRunning] = useState(false)

  const onFrame = () => {
    const time = performance.now()
    if (prevTimeRef.current !== null) {
      const deltaTime = time - prevTimeRef.current
      setTime((time) => time + deltaTime)
    }
    prevTimeRef.current = time

    requestRef.current = requestAnimationFrame(onFrame)
  }

  const onStart = () => {
    prevTimeRef.current = performance.now()
    cancelAnimationFrame(requestRef.current)
    requestRef.current = requestAnimationFrame(onFrame)
    setRunning(true)
  }

  const onStop = () => {
    prevTimeRef.current = null
    cancelAnimationFrame(requestRef.current)
    setRunning(false)
  }

  function round(num, digits) {
    return Math.round(num * 10**digits) / 10**digits
  }

  const onAddTime = () => {
    setValues([...values, round(time/1000, 2)])
  }

  const onClear = () => {
    onStop()
    setTime(0)
    setValues([])
  }

  useImperativeHandle(ref, () => ({
    clear() {
      onClear()
    }
  }))

  //handle unmount
  useEffect(() => () => { cancelAnimationFrame(requestRef.current) }, [])

  return (
    <div class="field">
      <p>{`${Math.floor(time/1000/60)}`.padStart(2, '0')}:{(time / 1000 % 60).toFixed(2).padStart(5, '0')}</p>
      <button disabled={running} onClick={onStart}>Start</button>
      <button disabled={!running} onClick={onAddTime}>Add Time</button>
      { running && (
        <button type='button' onClick={onStop}>Stop</button>
      ) || (
        <button type='button' onClick={onClear}>Clear</button>
      )}

      <div style={{border: '1px solid black', width: '200px', height: '100px', overflowY: 'auto'}}>
        {values.map((_, index) => (
          <p style={{margin: 'auto'}}>{values[values.length-1-index]}</p>
        ))}
      </div>
    </div>
  )
})

export default Timer