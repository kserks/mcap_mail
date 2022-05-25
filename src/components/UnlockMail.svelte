<script>
 import { flagComponent, currentMail } from '../store/common.js';

</script>

<aside class="forms">
  <span>{$currentMail.sender}</span>
  <h3>{$currentMail.subject}</h3>
  <h3 style="color: brown">200</h3>
  <button>Разблокировать</button>
</aside>

<style scoped>

.forms{
  width: 60%;
  height: 100%;
  padding: 10px;
  background-color: rgba(0,0,0,0.3);
}
h3{
    background-color: #223;
    border-radius: 4px;
    padding: 10px;
    color: gray;
}
p{
    width: 100%;
    height: 70%;
    background-color: #223;
    border-radius: 4px;
    padding: 10px;
    margin-top: 0;
    color: gray;
    overflow: auto;
}

</style>