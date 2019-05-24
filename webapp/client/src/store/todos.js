import PouchyStore from 'pouchy-store';
import * as config from '../config';

class TodoStore extends PouchyStore {
  get name() {
    return this._name;
  }

  setName(userId) {
    this._name = `todos_${userId}`;
  }

  get urlRemote() {
    return config.COUCH_URL_LOCAL;
  }

  get optionsRemote() {
    return {
      auth: config.COUCH_DB_AUTH,
    };
  }

  sortData(data) {
    data.sort((one, two) => {
      const oneTs = one.createdAt;
      const twoTs = two.createdAt;
      if (oneTs > twoTs) return -1;
      if (oneTs < twoTs) return 1;
      return 0;
    });
  }
}

export default new TodoStore();
