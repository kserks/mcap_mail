<script>
 import { flagComponent, currentMail } from '../store/common.js';



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
  height: 78%;
}
.send{
  width: 100%;
}


</style>