import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

export const API_URL: 'https://api.genie.xyz' = 'https://api.genie.xyz'

export const fetcher = async (url: string, payload?: string) => {
  const options = {
    method: payload ? 'POST' : 'GET',
    ...(payload && {body: payload}),
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  return fetch(url, options).then(r => r.json())
}
export const useGetCollection = (address: string) => {
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

  const {data, error, isValidating} = useSWR(
    () => (address ? [`${API_URL}/assets`, JSON.stringify(options)] : null),
    fetcher,
  )

  const status = error
    ? 'rejected'
    : data
    ? 'resolved'
    : isValidating
    ? 'pending'
    : 'idle'
  return {
    status,
    data: data?.data,
    error,
    isValidating,
  }
}
