import {API_URL} from '../constants'

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

export {fetchCollectionAssets}
