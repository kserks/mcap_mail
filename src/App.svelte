<script>
import api from './utils/api.js';
import { flagComponent, playerName, mails, balance } from './store/common.js';
//import socket from './service/socket.js';
/* components */
import Nav from './components/Nav.svelte';
import Mails from './components/Mails.svelte';
import Forms from './components/Forms.svelte';
import ReadMail from './components/ReadMail.svelte';
import UnlockMail from './components/UnlockMail.svelte';


window.setName = function (name){
	$playerName = name;
}
$balance = 1000;



function getMails (){
	fetch(api.get_mails)
			.then(r => r.json())
			.then(data => $mails = data.items )
			.catch(err => console.error(err))
}

getMails();


const components = [ Forms, ReadMail, UnlockMail ]

/*
socket.on('get_mail', data=> {
    alert(data)
});

*/
</script>

<main>
	<Nav/>
	<div class="wrapper">
			<aside>
				{#if $playerName}
					<Mails/>
				{/if}
			</aside>
			<svelte:component this={ components[$flagComponent] } on:update_mail_list={getMails}/>

	</div>
</main>

<style scoped>

main{
	width: 800px;
	height: 500px;
	background-color: #223;
	box-shadow: 2px 2px 3px rgba(0,0,0,0.3);

}


/**/
.wrapper{
	display: flex;
	height: 93%;

}


aside:first-child{
	width: 40%;
	height: 100%;
	background-color: rgba(0,0,0,0.3);

}

</style>