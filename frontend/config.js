import config from './config.json'

function isDigit(char) {
	return '0' <= char && char <= '9'
}

function mangle(name, hasName) {
	const index = Array.from(name).findLastIndex((char) => !isDigit(char)) + 1
	let symbol = name.slice(0, index)
	let number = (index < name.length) ? name.slice(index) : 1

	while (hasName(name)) {
		number++
		name = `${symbol}${number}`
	}
	return name
}

const fieldNames = new Set()

export default {
	pages: config.pages.map((page) => (
		{
			...page,
			fields: page.fields.map((field) => {
				//ensure field names are unique
				const name = mangle(field.name, (name) => fieldNames.has(name))
				fieldNames.add(name)
				return {...field, name}
			})
		}
	))
}