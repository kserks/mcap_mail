<script>
import getTime from '../utils/get-time.js'
import mcefQuery from '../utils/mcef-query.js';
import api from '../utils/api.js';
import getStorage from '../methods/get-storage.js';

import { onDestroy } from 'svelte';
import { playerName, balance, currentMail, sendStatus } from '../store/common.js';
import Shalker from '../methods/Shalker.js';

const shalker = new Shalker()
let slot = null
let tax = $currentMail.tax
let price = $currentMail.price




/**
 * Отправляем шалкер на почту
 * И отменяем отправку в случае необходимости
 */
let shalkerPlaced = false
let pos

async function transitionShalker (){
  shalker.itemID = $currentMail.id
  if(shalkerPlaced){
      shalker.from(slot, $playerName, pos)
      shalkerPlaced = false
  }
  else{
      const storage = await getStorage()
      pos = storage.filter(store => store.item==="")[0].pos
      shalker.to(slot, $playerName, pos)
      shalkerPlaced = true

  }
  $currentMail.attach = shalkerPlaced
}

onDestroy(()=>{
  if($sendStatus) return
  shalker.from(slot, $playerName, pos)
})




</script>


<div class="controls">
      <input type="number" placeholder="Тариф" bind:value={tax}>
      <input type="number" placeholder="Стоимость" bind:value={price}>
      <input type="number" placeholder="Слот" bind:value={slot} min="0" max="8">
      <button class="attach { tax>0&&/[0-8]/i.test(slot)&&slot<9?'tax-active':''}" on:click={transitionShalker}>{shalkerPlaced?'Отмена':'Разместить'}</button>
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