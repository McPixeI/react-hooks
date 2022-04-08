// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

// Solucion con todos los credits

import * as React from 'react'

//Custom hook
const useLocalStorageState = (
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) => {
  const [state, setState] = React.useState(
    //El calculo del valor inicial de useState lo metemos en funcion flecha para que no haga
    // la busqueda al localstorrage cada render (lazy initialization)
    () => {
      const valueInLocalStorage = window.localStorage.getItem(key)
      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage)
      }
      //Si es una función (calculo pesado) lo devolvemos como funcion sino defaultvalue
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    },
  )

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState]
}

function Greeting ({initialName = ''}) {
  //Usamos el custom hook
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange (event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App () {
  return <Greeting initialName="Pepa" />
}

export default App
