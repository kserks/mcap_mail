<script>
 import { flagComponent, currentMail, balance } from '../store/common.js';

function getAttach (){
  $balance = $balance - $currentMail.price;
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
      <button class="get-attach" on:click={ getAttach }>Получить вложение ( { $currentMail.price } )</button>
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
</style>