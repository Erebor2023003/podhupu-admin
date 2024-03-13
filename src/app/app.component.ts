import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  ngOnInit() {
    // Initialization code can go here (if you have any)
  }

  // HostListener to listen for the window:beforeunload event
  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any) {
  //   // Your logic to clear localStorage or perform other actions before the tab closes
  //   // localStorage.clear(); // Clear all localStorage data
  //   // Or, if you prefer, remove specific items:
  //   // localStorage.removeItem('yourSpecificItemKey');
  // }
}
