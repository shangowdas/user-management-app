import { MessageType } from '../enum/messageType.enum';

export class ApiCallHelper {
  service!: string;
  method!: string;
  id!: string;
  params!: any;
  formData!: FormData;
  // message?: string;
  message?: any;

  messageType?: MessageType;
}
