import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function FetchErrorBoundary(props: any) {
  return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />
}

export {FetchErrorBoundary}
