import {v4 as uuid} from 'uuid';

export class Exercise {
  name: string;
  id: string;
  parentGroupName?: string;
  parentGroupId?: string;

  constructor(name: string, parentGroupId?: string, parentGroupName?: string) {
    this.name = name;
    this.id = uuid();
    if (parentGroupId) {
      this.parentGroupId = parentGroupId;
      this.parentGroupName = parentGroupName;
    }
  }
}
