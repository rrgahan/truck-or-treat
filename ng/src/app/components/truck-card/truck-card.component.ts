import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-truck-card',
  templateUrl: './truck-card.component.html',
  styleUrls: ['./truck-card.component.scss'],
})
export class TruckCardComponent implements OnInit {
  @Input() public truck: any;

  constructor() {}

  ngOnInit(): void {}
}
