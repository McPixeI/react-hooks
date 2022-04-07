// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting ({initialName}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  //const name = ''

  //Ya con el extra credit: Make the Greeting accept a prop
  //called initialName and initialize the name state to that value.

  const [name, setName] = React.useState(initialName)

  function handleChange (event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App () {
  return <Greeting initialName="Pepa" />
}

export default App
