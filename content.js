chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if(request.action === 'getCitation') {
		if(location.href.includes('youtube.com/watch')) {
			let citation = extractYTData()
			sendResponse(citation)
		}
		else {
			let citation = extractWebsiteData()
			sendResponse(citation)
		}
	}
})

function extractYTData() {
	let publisher = extractYTAuthor()
	let title = extractYTTitle()
	let publishDate = extractYTPublishDate()
	let url = window.location.href

	let accessed = new Date().toLocaleDateString()

	let citation = `${publisher}, ${title}, ${publishDate}, ${url}, ${accessed}`

	return citation
}

function extractYTAuthor() {
	let author = document.querySelector('ytd-watch-metadata ytd-channel-name')?.innerText.trim()
	if(author) return author

	return 'Unknown Author'
}

function extractYTTitle() {
	let title = document.querySelector('ytd-watch-metadata h1')?.innerText.trim()
	if(title) return title

	return 'Unknown Title'
}

function extractYTPublishDate() {
	let [views, publishDate  = 'Date not found'] = document.querySelector('ytd-watch-info-text #tooltip')?.innerText?.split('•') || []
	if(publishDate) return publishDate.trim()

	return 'Unknown Date'
}

function extractWebsiteData() {
	let publisher = extractAuthor()
	let title = extractTitle()
	let publishDate = extractPublishDate()
	let url = window.location.href
	let accessed = new Date().toLocaleDateString()

	let citation = `${publisher}, ${title}, ${publishDate}, ${url}, ${accessed}`

	return citation
}

function extractAuthor() {
	let author = document.querySelector('meta[name="author"]')?.content?.trim()
	if(author) return author

	author = document.querySelector('meta[property="article:author"]')?.content?.trim()
	if(author) return author

	author = document.querySelector('meta[name="article:author"]')?.content?.trim()
	if(author) return author

	author = document.querySelector('[itemprop="author"] [itemprop="name"]')?.textContent?.trim()
	if(author) return author

	author = document.querySelector('[itemprop="author"]')?.textContent?.trim()
	if(author) return author

	author = document.querySelector('.author')?.textContent?.trim()
	if(author) return author

	author = document.querySelector('.byline')?.textContent?.trim()
	if(author) return author

	author = document.querySelector('.author-name')?.textContent?.trim()
	if(author) return author

	return 'Unknown Author'
}

function extractTitle() {
	let title = document.querySelector('h1')?.textContent?.trim()
	if(title) return title

	title = document.querySelector('meta[property="og:title"]')?.content?.trim()
	if(title) return title

	title = document.querySelector('meta[name="twitter:title"]')?.content?.trim()
	if(title) return title

	title = document.querySelector('meta[name="title"]')?.content?.trim()
	if(title) return title

	let siteName = document.querySelector('meta[property="og:site_name"]')?.content?.trim()
	if(siteName) return document.title.replace(siteName, '').replace(/[|—-]/g, '').trim()

	title = document.querySelector('title')?.textContent?.trim()
	if(title) return title.replace(/[|—-]/g, '').trim()

	return 'Unknown Title'
}

function extractPublishDate() {
	let publishDate = document.querySelector('meta[property="article:published_time"]')?.content
	if(publishDate) return new Date(publishDate).toLocaleDateString()

	publishDate = document.querySelector('time[datetime]')?.getAttribute('datetime')
	if(publishDate) return new Date(publishDate).toLocaleDateString()

	return 'Unknown Date'
}
