import { Pipe, PipeTransform, inject } from '@angular/core';

import { CxsPreferenceFormattingService } from './preference-formatting.service';

@Pipe({
  name: 'cxsCurrency',
  standalone: true,
  pure: false
})
export class CxsCurrencyPipe implements PipeTransform {
  private readonly formatter = inject(CxsPreferenceFormattingService);

  transform(value: string | number | null | undefined): string {
    this.formatter.preferenceVersion();
    return this.formatter.formatCurrency(value);
  }
}
