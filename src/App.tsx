import React from 'react'
import {useAsync} from './utils/hooks'

const API_URL = 'https://api.genie.xyz'

function fetchCollectionAssets(address: string) {
  const options = {
    filters: {
      address,
      traits: {},
    },
    fields: {
      address: 1,
      name: 1,
      id: 1,
      imageUrl: 1,
      currentPrice: 1,
      currentUsdPrice: 1,
      paymentToken: 1,
      animationUrl: 1,
    },
    limit: 25,
    offset: 0,
  }

  return fetch(`${API_URL}/assets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  })
}

function App() {
  const [address, setAddress] = React.useState('')
  const {status, data, error, run} = useAsync()
  //TODO: Actually paginate the results
  let paginatedData = data.slice(0, 10)

  return (
    <div className="App">
      <header>
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          Genie.xyz
        </h2>
      </header>

      <form
        onSubmit={e => {
          e.preventDefault()
          run(fetchCollectionAssets(address))
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <label htmlFor="collection-address-input">Collection Address</label>

            <input
              id="collection-address-input"
              name="collectionAddress"
              placeholder="Collection Address"
              style={{
                marginRight: '0.25rem',
              }}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridGap: '1rem',
        }}
      >
        {status === 'pending' && <p>Loading...</p>}
        {status === 'resolved' &&
          data.map((item: any) => (
            <div key={item.name}>
              <img
                width="100%"
                height="auto"
                src={item.imageUrl}
                alt={item.name}
              />
            </div>
          ))}
        {status === 'rejected' && <p>{error?.message}</p>}
      </div>
    </div>
  )
}

export default App
