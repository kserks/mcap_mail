import { writable } from 'svelte/store'




export let mails = writable([])
export let playerName = writable(null)
export let balance = writable(0)
export let flagComponent = writable(0)
export let currentMail = writable(null)
export let senderPlayer = writable(null)
export let sendStatus = writable(false)