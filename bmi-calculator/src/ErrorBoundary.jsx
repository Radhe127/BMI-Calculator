import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
        return (
            <div className="p-8 text-red-600">
                <h1 className="text-2xl font-bold">Something went wrong.</h1>
                <pre className="mt-4 bg-gray-100 p-4 rounded">{this.state.error && this.state.error.toString()}</pre>
            </div>
        );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
