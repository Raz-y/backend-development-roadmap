const {JSDOM} = require('jsdom');

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
    normalizeUrl, getURLsFromHTML
};