import { User } from './../../core/models/user.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
export class Chat {

  id?: string;
  createdAt?: string;
  isGroup?: boolean;
  title?: string;
  users?: User[];
  messages?: Message[];

}
