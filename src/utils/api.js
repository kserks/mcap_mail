const host = 'http://atlant.mcacademy.ru';
const pathname = host + '/reindexer/api/v1/db/mcap_mail/namespaces';
export default {
  get_mails: pathname+'/items/items',
  add_mail: pathname+'/items/items',
  storage: pathname+'/storage/items',
}