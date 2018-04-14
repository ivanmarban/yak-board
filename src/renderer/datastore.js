import Datastore from 'nedb-promises'
import path from 'path'
import { remote } from 'electron'

export default Datastore.create({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db')
})
