<script>
import api from './utils/api.js';
import { flagComponent } from './store/common.js';
/* components */
import Nav from './components/Nav.svelte';
import Mails from './components/Mails.svelte';
import Forms from './components/Forms.svelte';
import ReadMail from './components/ReadMail.svelte';






let mails = [];


function getMails (){
	fetch(api.get_mails)
			.then(r=>r.json())
			.then((data)=>{
				mails = data.items;
			})
			.catch(err=>console.error(err))
}

getMails();


/**
 * Если вложения нет то нету тарифа тариф=0
 * Стоимость есть всегда у письма
 * При отправке проверяется баланс, что его хватало для тарифа
 * При получении проверяется баланс, что бы его хватало на объявленную стоимость
 * [ storage ] - { tso } - время до которого будет храниться
 */

const components = [ Forms, ReadMail ]

</script>

<main>
	<Nav/>
	<div class="wrapper">
			<aside>
				<h3>Список отправлений</h3>
				<Mails mails={mails}/>
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
h3{
	padding-left: 20px;
}

aside:first-child{
	width: 40%;
	height: 100%;
	background-color: rgba(0,0,0,0.3);

}

</style>