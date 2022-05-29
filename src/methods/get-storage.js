import api from '../utils/api.js';

export default function getStorage (){
  return new Promise((resolve, reject)=>{
      fetch(api.storage)
        .then(r => r.json())
        .then(data => {
            resolve(data.items)
        })
        .catch(err => console.error(err))
  })
}