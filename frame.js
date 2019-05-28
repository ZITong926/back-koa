document.body.addEventListener('click', (e) => {
	if(e.target.id !== 'inputSearch'){
		console.log('a', e, e.path[0])
		if(e.target.localName === 'a'){
			console.log(document.getElementById('iframe'), document.getElementsByTagName('iframe'))
		}
		// window.localStorage.setItem('url', 'http://cancan.net.cn')
	}
})

let len = document.getElementsByTagName('input').length
for (var i = len.length - 1; i >= 0; i--) {
	document.getElementsByTagName('input')[i].addEventListener('click', (e) => {
		e.preventDefault()
		e.stopPropagation()
		e.blur()
	})
}
