import PouchyStore from 'pouchy-store';
import * as config from '../config';

class TodosStore extends PouchyStore {
  get name() {
    return 'user';
  }

  get isUseRemote() {
    return false;
  }

  get single() {
    return this.name;
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

export default new TodosStore();
