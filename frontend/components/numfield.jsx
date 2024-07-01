import { useId } from 'preact/hooks'

export default function NumField({label, value, setValue}) {
  const id = useId()

  return (
    <div class="field">
      <label for={id}>{label}</label>
      <input id={id} type="number" value={value} onInput={(event) => setValue(event.currentTarget.value)} />
    </div>
  )
}