import { Model, attr } from 'redux-orm';
import { LIST_SUCCESS } from '../constants/action';

export default class Label extends Model {
  static reducer(action, Label) {
    const { type, payload } = action;
    switch (type) {
      case LIST_SUCCESS:
        payload.forEach(post => {
          post.labels.forEach(label => {
            Label.upsert({
              id: label.id,
              name: label.name,
              color: label.color,
            });
          });
        });
        break;
      default: break;
    }
  }

  static get fields() {
    return {
      id: attr(),
      name: attr(),
      color: attr(),
    };
  }

  static get modelName() {
    return 'Label';
  }
}