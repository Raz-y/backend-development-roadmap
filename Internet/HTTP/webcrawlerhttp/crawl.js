function normalizeUrl(urlString) {
    const urlObj = new URL(urlString);
    const hostPat = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPat.length > 0 && hostPat[hostPat.length - 1] === '/') {
        return hostPat.slice(0, -1);
    }
    return hostPat;
}

module.exports = {
    normalizeUrl: normalizeUrl
};