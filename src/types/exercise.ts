import {v4 as uuid} from 'uuid';

export class Exercise {
  name: string;
  id: string;

  constructor(name: string) {
    this.name = name;
    this.id = uuid();
  }
}
