<script>
import { flagComponent, currentMail, balance, playerName } from '../store/common.js';
import shalker from '../methods/Shalker.js';
import getStorage from '../methods/get-storage.js';
import api from '../utils/api.js';



let slot = null;

async function getAttach (){
  $balance = $balance - $currentMail.price;
  const storage = await getStorage()
  const place = storage.find(_place => _place.item === $currentMail.id);
  shalker.from(slot, $playerName, place.pos, removeAttachFromItem)
}

/**
 * Удаляю информацию о шалкере из базы
 */
function removeAttachFromItem(){

  $currentMail.attach = false
  fetch(api.update_mail, {
          method: 'POST',
          body: JSON.stringify({...$currentMail})
  })
  .then(r => {
      slot = null
      DEV&&console.log(r.status, api.update_mail) 
  })
  .catch(err => console.error(err))
}

function add_mail(){
  $flagComponent = 0;
}

</script>

<aside class="forms">
    <div class="forms__group-input">
            <input type="text" disabled class="forms__title" value={$currentMail.subject}>
            <input type="text" disabled class="forms__to" value={$currentMail.sender}>
    </div>
    <textarea disabled value={$currentMail.body}></textarea>
    <div class="group__btns">
      <input type="number" min="0" max="8" placeholder="Слот" bind:value={slot}>
      <button class="get-attach  { /[0-8]/i.test(slot)&&slot<9?'enable':''}"  on:click={ getAttach }>Получить вложение  { $currentMail.price } </button>
      <button class="send" on:click={add_mail}>Ответить</button>
    </div>
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
  height: 78%;
}
.send{
  width: 35%;
}
.get-attach{
  flex: 1;
  margin: 0 15px 0.5em 15px;
  background-color: rgba(100, 0,0,0.1);
  pointer-events: none;
  opacity: 0.3;
}
.get-attach:hover{
  background-color: rgba(100, 0,0,0.3);
}

.group__btns{
  display: flex;
  justify-content: space-between;
}

input{
  width: 160px;
  text-align: center;
}
.enable{
  pointer-events: all;
  opacity: 1;
}

</style>