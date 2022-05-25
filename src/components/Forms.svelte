<script>
import uid from '../utils/uid.js';
import api from '../utils/api.js';
import { playerName } from '../store/common.js';
import { createEventDispatcher } from 'svelte';

const emit = createEventDispatcher();

const MONTH = 259200; //s

let body = {
    "id": "",
    "sender": "",
    "target": "",
    "subject": "",
    "body": "",
    "price": "",//num
    "tax": 0,//num
    "tso": 0,
    "status": 0
}

function send_mail (){

  body.id = uid();
  body.sender = $playerName;
  body.tso = Number( ( new Date().getTime()/1000 ).toFixed() );
  body.price = Number( body.price )
  body.tax = Number( body.tax )
  fetch(api.add_mail, {
          method: 'POST',
          body: JSON.stringify(body)
  })
  .then(()=>{
      resetForm()
      emit('update_mail_list')
  })
  .catch(err=>console.error(err))

}

function resetForm (){
  body = {
    "id": "",
    "sender": "",
    "target": "",
    "subject": "",
    "body": "",
    "price": "",
    "tax": 0,
    "tso": 0,
    "status": 0
  }
}
</script>

<aside class="forms">
    <div class="forms__group-input">
            <input type="text" placeholder="Тема отправления" class="forms__title" bind:value={body.subject}>
            <input type="text" placeholder="Кому" class="forms__to" bind:value={body.target}>
    </div>
    <textarea  placeholder="Текст отправления" bind:value={body.body}></textarea>
    <div class="controls">
          <input type="number" placeholder="Тариф" bind:value={body.tax}>
          <input type="number" placeholder="Стоимость" bind:value={body.price}>
          <input type="number" placeholder="Слот">
          <button class="tax {body.tax>0?'tax-active':''}">Разместить</button>
    </div>
    <button class="send" on:click={send_mail}>Отправить</button>
</aside>

<style scoped>

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
  height: 67%;
}



.controls{
  display: flex;
  justify-content: space-between;
}
.controls input{
  width: 107px;
  text-align: center;
}
.send{
  width: 100%;
}
.tax{
  pointer-events: none;
  opacity: 0.4;
}
.tax-active{
  pointer-events: all;
  opacity: 1;
}
</style>