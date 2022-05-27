<script>
import { flagComponent, currentMail, mails, playerName, senderPlayer } from '../store/common.js';

function openMail (mail){
    if(mail.lock){
        $flagComponent = 2;
    }
    else{
        $flagComponent = 1;
    }
    $currentMail = mail;
    $senderPlayer = mail.sender;
}
function openSelfMail (mail){
    $flagComponent = 1;
    $currentMail = mail;
    $senderPlayer = mail.sender;

}

$:mails_incoming = $mails.filter(mail => {
  if(mail.price>0) mail.lock = true;
  if(mail.target===$playerName) return true;
});
$:mails_self = $mails.filter(mail => mail.sender===$playerName);

</script>

<div>
  <h3>Входящие</h3>
  <ul class="mails">
          {#each mails_incoming as mail, index}
              <li on:click={()=>{openMail(mail)}} class="{mail.lock?'lock':''}">{mail.subject}</li>
          {/each}
  </ul>
  <h3>Отправленные</h3>
  <ul class="mails">
          {#each mails_self as mail, index}
              <li on:click={()=>{openSelfMail(mail)}}>{mail.subject}</li>
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
  height: 150px;
}
li{
  list-style: none;
  background-color: rgba(0,100,100,0.1);
  margin-bottom: 5px;
  padding: 3px 5px;
  border-radius: 4px;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.3)
}
li:hover{
  cursor: pointer;
  background-color: rgba(0,100,250,0.1);
}

.lock{
  background-color: rgba(100, 50, 0, 0.2);

}

</style>