import * as React from 'react'
import {FetchErrorBoundary} from '../utils/ErrorBoundary'
import {useGetCollection} from '../api/fetchers'

function AssetDataView({asset}: {asset: any}) {
  return (
    <div>
      <img width="100%" height="auto" src={asset.imageUrl} alt={asset.name} />
    </div>
  )
}
function AssetDataList({assets}: {assets: any[]}) {
  return (
    <React.Fragment>
      {assets.map((asset, i) => (
        <AssetDataView
          asset={asset}
          key={`${asset.name}-${asset.owner.address}-${i}`}
        />
      ))}
    </React.Fragment>
  )
}

function CollectionDetails({address}: {address: string}) {
  const {status, data, error} = useGetCollection(address)

  if (status === 'idle') {
    return <p>Submit a valid collection address to see its available assets</p>
  } else if (status === 'pending') {
    return <div>Loading...</div>
  } else if (status === 'resolved') {
    // resolved
    return <AssetDataList assets={data} />
  } else {
    throw error
  }
}

function CollectionSection({
  address,
  onSelect,
}: {
  address: string
  onSelect: (address: string) => void
}) {
  return (
    <div>
      <FetchErrorBoundary
        onReset={() => {
          onSelect('')
        }}
        resetKeys={[address]}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gridGap: '1rem',
            textAlign: 'center',
          }}
        >
          <CollectionDetails address={address} />
        </div>
      </FetchErrorBoundary>
    </div>
  )
}

export {CollectionSection}
