import { FormGroup } from '@angular/forms';
import { IFormControl } from './i-form-control';
import { IPatch } from '../models/i-patch';
import { Observable } from 'rxjs';

export interface IFormGroup<TForm> extends FormGroup, IFormControl<TForm> {
  controls: {
    [key in keyof TForm]: IFormControl<TForm[key]>;
  };

  readonly valueChanges: Observable<TForm>;

  readonly value: TForm;

  setValue(value: { [key in keyof TForm]: TForm[key]; }, options?: { onlySelf?: boolean; emitEvent?: boolean; }): void;

  patchValue(value: IPatch<TForm>, options?: { onlySelf?: boolean; emitEvent?: boolean; }): void;

  reset(value: { [key in keyof TForm]: TForm[key]; }, options?: { onlySelf?: boolean; emitEvent?: boolean; }): void;

  getRawValue(): TForm;
}
