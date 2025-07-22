import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, signal } from '@angular/core';
import { NotificationService } from '../../../../../shared/services/notification.service';

interface CastlePiece {
  col: number;
  row: number;
  name: string;
}

@Component({
  selector: 'app-castle-riddle',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './castle-riddle.component.html',
  styleUrl: './castle-riddle.component.scss',
})
export class CastleRiddleComponent {
  // for testing (the order is almost correct initially)
  // items: CastlePiece[] = [
  //   { col: 0, row: 0, name: '0-0' },
  //   { col: 1, row: 0, name: '1-0' },
  //   { col: 2, row: 0, name: '2-0' },
  //   { col: 3, row: 0, name: '3-0' },
  //   { col: 4, row: 0, name: '4-0' },
  //   { col: 0, row: 1, name: '0-1' },
  //   { col: 1, row: 1, name: '1-1' },
  //   { col: 2, row: 1, name: '2-1' },
  //   { col: 3, row: 1, name: '3-1' },
  //   { col: 4, row: 1, name: '4-1' },
  //   { col: 0, row: 2, name: '0-2' },
  //   { col: 1, row: 2, name: '1-2' },
  //   { col: 2, row: 2, name: '2-2' },
  //   { col: 3, row: 2, name: '3-2' },
  //   { col: 4, row: 2, name: '4-2' },
  //   { col: 0, row: 3, name: '0-3' },
  //   { col: 1, row: 3, name: '1-3' },
  //   { col: 2, row: 3, name: '2-3' },
  //   { col: 3, row: 3, name: '3-3' },
  //   { col: 4, row: 3, name: '4-3' },
  //   { col: 0, row: 4, name: '0-4' },
  //   { col: 1, row: 4, name: '1-4' },
  //   { col: 2, row: 4, name: '2-4' },
  //   { col: 4, row: 4, name: '4-4' },
  //   { col: 3, row: 4, name: '3-4' },
  // ];

  items: CastlePiece[] = [
    { col: 0, row: 1, name: '0-1' },
    { col: 4, row: 4, name: '4-4' },
    { col: 0, row: 2, name: '0-2' },
    { col: 0, row: 4, name: '0-4' },
    { col: 1, row: 4, name: '1-4' },
    { col: 1, row: 0, name: '1-0' },
    { col: 0, row: 3, name: '0-3' },
    { col: 2, row: 1, name: '2-1' },
    { col: 4, row: 3, name: '4-3' },
    { col: 2, row: 0, name: '2-0' },
    { col: 1, row: 2, name: '1-2' },
    { col: 1, row: 1, name: '1-1' },
    { col: 1, row: 3, name: '1-3' },
    { col: 2, row: 4, name: '2-4' },
    { col: 3, row: 0, name: '3-0' },
    { col: 0, row: 0, name: '0-0' },
    { col: 3, row: 1, name: '3-1' },
    { col: 2, row: 3, name: '2-3' },
    { col: 4, row: 1, name: '4-1' },
    { col: 3, row: 2, name: '3-2' },
    { col: 2, row: 2, name: '2-2' },
    { col: 3, row: 4, name: '3-4' },
    { col: 4, row: 0, name: '4-0' },
    { col: 3, row: 3, name: '3-3' },
    { col: 4, row: 2, name: '4-2' },
  ];

  solved = signal(false);

  constructor(private notificationService: NotificationService) {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.checkIfCorrectOrder();
  }

  checkIfCorrectOrder() {
    const elements = [...this.items];
    let index = 0;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (elements[index].col != col || elements[index].row != row) return;
        index++;
      }
    }
    this.notificationService.showSuccess(
      'Congratulations! The answer is: stronghold',
      60000
    );
    this.solved.set(true);
  }
}
