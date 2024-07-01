import { useId } from 'preact/hooks'

export default function Checkbox({label, value, setValue}) {
  const id = useId()

  return (
    <div class="field">
      <input id={id} type="checkbox" checked={value} onChange={() => setValue((x) => !x)} />
      <label for={id}>{label}</label>
    </div>
  )
}