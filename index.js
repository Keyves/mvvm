import MVVM from './src/core'

const data = {
	a: 1
}

const template = `
	<div>
        <input bind:value="a" on:input="onInput"/>
		<div>{{a}}</div>
	</div>
`

const mv = new MVVM({
	selector: 'body',
	data,
    methods: {
        onInput(e) {
            this.a = e.target.value
        }
    },
	template
})

mv.$watch('a', (newValue) => {
	console.log('callback', newValue)
})

console.log(data.a, mv.a)
data.a = 2
console.log(data.a, mv.a)

global.data = data
