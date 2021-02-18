import {v4 as uuid} from 'uuid';

export class FocusArea {
  name: string;
  id: string;

  constructor(name: string) {
    this.name = name;
    this.id = uuid();
  }
}
