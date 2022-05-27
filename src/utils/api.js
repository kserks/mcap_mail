import objToUrl from './obj-to-url.js';

const host = 'http://atlant.mcacademy.ru';
const pathname = host + '/reindexer/api/v1/db/mcap_mail';

export default {
  get_mails: pathname+'/namespaces/items/items',
  add_mail: pathname+'/namespaces/items/items',
  storage: pathname+'/namespaces/storage/items',
  /*
  get_place: (x, y, z)=>{
    return pathname+`?q=select%20%2a%20from%20storage%20where%20pos%20%3D%20%27${x}%20${y}%20${z}%27`
  },
  */
  update_storage: (obj, x, y, z)=>{
    const data = objToUrl(obj);
    return pathname+`?q=update%20storage%20set${data}%20where%20pos%3D%27${x}%20${y}%20${z}%27`;
  }
}