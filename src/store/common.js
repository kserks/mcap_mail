import { writable } from 'svelte/store';




export let mails = writable([]);
export let playerName = writable(null);
export let flagComponent = writable(0);
export let currentMail = writable(null);