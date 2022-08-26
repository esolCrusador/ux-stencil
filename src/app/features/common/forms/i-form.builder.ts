import { FormBuilder, ValidatorFn, FormControl, FormArray, FormGroup } from '@angular/forms';
import { IFormGroup } from './i-form-group';

export interface IFormBuilder extends FormBuilder {
  group<TForm>(
    controls: { [key in keyof TForm]: [TForm[key]]
      | [TForm[key], ValidatorFn | ValidatorFn[]]
      | FormControl
      | FormArray
      | FormGroup
    }
  ): IFormGroup<TForm>;
}
