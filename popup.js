addEventListener('load', async e => {
	let textrea = document.querySelector('textarea')
	let btn = document.querySelector('button')
	let successMsg = document.querySelector('#success-msg')
	let errorMsg = document.querySelector('#error-msg')

	let [tab] = await chrome.tabs.query({active: true, currentWindow: true})

	try{
		let citation = await chrome.tabs.sendMessage(tab.id, {action: 'getCitation'})
		textrea.value = citation

		btn.addEventListener('click', onBtnClick)
	}
	catch(err){
		textrea.value = 'Failed to get citation'
		btn.classList.add('hidden')
	}

	function onBtnClick() {
		navigator.clipboard.writeText(textrea.value).then(() => {
			successMsg.classList.remove('hidden')
			errorMsg.classList.add('hidden')

			successMsg.innerText = 'Citation copied to clipboard'

			setTimeout(() => {
				successMsg.classList.add('hidden')
				successMsg.textContent = ''
			}, 2500)
		})
		.catch(err => {
			errorMsg.classList.remove('hidden')
			successMsg.classList.add('hidden')

			errorMsg.innerText = 'Failed to copy citation to clipboard'

			setTimeout(() => {
				errorMsg.classList.add('hidden')
				errorMsg.textContent = ''
			}, 2500)
		})
	}
})