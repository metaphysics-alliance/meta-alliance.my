// src/ErrorBoundary.jsx
import React from 'react'

export default class ErrorBoundary extends React.Component{
  constructor(props){ super(props); this.state = { hasError: false, message: '' } }
  static getDerivedStateFromError(err){ return { hasError: true, message: err?.message || 'Unexpected error' } }
  componentDidCatch(err, info){ console.error('App crashed:', err, info) }
  render(){
    if (this.state.hasError){
      return (
        <div style={{padding:'2rem'}}>
          <h2 style={{color:'#ffd66b'}}>Something went wrong.</h2>
          <p style={{opacity:.85}}>{this.state.message}</p>
          <p style={{opacity:.6, fontSize:12}}>Check the console for details.</p>
        </div>
      )
    }
    return this.props.children
  }
}
