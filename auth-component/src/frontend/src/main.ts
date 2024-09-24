import App from './App.svelte'
import { client } from './client'

const app = new App({
  target: document.body,
  props: {
    client: client
  }
})

export default app