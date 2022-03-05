import * as React from 'react'
import {FetchErrorBoundary} from '../utils/ErrorBoundary'
import {usePaginateCollectionAssets} from '../api/fetchers'

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
  const {
    status,
    error,
    data: collectionAssets,
    setSize,
    size,
  } = usePaginateCollectionAssets({
    address,
    page: 1,
    perPage: 10,
  })

  if (status === 'idle') {
    return <p>Submit a valid collection address to see its available assets</p>
  } else if (status === 'pending') {
    return <div>Loading...</div>
  } else if (status === 'resolved') {
    // resolved
    return (
      <React.Fragment>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gridGap: '1rem',
            textAlign: 'center',
          }}
        >
          <AssetDataList assets={(collectionAssets ?? []).flat()} />
        </div>
        <button onClick={() => setSize(size + 1)}>load more</button>
      </React.Fragment>
    )
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
        <CollectionDetails address={address} />
      </FetchErrorBoundary>
    </div>
  )
}

export {CollectionSection}
