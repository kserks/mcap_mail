<script>
import getPlayer from '../utils/get-player.js';
import { playerName, flagComponent } from '../store/common.js';


getPlayer()
  .then(__playerName => $playerName = __playerName)
  .catch(err=>console.error(err))



let balance = 0;


function add_mail(){
  $flagComponent = 0;
}

</script>

<nav> 
      {#if $flagComponent===1}
        <img src='/icons/add-mail.svg' alt="" class="add-mail" on:click={add_mail}>
      {:else}
        <span></span>
      {/if}
      <div class="nav__group">
          {#if $playerName}
            <span class="player">{$playerName}</span>
          {/if}

          <span class="balance">{balance}</span>
      </div>
</nav>

<style scoped>
nav{
  background-color: black;
  box-shadow: 0 1px 2px rgba(0,0,0,0.3);
  height: 7%;
  display: flex;
  justify-content: space-between;
  color: gray;
  align-items: center;
  padding: 0 10px;
}

.add-mail{
  width: 20px;
  height: 20px;
}
.add-mail:hover{
  cursor: pointer;
  filter: brightness(200%);
}
.nav__group{
  display: flex;
  align-items: center;
}

.player{
  padding-right: 15px;
  display: inline-flex;
  font-size: 16px;
  align-items: center;
  padding-bottom: 3px;
}
.balance{

  font-size: 16px;
  display: inline-flex;
  align-items: center;
  color: rgba(0,100,100,0.7);
}

</style>