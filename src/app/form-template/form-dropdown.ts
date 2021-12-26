import { FormBase } from "./form-base";

export class DropdownField extends FormBase<string> {
  override controlType = 'dropdown';
}