import { Model, attr } from 'redux-orm';
import {
  LIST_SUCCESS,
  POST_SUCCESS,
} from '../constants/action';

export default class Label extends Model {
  static reducer(action, Label) {
    const { type, payload } = action;
    switch (type) {
      case LIST_SUCCESS:
        payload.forEach(post => {
          this.upsertLabels(post.labels, Label);
        });
        break;
      case POST_SUCCESS:
        this.upsertLabels(payload.labels, Label);
        break;
      default: break;
    }
  }

  static upsertLabels(labels, Label) {
    labels.forEach(label => {
      Label.upsert({
        id: label.id,
        name: label.name,
        color: label.color,      
      });
    });
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