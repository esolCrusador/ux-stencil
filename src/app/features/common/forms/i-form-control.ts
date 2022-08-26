import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export interface IFormControl<TValue> extends FormControl {
  readonly valueChanges: Observable<TValue>;
  value: TValue;
  setValue(value: TValue, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean;
  }): void;
}
