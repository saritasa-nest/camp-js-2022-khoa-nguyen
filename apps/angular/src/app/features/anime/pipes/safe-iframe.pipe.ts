import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/** Transform iframe link into safe value. */
@Pipe({
  name: 'safeIframe',
})
export class SafeIframePipe implements PipeTransform {

  public constructor(private domSanitizer: DomSanitizer) {}

  /**
   * Transform iframe link into safe value.
   * @param url Link of iframe.
   */
  public transform(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
