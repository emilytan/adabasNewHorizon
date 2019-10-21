import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@ada-new-horizon/api-interfaces';
import { MDCDataTableRowSelectionChangedEvent } from '@angular-mdc/web/data-table';

@Component({
  selector: 'ada-new-horizon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  selectionChangedEvent: any;

  constructor(private http: HttpClient) {}

  desserts = [
    {checked: false, name: 'Frozen yogurt', calories: 159, carbs: 24, protein: 4, comment: 'Super tasty'},
    {checked: true, name: 'Ice cream sandwich', calories: 237, carbs: 37, protein: 4.3, comment: 'I like ice cream more'},
    {checked: false, name: 'Eclair', calories: 262, carbs: 16, protein: 6, comment: 'New filling flavor'}
  ];
  
  onSelectionChanged(event: MDCDataTableRowSelectionChangedEvent): void {
    this.selectionChangedEvent = event;
    this.desserts[event.index].checked = event.selected;
  }
  
  onSelectedAll(): void {
    this.desserts.forEach(_ => _.checked = true);
  }
  
  onUnselectedAll(): void {
    this.desserts.forEach(_ => _.checked = false);
  }
}
