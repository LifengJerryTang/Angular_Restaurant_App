export class Feedback {
  firstname: string = "";
  lastname: string = "";
  telnum: string = "";
  email: string = "";
  agree: boolean = false;
  contacttype: string = "";
  message: string = "";
}

export const ContactType = ['None', 'Tel', 'Email'];
