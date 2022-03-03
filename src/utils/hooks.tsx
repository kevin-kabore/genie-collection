import * as React from 'react'

interface IAsyncState {
  status: 'idle' | 'pending' | 'resolved' | 'rejected'
  data?: any
  error?: Error | null
}

type ActionType = 'pending' | 'resolved' | 'rejected'
interface IAsyncAction {
  type: ActionType
  data?: any
  error?: Error
}

function asyncReducer(state: IAsyncState, action: IAsyncAction): IAsyncState {
  switch (action.type) {
    case 'pending':
      return {status: 'pending', data: null, error: null}
    case 'resolved':
      return {status: 'resolved', data: action.data, error: null}
    case 'rejected':
      return {status: 'rejected', data: null, error: action.error}
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const defaultInitialState = {status: 'idle', data: null, error: null}

function useAsync(initialState: IAsyncState = {status: 'idle'}) {
  const [{status, data, error}, dispatch] = React.useReducer(asyncReducer, {
    ...defaultInitialState,
    ...initialState,
  })

  const run = React.useCallback(
    (promise: Promise<any>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Are you passing a function that isn't returning anything?`,
        )
      }

      dispatch({type: 'pending'})
      promise
        .then(response => {
          if (!response.ok) {
            const error = new Error(response.statusText || 'Unknown error')
            dispatch({
              type: 'rejected',
              error,
            })
            throw error
          }

          return response.json()
        })
        .then(({data}) => {
          dispatch({type: 'resolved', data})
        })
    },
    [dispatch],
  )

  return {status, data, error, run}
}

export {useAsync}
