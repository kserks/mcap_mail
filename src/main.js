import App from './App.svelte';

window.DEV = false

const app = new App({
	target: document.body
});

export default app;