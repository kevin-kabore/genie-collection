import * as React from 'react'
import {FetchErrorBoundary} from '../utils/ErrorBoundary'
import {useGetCollectionInfinite} from '../api/fetchers'

function AssetCard({asset}: {asset: any}) {
  return (
    <div>
      <img width="100%" height="auto" src={asset.imageUrl} alt={asset.name} />
    </div>
  )
}

function CollectionDetails({address}: {address: string}) {
  const {
    status,
    error,
    data: collectionAssets,
    setSize,
  } = useGetCollectionInfinite({
    address,
    page: 1,
    perPage: 10,
  })

  const setSizeRef = React.useRef(setSize)
  const observer = React.useRef(
    new IntersectionObserver(
      (entries: any[]) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setSizeRef.current(size => size + 1)
        }
      },
      {threshold: 1},
    ),
  )

  // we need to use a ref to update the setSize function used by the ref
  React.useEffect(() => {
    setSizeRef.current = setSize
  }, [setSize])

  const [element, setElement] = React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    const currentElement = element
    const currentObserver = observer.current
    if (currentElement) {
      currentObserver.observe(currentElement)
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement)
      }
    }
  }, [element])

  if (status === 'rejected') {
    throw error
  }

  const allAssets = (collectionAssets ?? []).flat()

  return (
    <section>
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
          <React.Fragment>
            {allAssets.map((asset, i) => {
              return i === allAssets.length - 1 ? (
                <div
                  ref={setElement}
                  key={`${asset.name}-${asset.owner.address}-${i}`}
                >
                  <AssetCard asset={asset} />
                </div>
              ) : (
                <AssetCard
                  asset={asset}
                  key={`${asset.name}-${asset.owner.address}-${i}`}
                />
              )
            })}
          </React.Fragment>
        )}
      </div>
    </section>
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
