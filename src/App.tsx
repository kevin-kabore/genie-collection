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
      <form
        onSubmit={e => {
          e.preventDefault()
          run(fetchCollectionAssets(address))
        }}

        <input
          id="collection-address-input"
          name="collectionAddress"
          placeholder="Collection Address"
          onChange={e => setAddress(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        Colection Data
        {status === 'pending' && <p>Loading...</p>}
        {status === 'resolved' &&
          paginatedData.map((item: any) => (
            <div key={item._id}>
              <img src={item.imageUrl} alt={item.name} />
            </div>
          ))}
        {status === 'rejected' && <p>{error?.message}</p>}
      </div>
    </div>
  )
}

export default App
