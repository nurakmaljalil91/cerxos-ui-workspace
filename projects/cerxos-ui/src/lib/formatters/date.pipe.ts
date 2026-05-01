import { Pipe, PipeTransform, inject } from '@angular/core';

import { CxsPreferenceFormattingService } from './preference-formatting.service';

@Pipe({
  name: 'cxsDate',
  standalone: true,
  pure: false
})
export class CxsDatePipe implements PipeTransform {
  private readonly formatter = inject(CxsPreferenceFormattingService);

  transform(value: string | Date | null | undefined): string {
    this.formatter.preferenceVersion();
    return this.formatter.formatDate(value);
  }
}
