import { FormBase } from "./form-base";

export class FileField extends FormBase<string> {
  override controlType = 'file';
}