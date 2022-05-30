<script>
import uid from '../utils/uid.js';
import api from '../utils/api.js';
import { playerName, senderPlayer, currentMail, balance } from '../store/common.js';
import { createEventDispatcher } from 'svelte';
import getTime from '../utils/get-time.js'
import ShalkerControl from './ShalkerControl.svelte'


const emit = createEventDispatcher();
let SEND = false;


/**
 * FORM
 */
$currentMail = {
    "id": uid(),
    "sender": "",
    "target": $senderPlayer,
    "subject": "",
    "body": "",
    "price": "",//num
    "tax": 0, //num
    "tso": 0,
    "status": 0,
    "attach": false
}

function send_mail (){
  if(!$currentMail.target&&!$senderPlayer) return;
  $currentMail.sender = $playerName;
  $currentMail.tso = getTime();
  $currentMail.price = Number( $currentMail.price )
  $currentMail.tax = Number( $currentMail.tax )
  $balance = $balance - $currentMail.tax;
  //$currentMail.attach = !shalkerFlag;
  delete $currentMail.select
  fetch(api.add_mail, {
          method: 'POST',
          body: JSON.stringify($currentMail)
  })
  .then((r)=>{
      SEND = true
      resetForm()
      emit('update_mail_list')
      DEV&&console.log(r.status, api.add_mail) 
  })
  .catch(err=>console.error(err))

}

function resetForm (){
  SEND = false;

  $currentMail = {
    "id": "",
    "sender": "",
    "target": "",
    "subject": "",
    "body": "",
    "price": "",
    "tax": 0,
    "tso": 0,
    "status": 0,
    "attach": false
  }
}




</script>

<aside class="forms">
    <div class="forms__group-input">
            <input type="text" placeholder="Тема отправления" class="forms__title" bind:value={$currentMail.subject}>
            <input type="text" placeholder="Кому" class="forms__to" bind:value={$currentMail.target}>
    </div>
    <textarea  placeholder="Текст отправления" bind:value={ $currentMail.body }></textarea>
    <ShalkerControl/>

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
  height: 75%;
}
.send{
  width: 100%;
}

</style>