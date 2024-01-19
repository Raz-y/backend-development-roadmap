const express = require('express');
const fetch = require('node-fetch'); // Ensure 'node-fetch' is installed
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * * Why HPPT 
 */


// Function to generate API Key
function generateKey() {
  const characters = 'ABCDEF0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to log items
function logItems(items) {
  for (const item of items) {
    console.log(item.name);
  }
}

// Async function to get item data
async function getItemData() {
  const apiKey = generateKey();
  const response = await fetch('https://api.boot.dev/v1/courses_rest_api/learn-http/items', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

// Example route to use getItemData
app.get('/why-http', async (req, res) => {
  try {
    const items = await getItemData();
    const itemNames = items.map((item) => item.name);
    logItems(items);
    res.json(itemNames); // Send items as response
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching items');
  }
});




/**
 * * DNS
 */

async function fetchIPAddress(domain) {
  const resp = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
    headers: {
      'accept': 'application/dns-json'
    }
  })
  const respObject = await resp.json()

  return respObject.Answer[0].data;
}
// Get IP address for domain
app.get('/dns', async (req, res) => {
  const domain = 'amazon.com'
  const ipAddress = await fetchIPAddress(domain)
  if (!ipAddress) {
    res.status(500).send('something went wrong in fetchIPAddress')
  } else {
    res.json(`found IP address for domain ${domain}: ${ipAddress}`)
  }
});


function getDomainNameFromUrl(url) {
  const urlObject = new URL(url);
  return urlObject.hostname;
}
// Get domain name from URL
app.get('/dns-name', async (req, res) => {
  const url = 'https://www.amazon.com/s?k=books&ref=nb_sb_noss_2';
  const domainName = getDomainNameFromUrl(url)
  res.json(domainName)

});







// Start server on port 3000 - Don't touch this :)
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
