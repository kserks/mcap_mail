<script>
import { flagComponent, currentMail, balance, playerName } from '../store/common.js';
import getStorage from '../methods/get-storage.js';
import getTime from '../utils/get-time.js'
import { fromCoordsToInv } from '../helpers/coords.js';
import api from '../utils/api.js';
import mcefQuery from '../utils/mcef-query.js';

const SLOT = 0;

let ATTACH = true

async function getShalker (){

  /**
   * Получаю запись из базы с нужным шалкером
   */
  const storage = await getStorage()
  const place = storage.find(_place => _place.item === $currentMail.id);
 
  // Формирую запрос для mcefQuery
  const cmdDATA = fromCoordsToInv(place.pos, SLOT, $playerName);

  /**
   * Подготавливаем данные для выполнение команды при помощи Minecraft
   */
  const data = {
        "data": cmdDATA,
        "action": "executeCMD",
        "uuid": place.item,
        "type": "server",
        "dts": getTime(),
        "ars": true,
        "player": $playerName
  }
  const str = `CMD_${JSON.stringify(data)}`;
  DEV&&console.log(data)
  //removeShalkerFromDB(place.pos)
  //removeAttachFromItem()
        
  if(!DEV){
    removeShalkerFromDB(place.pos)
    removeAttachFromItem()
    mcefQuery(str)
      .then( () => {
          alert()

      })
      .catch(err => console.error(err))

  }
}

/**
 * Удаляю информацию о шалкере из базы
 */
function removeShalkerFromDB (pos){
    const data = { "pos": pos, "item": "", "tso": 0 }
    fetch(api.update_storage, {
            method: 'POST',
            body: JSON.stringify(data)
    })
    .then( r => DEV&&console.log(r.status, api.update_storage) )
    .catch( err => console.error(err) )
}

function removeAttachFromItem (){
  const body = $currentMail
  body.attach = false
  fetch(api.update_mail, {
          method: 'POST',
          body: JSON.stringify(body)
  })
  .then(r=>{
      DEV&&console.log(r.status, api.update_mail) 
  })
  .catch(err=>console.error(err))
}

function getAttach (){
  $balance = $balance - $currentMail.price;
  getShalker()
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
      <button class="get-attach ${ATTACH?'':'disable'}" on:click={ getAttach }>Получить вложение ( { $currentMail.price } )</button>
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
  width: 60%;
  background-color: rgba(100, 0,0,0.1);
}
.get-attach:hover{
  background-color: rgba(100, 0,0,0.3);
}

.group__btns{
  display: flex;
  justify-content: space-between;
}
.disable{
  pointer-events: none;
  opacity: 0.2;
}
</style>