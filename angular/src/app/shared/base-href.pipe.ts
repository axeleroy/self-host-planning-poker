import { inject, Pipe, PipeTransform } from '@angular/core';
import { PathLocationStrategy } from "@angular/common";

@Pipe({
  name: 'baseHref',
  standalone: true
})
export class BaseHrefPipe implements PipeTransform {

  private pls = inject(PathLocationStrategy);

  transform(value: string): string {
    return this.pls.getBaseHref() + value;
  }

}
