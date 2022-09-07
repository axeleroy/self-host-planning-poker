import { Component } from '@angular/core';

@Component({
  selector: 'spp-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: [ './navigation-bar.component.scss' ]
})
export class NavigationBarComponent {

  isCollapsed = true;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

}
