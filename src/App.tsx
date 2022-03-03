import React from 'react'
import {useAsync} from './utils/hooks'

const API_URL = 'https://api.genie.xyz'

function fetchCollection(address: string) {
  const options = {
    filters: {address},
    limit: 1,
    // fields: {stats: 1},
  }
  return fetch(`${API_URL}/collections`, {
    method: 'POST',
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
          run(fetchCollection(address))
        }}
      >
        <label htmlFor="collection-address-input">Collection Address</label>

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
