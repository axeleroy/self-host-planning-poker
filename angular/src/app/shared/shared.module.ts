import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ContainerComponent } from './container/container.component';
import { ToastsContainerComponent } from './toast/toast-container.component';
import { TranslocoRootModule } from '../transloco-root.module';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    NavigationBarComponent,
    ContainerComponent,
    ToastsContainerComponent
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
    TranslocoLocaleModule,
    NgbModule
  ],
  exports: [
    NavigationBarComponent,
    ContainerComponent,
    TranslocoRootModule,
    TranslocoLocaleModule,
    NgbModule
  ]
})
export class SharedModule { }
