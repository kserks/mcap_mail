import objToUrl from './obj-to-url.js';

const host = 'http://atlant.mcacademy.ru';
const pathname = host + '/reindexer/api/v1/db/mcap_mail';

export default {
  get_mails: pathname+'/namespaces/items/items',
  add_mail: pathname+'/namespaces/items/items',
  storage: pathname+'/namespaces/storage/items',
  update_storage: host+'/reindexer/api/put/db/mcap_mail/namespaces/storage/items',
  update_mail: host+'/reindexer/api/put/db/mcap_mail/namespaces/items/items',
}
