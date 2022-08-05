import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './components/navigation/navigation.component';

/** Shared module. */
@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavigationComponent],
})
export class SharedModule {}
