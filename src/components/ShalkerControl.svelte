<script>
import getTime from '../utils/get-time.js'
import mcefQuery from '../utils/mcef-query.js';
import api from '../utils/api.js';
import getStorage from '../methods/get-storage.js';
import { fromInvToCoords, fromCoordsToInv } from '../helpers/coords.js';
import { onDestroy } from 'svelte';
import { playerName, balance, currentMail } from '../store/common.js';

const MONTH = 2592000; //s
let shalkerFlag = true;
let slot = null;
let tax = $currentMail.tax
let price = $currentMail.price
let _pos;
let id = $currentMail.id

/**
 * Отправляем шалкер на почту
 * И отменяем отправку в случае необходимости
 */
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
      //shalkerWriteToDB(pos, true)
      // сохраняем текущие координаты, так как при отмене шалкера
      // мы не получим уже занятую запись
      _pos = pos
  }
  else{
      cmdDATA = fromCoordsToInv(pos, slot, $playerName);
      shalkerFlag = true;
      //shalkerWriteToDB(_pos, false)
  }
  /**
   * Подготавливаем данные для выполнение команды при помощи Minecraft
   */
  const data = {
        "data": cmdDATA,
        "action": "executeCMD",
        "uuid": id,
        "type": "server",
        "dts": getTime(),
        "ars": true,
        "player": $playerName
  }
  const str = `CMD_${JSON.stringify(data)}`;

  
  !DEV && mcefQuery(str);
  
}

/**
 * При добавлении шалкера необходимо оставить запись об этом в базе
 * А при извлечении шалкера, необходимо очистить запись 
 */
/*
function shalkerWriteToDB (pos, placeShalker){
    let data;
    if(placeShalker){
        data = {
          "pos": pos,
          "item": $currentMail.id,
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
*/
/**
 * Если сообщение небыло отправлено, то возвращаем шалкер
 * и очищаем запись о нём в  базе
 */
/*
onDestroy(()=>{
  if(!SEND) {
    shalkerWriteToDB(_pos, false) 
   // shalkerFlag = false
    //transitionShalker()
  }
})

function reset (){
  shalkerFlag = true;
}
*/

</script>


<div class="controls">
      <input type="number" placeholder="Тариф" bind:value={tax}>
      <input type="number" placeholder="Стоимость" bind:value={price}>
      <input type="number" placeholder="Слот" bind:value={slot} min="0" max="8">
      <button class="attach { tax>0&&/[0-8]/i.test(slot)&&slot<9?'tax-active':''}" on:click={transitionShalker}>{shalkerFlag?'Разместить':'Отмена'}</button>
</div>

<style scoped>


.controls{
  display: flex;
  justify-content: space-between;
}
.controls input{
  width: 160px;
  text-align: center;
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