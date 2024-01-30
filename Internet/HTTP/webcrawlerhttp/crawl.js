const {JSDOM} = require('jsdom');

async function crawlPage(currentURL){
    console.log(`actively crawling ${currentURL}`);
    try{
        const response = await fetch(currentURL);

        if (response.status > 399){
            console.error(`error in fetch with status code: ${response.status} on page ${currentURL}`);
            return;
        }

        const contentType = response.headers.get('content-type');
        if(!contentType.includes("text/html")){
            console.log(`non html response ${currentURL} because content type is ${contentType}`);
            return;
        }

        console.log( await response.text()); 
    } catch (err) {
        console.error(`error in fetch  ${currentURL}: ${err.message}`);
    }
}



function getURLsFromHTML(htmlBody, baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const linkElement of linkElements) {
        if(linkElement.href.slice(0, 1) === '/'){
            //relative path
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href);
            } catch (err) {
                console.error(`error with relative url: ${err.message}`);
            }
        } else {
            //absolute path
            try{
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (err) {
                console.error(`error with absolute url: ${err.message}`);
            }
        }
    }
    return urls;
    }

function normalizeUrl(urlString) {
    const urlObj = new URL(urlString);
    const hostPat = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPat.length > 0 && hostPat[hostPat.length - 1] === '/') {
        return hostPat.slice(0, -1);
    }
    return hostPat;
}

module.exports = {
    normalizeUrl, getURLsFromHTML, crawlPage
};