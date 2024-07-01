import { useId } from 'preact/hooks'

export default function TextField({label, value, setValue}) {
  const id = useId()

  return (
    <div class="field">
      <label for={id}>{label}</label>
      <input id={id} type="text" value={value} onInput={(event) => setValue(event.currentTarget.value)} />
    </div>
  )
}