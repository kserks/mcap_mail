<script>
import { flagComponent, currentMail, mails, playerName, senderPlayer} from '../store/common.js';
import api from '../utils/api.js';

// Входящие
$:mails_incoming = $mails.filter(mail => {
  if(mail.target===$playerName) return true;
}).sort().reverse()
// Исходящие
$:mails_self = $mails.filter(mail => mail.sender===$playerName).sort().reverse();


function openMail (mail, index){
    $currentMail = mail;
    $senderPlayer = mail.sender;
    changeStatus()

    if(mail.attach){
        $flagComponent = 2;
    }
    else{
        $flagComponent = 1;
    }
    //mails_incoming[index].select = true

}
function openSelfMail (mail){
    $flagComponent = 1;
    $currentMail = mail;
    $senderPlayer = mail.sender;
}

// отмечаем сообщения как прочитанные
function changeStatus (){
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
}

</script>

<div>
  <h3>Входящие</h3>
  <ul class="mails">
          {#each mails_incoming as mail, index}
              <li on:click={()=>{openMail(mail, index)}} class="{mail.status===0?'unread':'read'} ">{mail.subject}</li>
          {/each}
  </ul>
  <h3>Отправленные</h3>
  <ul class="mails">
          {#each mails_self as mail, index}
              <li on:click={()=>{openSelfMail(mail)}} class="{mail.status===1?'read':'unread'}">{mail.subject}</li>
          {/each}
  </ul>
</div>
<style scoped>
h3{
  padding-left: 20px;
}
ul{
  padding: 0 20px;
  overflow: auto;
  height: 230px;
}
li{
  list-style: none;
  margin-bottom: 5px;
  padding: 3px 5px;
  border-radius: 4px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
  height: 28px;
  color: gray;
}
li:hover{
  cursor: pointer;
}

.read{
    background-color: rgba(0,100,100,0.1);
}
.unread{
  background-color: rgba(0,100,100,0.3);
}

</style>