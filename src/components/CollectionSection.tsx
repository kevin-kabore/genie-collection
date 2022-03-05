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

  // TODO: Use ref for infinite scroll and fetch
  // const loaderRef = React.useRef<HTMLDivElement>(null)
  // const handleObserver = React.useCallback(
  //   entries => {
  //     const target = entries[0]
  //     if (target.isIntersecting) {
  //       setSize(pg => pg + 1)
  //     }
  //   },
  //   [setSize],
  // )

  // React.useEffect(() => {
  //   const option = {
  //     root: null,
  //     rootMargin: '200px',
  //     threshold: 0,
  //   }
  //   const observer = new IntersectionObserver(handleObserver, option)
  //   if (loaderRef.current) observer.observe(loaderRef.current)
  // }, [handleObserver])

  // <div ref={loaderRef} />

  if (status === 'error') {
    throw error
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridGap: '1rem',
        textAlign: 'center',
      }}
    >
      {status === 'idle' ? (
        <p>Submit a valid collection address to see its available assets</p>
      ) : status === 'pending' ? (
        <div>Loading...</div>
      ) : (
        <AssetDataList assets={(collectionAssets ?? []).flat()} />
      )}
    </div>
  )
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
