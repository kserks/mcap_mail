import App from './App.svelte';

window.DEV = true

const app = new App({
	target: document.body
});

export default app;