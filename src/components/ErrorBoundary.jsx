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
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f4ee', fontFamily: 'Inter, sans-serif' }}>
          <div style={{ textAlign: 'center', padding: 40 }}>
            <h1 style={{ fontSize: 48, color: '#8C1F28' }}>⚠</h1>
            <h2 style={{ fontSize: 20, color: '#1b1b1f', marginTop: 16 }}>Something went wrong</h2>
            <p style={{ color: '#6b6b7b', marginTop: 8 }}>{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{ marginTop: 24, padding: '10px 24px', background: '#8C1F28', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}
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
