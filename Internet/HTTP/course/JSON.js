async function getLocations() {
    const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/locations'
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    return response.json()
  }
  
  // Don't touch below this line
  const apiKey = generateKey()

  async function main(){

    const locations = await getLocations()
    console.log('Got some locations from the server.')
    for (const location of locations) {
      console.log(`- name: ${location.name}, recommendedLevel: ${location.recommendedLevel}`)
    }

  }
  main()
  
  function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }


  // Sending JSON


  async function updateLocationById(id, locationObj) {
    const path = `https://api.boot.dev/v1/courses_rest_api/learn-http/locations/${id}`
    const response = await fetch(path, {
      method: 'PUT',
      mode: 'cors',
      headers: getHeaders(),
      body: JSON.stringify(locationObj)
    })
    return response.json()
  }
  
  // Don't touch below this line
  async function main() {
    
    const locationID = '0194fdc2-fa2f-4cc0-81d3-ff12045b73c8'
    
    const location = await getLocationById(locationID)
    console.log(`Location '${location.name}' fetched. Data: ${JSON.stringify(location)}`)
    
    location.discovered = true
    await updateLocationById(locationID, location)
    console.log(`Location '${location.name}' was discovered!`)
    
    const updatedLocation = await getLocationById(locationID)
    console.log(`Location '${updatedLocation.name}' fetched. Data: ${JSON.stringify(updatedLocation)}`)
    
  }
  main()


  function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
  
  async function getLocationById(id) {
    const path = `https://api.boot.dev/v1/courses_rest_api/learn-http/locations/${id}`
    const response = await fetch(path, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    return response.json()
  }
  
  function getHeaders() {
    return {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    }
  }


  // Parsing JSON

  function parseLocation(locationString) {
    try {
      const parsed = JSON.parse(locationString)
      printLocationObj(parsed)
    } catch (error) {   
        console.log(`Error parsing JSON: ${error}`)
        }
  }
  
  // don't touch below this line
  
  function printLocationObj(parsed) {
    console.log(`id: ${parsed.id}`)
    console.log(`discovered: ${parsed.discovered}`)
    console.log(`name: ${parsed.name}`)
    console.log(`recommendedLevel: ${parsed.recommendedLevel}`)
  }
  
  parseLocation(`
  {
      "discovered": false,
      "id": "0194fdc2-fa2f-4cc0-81d3-ff12045b73c8",
      "name": "Bandit Camp",
      "recommendedLevel": 14
  `)
  
    console.log('---');
  
  parseLocation(`
  {
      "discovered": false,
      "id": "0194fdc2-fa2f-4cc0-81d3-ff12045b73c8",
      "name": "Bandit Camp",
      "recommendedLevel": 14
  }
  `)