<script>
  import { flagComponent, currentMail } from '../store/common.js';
  export let mails;
  function openMail (mail){
    $flagComponent = 1;
    $currentMail = mail;
  }
</script>

  <ul class="mails">
          {#each mails as mail}
              <li on:click={()=>{openMail(mail)}}>{mail.subject}</li>
          {/each}
  </ul>

<style scoped>

ul{
  padding: 0 20px;
  overflow: auto;
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


</style>