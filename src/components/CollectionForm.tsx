import * as React from 'react'

function CollectionForm({onSubmit}: {onSubmit: (address: string) => void}) {
  const [address, setAddress] = React.useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value)
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit(address)
  }

  return (
    <form onSubmit={handleSubmit}>
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
            value={address}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  )
}

export {CollectionForm}
