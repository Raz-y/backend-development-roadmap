// Import the crawlPage function from crawl.js
const {crawlPage} = require('./crawl.js');

// Import the printReport function from reports.js
const {printReport} = require('./reports.js');

// The main function of the program
async function main() {
    // Check if a website was specified as a command line argument
    if(process.argv.length < 3) {
        console.log("no website specified");
        process.exit(1); // Exit the program with a status code of 1
    }
    // Check if too many arguments were provided
    if (process.argv.length > 3) {
        console.log("too many arguments");
        process.exit(1); // Exit the program with a status code of 1
    }
    // Get the base URL from the command line arguments
    const baseURL = process.argv[2];
    console.log(`crawling ${baseURL}`) // Log the base URL
    
    // Crawl the base URL and get the pages
    const pages = await crawlPage(baseURL, baseURL, {});
    
    // Print the report of the crawled pages
    printReport(pages);
}

// Call the main function
main();