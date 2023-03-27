import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  public members = [
  { id: 2, name: 'Mehdi Chiboub'},
  { id: 3, name: 'Ghazal Sadeghpour'},
  { id: 1, name: 'Hedi Ben Abid'},
  { id: 4, name: 'Sam Sunny'},
  { id: 5, name: 'Youssef Jallouli'},
  { id: 6, name: 'Jeremy Fang' },
  { id: 4, name: 'Paritosh Singh' },
];
  public socialmedias = [
  {id: 7 },
  {id: 8 },
  {id: 9 },
  {id: 10 },
  ];
}