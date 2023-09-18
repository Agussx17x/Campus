import { Component } from '@angular/core';

@Component({
  selector: 'app-calendary',
  templateUrl: './calendary.component.html',
  styleUrls: ['./calendary.component.css'],
})
export class CalendaryComponent {
  selected: Date | null | undefined;
}
