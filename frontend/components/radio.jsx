import { useId, useState, useMemo } from 'preact/hooks'

// implements disambiguation between duplicate options, maintain state for last selected option
export default function Radio({options, value, setValue}) {
  const [selected, setSelected] = useState(null)
  const ids = options.map(() => useId())

  const valueIndex = useMemo(() => options.indexOf(value), [options, value])
  const hasValue = useMemo(() => valueIndex !== -1, [valueIndex])
  const selectedValue = useMemo(() => selected !== null && options[selected] === value, [selected, options, value])

  return (
    <div class="field">
      { options.map((option, index) => {
        const id = ids[index]

        const checked = (
          hasValue
          ? selectedValue
            ? selected === index
            : valueIndex === index
          : false
        )

        return (
          <div class="option">
            <input id={id} type="radio" name="test" checked={checked} onChange={() => {
              setValue(option)
              setSelected(index)
            }} />
            <label for={id}>{option}</label>
          </div>
        )
      })}
    </div>
  )
}