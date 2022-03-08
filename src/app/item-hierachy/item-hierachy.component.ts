import { Component, Input, OnInit } from '@angular/core';
import { PixelBoardItem } from '../engine/PixelBoardItem';

@Component({
  selector: 'app-item-hierachy',
  templateUrl: './item-hierachy.component.html',
  styleUrls: ['./item-hierachy.component.scss']
})
export class ItemHierachyComponent implements OnInit {

  @Input() item: PixelBoardItem;

  constructor() { }

  ngOnInit(): void {
  }

}
