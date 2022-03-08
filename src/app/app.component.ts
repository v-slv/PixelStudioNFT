import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PixelBoard } from './engine/PixelBoard';
import { PixelBoardItem } from './engine/PixelBoardItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'PixelStudioNFT';
  tools = [];
  items: PixelBoardItem[] = [];
  board: PixelBoard;

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.board = new PixelBoard('board');
    this.items = this.board.items;
  }

  addItem() {
    this.board.addItem();
    //this.items = this.board.items;
  }
}
