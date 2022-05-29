<script>
import api from './utils/api.js';
import { flagComponent, playerName, mails, balance } from './store/common.js';

/* components */
import Nav from './components/Nav.svelte';
import Mails from './components/Mails.svelte';
import Forms from './components/Forms.svelte';
import ReadMail from './components/ReadMail.svelte';
import UnlockMail from './components/UnlockMail.svelte';


if(DEV){
	window.setName = function (name){
		$playerName = name;
	}
}


$balance = 1000;

function getMails (){
	fetch(api.get_mails)
			.then(r => r.json())
			.then(data => { 
					$mails = data.items
					DEV&&console.log(200, api.get_mails) 
			})
			.catch(err => console.error(err))
}

getMails();

setInterval(getMails, 3000)

const components = [ Forms, ReadMail, UnlockMail ]



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
	width: 1200px;
	height: 700px;
	background-color: #223;
	box-shadow: 3px 3px 10px rgba(0,100,100,0.3);

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