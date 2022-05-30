//import getStorage from './get-storage.js';
import mcefQuery from '../utils/mcef-query.js';
import api from '../utils/api.js';
import getTime from '../utils/get-time.js'
import uid from '../utils/uid.js';


class Shalker {
  MONTH = 2592000
  player
  itemID
  to (slot, player, coords){
      this.player = player
      const cmd = `itp slot ${slot} ${this.player} coords ${coords}`
      this.transition(cmd, ()=>{
          this.toDB(coords)
      })
  }
  from (slot, player, coords, callback){
      this.player = player
      const cmd = `itp coords ${coords} slot ${slot} ${this.player}`
      this.transition(cmd, ()=>{
          this.fromDB(coords)
          if(callback){
              callback()
          }
      })
  }
  // размещаем Шалкер внутри Майнкрафт
  transition (cmd, callback){
      const data = {
            "data": cmd,
            "action": "executeCMD",
            "uuid": uid(),
            "type": "server",
            "dts": getTime(),
            "ars": true,
            "player": this.player
      }
      const str = `CMD_${ JSON.stringify(data) }`;
      if(DEV) return
      mcefQuery(str)
        .then( () => callback())
        .catch(err => console.error(err))
  }
  toDB (pos){
      const data = {
              "pos": pos,
              "item": this.itemID,
              "tso": getTime() + this.MONTH
            }
      this.writeToDB(data)

  }
  fromDB (pos){
      const data = {
              "pos": pos,
              "item": "",
              "tso": 0
            }
      this.writeToDB(data)
  }
  writeToDB (data){
      fetch(api.update_storage, {
              method: 'POST',
              body: JSON.stringify(data)
      })
      .then( r => console.log(r.status, api.update_storage) )
      .catch( err => console.error(err) )
  }

}

export default new Shalker()
