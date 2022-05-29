<script>
import uid from '../utils/uid.js';
import api from '../utils/api.js';
import mcefQuery from '../utils/mcef-query.js';
import { playerName, balance, senderPlayer } from '../store/common.js';
import { createEventDispatcher } from 'svelte';
import { fromInvToCoords, fromCoordsToInv } from '../helpers/coords.js';
import { onDestroy } from 'svelte';
import getStorage from '../methods/get-storage.js';
import getTime from '../utils/get-time.js'

const emit = createEventDispatcher();
let SEND = false;
const MONTH = 2592000; //s
let shalkerFlag = true;



/**
 * FORM
 */
let body = {
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
  if(!body.target&&!$senderPlayer) return;
  body.sender = $playerName;
  body.tso = getTime();
  body.price = Number( body.price )
  body.tax = Number( body.tax )
  $balance = $balance - body.tax;
  body.attach = !shalkerFlag;
  delete body.select
  fetch(api.add_mail, {
          method: 'POST',
          body: JSON.stringify(body)
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
  shalkerFlag = true;
  body = {
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



/**
 * ATTACH
 */
let slot = null;
/**
 * Отправляем шалкер на почту
 * И отменяем отправку в случае необходимости
 */

let _pos;
async function transitionShalker (){

  const storage = await getStorage();
  /**
   * Получаем пустое место в хранилище почты
   */
  const { pos } = storage.filter(store => store.item==="")[0];
  let cmdDATA;
  if(shalkerFlag){
      cmdDATA = fromInvToCoords(pos, slot, $playerName);
      shalkerFlag = false;
      shalkerWriteToDB(pos, true)
      // сохраняем текущие координаты, так как при отмене шалкера
      // мы не получим уже занятую запись
      _pos = pos
  }
  else{
      cmdDATA = fromCoordsToInv(pos, slot, $playerName);
      shalkerFlag = true;
      shalkerWriteToDB(_pos, false)
  }
  /**
   * Подготавливаем данные для выполнение команды при помощи Minecraft
   */
  const data = {
        "data": cmdDATA,
        "action": "executeCMD",
        "uuid": uid(),
        "type": "server",
        "dts": getTime(),
        "ars": true,
        "player": $playerName
  }
  const str = `CMD_${JSON.stringify(data)}`;

  if(!window.DEV){
     mcefQuery(str);
  }

}

/**
 * При добавлении шалкера необходимо оставить запись об этом в базе
 * А при извлечении шалкера, необходимо очистить запись 
 */
function shalkerWriteToDB (pos, placeShalker){
    let data;
    if(placeShalker){
        data = {
          "pos": pos,
          "item": body.id,
          "tso": getTime() + MONTH
        }
    }
    else{
        data = {
          "pos": pos,
          "item": "",
          "tso": 0
        }
    }
    fetch(api.update_storage, {
            method: 'POST',
            body: JSON.stringify(data)
    })
    .then( r => DEV&&console.log(r.status, api.update_storage) )
    .catch( err => console.error(err) )
}

/**
 * Если сообщение небыло отправлено, то возвращаем шалкер
 * и очищаем запись о нём в  базе
 */

onDestroy(()=>{
  if(!SEND) {
    shalkerWriteToDB(_pos, false) 
   // shalkerFlag = false
    //transitionShalker()
  }
})

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
          <input type="number" placeholder="Слот" bind:value={slot} min="0" max="8">
          <button class="attach { body.tax>0&&/[0-8]/i.test(slot)&&slot<9?'tax-active':''}" on:click={transitionShalker}>{shalkerFlag?'Разместить':'Отмена'}</button>
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
  height: 75%;
}



.controls{
  display: flex;
  justify-content: space-between;
}
.controls input{
  width: 160px;
  text-align: center;
}
.send{
  width: 100%;
}
.attach{
  pointer-events: none;
  opacity: 0.4;
  width: 160px;
}
.tax-active{
  pointer-events: all;
  opacity: 1;
}
</style>