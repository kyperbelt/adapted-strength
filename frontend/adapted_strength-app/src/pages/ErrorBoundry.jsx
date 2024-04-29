import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught error in Error Boundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.alternate;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
