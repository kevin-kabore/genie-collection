import React from 'react'
import {CollectionForm} from './components/CollectionForm'
import {CollectionSection} from './components/CollectionSection'

function App() {
  const [address, setAddress] = React.useState('')

  function handleSubmit(newAddress: string) {
    setAddress(newAddress)
  }
  function handleSelectReset(newAddress: string) {
    setAddress(newAddress)
  }

  return (
    <div className="App">
      <header>
        <h2
          style={{
            textAlign: 'center',
            textDecoration: 'uppercase',
          }}
        >
          Genie.xyz
        </h2>
      </header>

      <CollectionForm onSubmit={handleSubmit} />
      <CollectionSection address={address} onSelect={handleSelectReset} />
    </div>
  )
}

export default App
