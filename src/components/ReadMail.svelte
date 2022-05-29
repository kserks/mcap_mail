<script>
import { flagComponent, currentMail, playerName } from '../store/common.js';
import api from '../utils/api.js';

if($currentMail.status===0){
    const data = $currentMail
    data.status = 1
    fetch(api.update_mail, {
            method: 'POST',
            body: JSON.stringify(data)
    })
    .then( r => DEV&&console.log(r.status, api.update_mail) )
    .catch( err => console.error(err) )
}

function add_mail(){
  $flagComponent = 0;
}

$:player = (()=>{
  if($currentMail.sender===$playerName){
    return $currentMail.target
  }
  else{
    return $currentMail.sender
  }
})()
</script>

<aside class="forms">
    <div class="forms__group-input">
            <input type="text" disabled class="forms__title" value={$currentMail.subject}>
            <input type="text" disabled class="forms__to" bind:value={player}>
    </div>
    <textarea disabled value={$currentMail.body}></textarea>
    <button class="send" on:click={add_mail}>Ответить</button>
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
  height: 83%;
}
.send{
  width: 100%;
}


</style>