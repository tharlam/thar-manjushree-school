import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-mint font-sans">
          <div className="p-10 text-center">
            <h1 className="text-5xl text-danger">!</h1>
            <h2 className="mt-4 text-xl text-ink">Something went wrong</h2>
            <p className="mt-2 text-muted">{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-6 cursor-pointer rounded-md border-none bg-danger px-6 py-2.5 text-sm text-white"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
