/*
* HTTP methods
*/



  // Don't touch below this line
  
  const generatedKey = generateKey()
  const url = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users'

  async function main(){

    // for GET
    console.log('\nGET\n')
    const users = await getUsers(url, generatedKey)
    logUsers(users)


    // for POST
    console.log('\nPOST\n')

    console.log('Retrieving user data...')
    const userDataFirst = await getUsers(url, generatedKey)
    logUsers(userDataFirst)
    console.log('---')
    
    console.log('Creating new character...')
    const creationResponse = await createUser(generatedKey, url, userToCreate)
    console.log(`Creation response body: ${JSON.stringify(creationResponse)}`)
    console.log('---')
    
    
    console.log('Retrieving user data...')
    const userDataSecond = await getUsers(url, generatedKey)
    logUsers(userDataSecond)
    console.log('---')

    // for Status codes
    console.log('\nStatus Codes\n')

    const invalidId = 'invalid-id'
    const codeFirst = await getUsersStatusCode(`https://api.boot.dev/v1/courses_rest_api/learn-http/users/${invalidId}`, generatedKey)
    console.log(`id: ${invalidId}, status code: ${codeFirst}`)
    
    const validId = '0194fdc2-fa2f-4cc0-81d3-ff12045b73c8'
    const codeSecond = await getUsersStatusCode(`https://api.boot.dev/v1/courses_rest_api/learn-http/users/${validId}`, generatedKey)
    console.log(`id: ${validId}, status code: ${codeSecond}`)

    // for PUT
    console.log('\nPUT\n')

    const userData = await getUserById(baseURL, userId, generatedKey)
    
    logUser(userData)
    userData.characterName = 'Dellbiar'
    console.log(`Updating user with id: ${userId}`)
    userData.level = 7
    userData.class = 'Warrior'
    userData.pvpEnabled = true
    userData.user.name = 'Allan'
    await updateUser(baseURL, userId, userData, generatedKey)

    const newUser = await getUserById(baseURL, userId, generatedKey)
    logUser(newUser)


    // for DELETE
    console.log('\nDELETE\n')

    logUsers(users)
    console.log('---')

    await deleteUser(url, userId1, generatedKey)
    console.log(`Deleted user with id: ${userId1}`)
    console.log('---')

    const newUsers = await getUsers(url, generatedKey)
    logUsers(newUsers)
    console.log('---')

}

  main()





// GET

async function getUsers(url, apiKey) {
    const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        }
    })
    return await res.json()
  }
  
  
  function generateKey() {
    const characters = 'ABCDEF0123456789'
    let result = ''
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
  
  function logUsers(users) {
    for (const user of users) {
      console.log(`Character name: ${user.characterName}, Class: ${user.class}, Level: ${user.level}, User: ${user.user.name}`)
    }
  }



  // POST


  async function createUser(apiKey, url, data) {
    const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
    return await res.json()
  }
  
  // Test Suite Don't Touch Below This Line
  
  const userToCreate = {
    characterName: 'Grendel',
    class: 'Warrior',
    level: 1,
    pvpEnabled: false,
    user: {
      name: 'Allan',
      location: 'USA',
      age: 27
    }
  }
  
 
 // Status Codes

 async function getUsersStatusCode(url, apiKey) {
    const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
        }
    })
    return res.status
  }

// PUT

const userId = '2f8282cb-e2f9-496f-b144-c0aa4ced56db'

const baseURL = 'https://api.boot.dev/v1/courses_rest_api/learn-http/users'

function logUser(user) {
    console.log(`User uuid: ${user.id}, Character Name: ${user.characterName}, Class: ${user.class}, Level: ${user.level}, PVP Status: ${user.pvpEnabled}, User name: ${user.user.name}`)
  }


  async function updateUser(baseURL, id, data, apiKey) {
    const fullURL = `${baseURL}/${id}`
    const res = await fetch(fullURL, { 
        method: 'PUT',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await res.json()
  }
  
  async function getUserById(baseURL, id, apiKey) {
    const fullURL = `${baseURL}/${id}`
    const res = await fetch(fullURL, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
        }
    })
    return await res.json()
  }

  // DELETE

  const userId1 = '0194fdc2-fa2f-4cc0-81d3-ff12045b73c8'

  async function deleteUser(baseURL, id, apiKey) {
    const fullURL = `${baseURL}/${id}`
    const res = await fetch(fullURL, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'X-API-Key': apiKey,
        }
    })
    return await res.json()
  }