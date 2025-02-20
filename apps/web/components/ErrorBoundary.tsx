"use client";

import React, { ErrorInfo, Component } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className='rounded-md p-6 w-full flex justify-center items-center'>
        <div className='border p-6 rounded-md shadow-md'>
          <h2 className='font-semibold font-mono'>Something went wrong.</h2>
          <span>Check backend API connection</span>
        </div>
      </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
