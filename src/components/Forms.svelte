<script>
import uid from '../utils/uid.js';
import api from '../utils/api.js';
import mcefQuery from '../utils/mcef-query.js';
import { playerName, balance, senderPlayer } from '../store/common.js';
import { createEventDispatcher } from 'svelte';
//import socket from '../service/socket.js';
import { fromInvToCoords, fromCoordsToInv } from '../helpers/coords.js';


const emit = createEventDispatcher();

const MONTH = 259200; //s
function getTime (){
  return Number( ( new Date().getTime()/1000 ).toFixed() );
}

/**
 * FORM
 */
let body = {
    "id": "",
    "sender": "",
    "target": $senderPlayer,
    "subject": "",
    "body": "",
    "price": "",//num
    "tax": 0, //num
    "tso": 0,
    "status": 0
}

function send_mail (){
  if(body.target===""&&!$senderPlayer) return;

  body.id = uid();
  body.sender = $playerName;
  body.tso = getTime();
  body.price = Number( body.price )
  body.tax = Number( body.tax )
  $balance = $balance - body.tax;

  fetch(api.add_mail, {
          method: 'POST',
          body: JSON.stringify(body)
  })
  .then(()=>{
      resetForm()
      emit('update_mail_list')
      //socket.emit("send_mail", body);
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

/**
 * STORAGE
 */

function getStorage (){
  return new Promise((resolve, reject)=>{
      fetch(api.storage)
        .then(r => r.json())
        .then(data => {
            resolve(data.items)
        })
        .catch(err => console.error(err))
  })
}

/**
 * ATTACH
 */
// /itp slot 1 mcap_serg coords 636 69 -554
let slot = null;


/**
UPDATE storage
SET item = "mcap_serg_2" 
WHERE pos = "636 69 -554";
*/


async function transitionShalker (){

  const storage = await getStorage();
  //console.log(JSON.stringify(storage))
  //debugger
  const availablePlace = storage.filter(store => store.item==="")[0];
  //setItemToStorage(availablePlace.pos)
  let cmdDATA;
  if(shalkerFlag){
      cmd = fromInvToCoords(availablePlace.pos, slot, $playerName);
  }
  else{
      cmd = fromCoordsToInv(availablePlace.pos, slot, $playerName);
  }
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

  mcefQuery(str);

}




/*
function setItemToStorage (coords){
  const [ x, y, z ] = coords.split(' ');
  const params = {
   // coords,
    item: "test",
    tso: 1234
  }
  fetch(api.update_storage(params, x, y, z))
    .then(r=>{
      console.log(r)
    })
    .catch(err=>console.error(err))
}*/
/*****************/
//setItemToStorage ("636 69 -554")

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
          <button class="tax { (body.tax>0&&slot>-1)?'tax-active':''}" on:click={transitionShalker}>Разместить</button>
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