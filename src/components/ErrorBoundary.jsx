import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white p-4">
          <h1 className="text-4xl font-bold text-red-500 mb-4">System Malfunction</h1>
          <p className="text-xl text-gray-300 mb-8">A critical error occurred and the application could not be loaded.</p>
          <p className="text-lg text-gray-500">Please try refreshing the page. If the problem persists, contact support.</p>
          <details className="mt-4 text-left bg-gray-900 p-4 rounded-lg w-full max-w-2xl">
            <summary className="cursor-pointer">Error Details</summary>
            <pre className="mt-2 text-red-400 overflow-auto">
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
