function printReport(pages){
    console.log("------------------- ");
    console.log("REPORT");
    console.log("------------------- ");
    const sortedPages = sortPages(pages);
    for(const page of sortedPages){
        const url = page[0];
        const aHits = page[1];
        console.log(`Found ${aHits} links to ${url}`);
    }
    console.log("------------------- ");
    console.log("REPORT END");
    console.log("------------------- ");
}


function sortPages(pages){
    
    const pagesArr = Object.entries(pages)
    pagesArr.sort((pageA, pageB) => {
      return pageB[1] - pageA[1]
    })
    return pagesArr
  }

module.exports = {sortPages, printReport};