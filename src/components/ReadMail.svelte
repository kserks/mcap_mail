<script>
 import { flagComponent, currentMail } from '../store/common.js';

</script>

<aside class="forms">
  <span>{$currentMail.sender}</span>
  <h3>{$currentMail.subject}</h3>
  <p>{$currentMail.body}</p>
</aside>

<style scoped>

.forms{
  width: 60%;
  height: 100%;
  padding: 10px;
  background-color: rgba(0,0,0,0.3);
}
</style>