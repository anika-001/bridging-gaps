import { FormBase } from "./form-base";

export class TextAreaField extends FormBase<string> {
  controlType = 'textarea';
}