async function getResources(path) {
    const fullURL = `https://api.boot.dev${path}`
  
    const response = await fetch(fullURL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-API-Key': generateKey(),
        'Content-Type': 'application/json'
      }
    })
    const resources = await response.json()
    return resources
  }
  async function getUsers(url, apiKey) {
    const fullURL = `${url}?sort=level&order=asc`
    const response = await fetch(fullURL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-API-Key': apiKey
      }
    })
    return response.json()
  }
  
  // don't touch below this line
  const baseURL = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users'

const apiKey = generateKey() 


async function main() {
    const locations = await getResources('/v1/courses_rest_api/learn-http/locations')
    console.log('Locations:')
    logResources(locations)
    console.log(' --- ')
    
    const items = await getResources('/v1/courses_rest_api/learn-http/items')
    console.log('Items:')
    logResources(items)
    console.log(' --- ')
    
    const users = await getResources('/v1/courses_rest_api/learn-http/users')
    console.log('Users:')
    logResources(users)
    console.log(' --- \n\n');
  
    const qusers = await getUsers(baseURL, apiKey)
    for (const user of qusers) {
        console.log(`got user with name: ${user.characterName}, and level: ${user.level}`)
    }
  }
  
  main();


main();

  
  function logResources(resources) {
    for (const resource of resources) {
      console.log(` - ${JSON.stringify(resource)}`)
    }
  }
  
  function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

