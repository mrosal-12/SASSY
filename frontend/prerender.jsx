import { render } from 'preact-render-to-string'
import { App } from './app.jsx'

export function prerender() {
  return {
    html: render(<App/>)
  }
}