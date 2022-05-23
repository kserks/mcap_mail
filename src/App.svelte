<script>
import uid from './utils/uid.js';
import api from './utils/api.js';
/**


fetch(api.courses())
  .then(r=>r.json())
  .then(r=>{
      courses = r.items.map(item=>{
                    //расширяем урок свойством active для отображения активного элемента
                    item.active = false
                    return item
               })
  })


 */


let mails = []






function getMails (){
	fetch(api.get_mails)
		.then(r=>r.json())
		.then((data)=>{
			mails = data.items;
		})
		.catch(err=>{
			console.error(err)
		})
}

getMails ()
let body = {
	  "id": "",
	  "sender": "mcap_serg",
	  "target": "",
	  "subject": "",
	  "body": "",
	  "price": "",
	  "tax": 0,
	  "tso": 0,
	  "status": 0
}

function send_mail (){

	body.id = uid();
	body.tso = Number( ( new Date().getTime()/1000 ).toFixed() );
	body.price = Number( body.price )

	console.log(body)
	fetch(api.add_mail, {
	        method: 'POST',
	        body: JSON.stringify(body)
	})
	.then(()=>{
			resetForm()
			getMails()
	})
	.catch(err=>{
			console.error(err)
	})

}

function resetForm (){
	body = {
	  "id": "",
	  "sender": "mcap_serg",
	  "target": "",
	  "subject": "",
	  "body": "",
	  "price": "",
	  "tax": 0,
	  "tso": 0,
	  "status": 0
	}
}

/**
 * Если вложения нет то нету тарифа тариф=0
 * Стоимость есть всегда у письма
 * При отправке проверяется баланс, что его хватало для тарифа
 * При получении проверяется баланс, что бы его хватало на объявленную стоимость
 *
 * [ storage ] - { tso } - время до которого будет храниться
 */

</script>

<main>
	<nav>
			<span class="player">mcap_serg</span>
			<span class="balance">710</span>
	</nav>
	<div class="wrapper">
			<aside>
				<h3>Список отправлений</h3>
				<ul class="mails">
					{#each mails as mail}
							<li>{mail.subject}</li>
					{/each}
				</ul>
			</aside>

			<aside class="forms">
				<div class="forms__group-input">
						<input type="text"  placeholder="Тема отправления" class="forms__title" bind:value={body.subject}>
						<input type="text"  placeholder="Кому" class="forms__to" bind:value={body.target}>
				</div>
				<textarea  placeholder="Текст отправления" bind:value={body.body}></textarea>
				<div class="controls">
					<input type="text" placeholder="Слот">
					<input type="text" placeholder="Стоимость" bind:value={body.price}>
					<button>Разместить</button>
					<button on:click={send_mail}>Отправить</button>
				</div>
			</aside>
	</div>
</main>

<style scoped>

main{
	width: 800px;
	height: 500px;
	background-color: #223;
	box-shadow: 2px 2px 3px rgba(0,0,0,0.3);

}
nav{
	background-color: black;
	box-shadow: 0 1px 2px rgba(0,0,0,0.3);
	height: 7%;
	display: flex;
	justify-content: flex-end;
	color: gray;
}

.player{
	padding-right: 15px;
	display: inline-flex;
	font-size: 16px;
	align-items: center;
	padding-bottom: 3px;
}
.balance{
	padding-right: 15px;
	font-size: 16px;
	display: inline-flex;
	align-items: center;

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

.forms{
	width: 60%;
	height: 100%;
	padding: 10px;
	background-color: rgba(0,0,0,0.3);
}
.forms__group-input{
	display: flex;
	justify-content: space-between;
	flex-direction: row-reverse;
}
.forms__title{
	width: 60%;
}
.forms__to{
	width: 38%;
}
textarea{
	width: 100%;
  height: 75%;
}

.mails{
	overflow: auto;
}

.controls{
	display: flex;
	justify-content: space-between;
}
.controls input{
	width: 100px;

}
</style>