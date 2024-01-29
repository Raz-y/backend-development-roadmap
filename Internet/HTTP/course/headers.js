function logContentType(resp) {
    console.log(resp.headers.get('Content-Type'));
  }
  
  // don't touch below this line
  const apiKey = generateKey()
  const bootdevAPIDomain = 'api.boot.dev'

  async function main() {

    const items = await getItemData(bootdevAPIDomain)
    
    logContentType(items)
  }
  
  main()
  
  async function getItemData(domain) {
    const response = await fetch(`https://${domain}/v1/courses_rest_api/learn-http/items/0194fdc2-fa2f-4cc0-81d3-ff12045b73c8`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    return response
  }
  
  function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }



  // X-API-Key practice

const newLocationData = {
  'discovered': false,
  'id': '52fdfc07-2182-454f-963f-5f0f9a621d72',
  'name': 'Bloodstone Swamp',
  'recommendedLevel': 10
}
// don't touch below this line

async function getLocationResponse(apiKey, url) {
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
  
  async function putLocation(apiKey, url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }
  
  function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

async function main() {
    const generatedApiKey = generateKey()
    const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/locations/52fdfc07-2182-454f-963f-5f0f9a621d72'

    const oldLocation = await getLocationResponse(generatedApiKey, url)
    console.log(`Got old location:`)
    console.log(`- name: ${oldLocation.name}, recommendedLevel: ${oldLocation.recommendedLevel}`)
    console.log('---')

    await putLocation(generatedApiKey, url, newLocationData)
    console.log('Location updated!')
    console.log('---')

    // const newGeneratedApiKey = generateKey()
    const newLocation = await getLocationResponse(generatedApiKey, url)
    console.log(`Got new location:`)
    console.log(`- name: ${newLocation.name}, recommendedLevel: ${newLocation.recommendedLevel}`)
    console.log('---')
}

main()


