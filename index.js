import MVVM from './src/core'

const data = {
	a: 1
}

const template = `
	<div>
		<div>{{a}}</div>
		<input bind:value="a"/>
	</div>
`

var mv = new MVVM({
	selector: 'body',
	data,
	template
})

mv.$watch('a', (newValue) => {
	console.log('callback', newValue)
})

console.log(data.a, mv.a)
data.a = 2
console.log(data.a, mv.a)

global.data = data
