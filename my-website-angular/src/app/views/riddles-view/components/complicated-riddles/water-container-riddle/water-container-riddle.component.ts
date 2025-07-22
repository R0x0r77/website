import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { NotificationService } from '../../../../../shared/services/notification.service';

interface Container {
  name: string;
  capacity: number;
  volume: number;
}

@Component({
  selector: 'app-water-container-riddle',
  imports: [DragDropModule, MatCardModule],
  templateUrl: './water-container-riddle.component.html',
  styleUrl: './water-container-riddle.component.scss',
})
export class WaterContainerRiddleComponent {
  containers: Container[] = [
    { name: '3L', capacity: 3, volume: 0 },
    { name: '5L', capacity: 5, volume: 0 },
    { name: '8L', capacity: 8, volume: 8 },
  ];

  draggedContainer: Container | null = null;
  maxCapacity = Math.max(...this.containers.map((c) => c.capacity));

  constructor(private notificationService: NotificationService) {}

  onDragStart(container: Container) {
    if (container.volume > 0) {
      this.draggedContainer = container;
    }
  }

  onDrop(event: CdkDragDrop<Container>) {
    const source: Container = event.item.data;
    const target: Container = event.container.data;

    if (source === target) return;

    const available = target.capacity - target.volume;
    const pourAmount = Math.min(available, source.volume);

    source.volume -= pourAmount;
    target.volume += pourAmount;

    this.checkWinCondition();
  }

  isDroppable = (_: any, drop: { data: Container }) =>
    drop.data.volume < drop.data.capacity;

  isDraggable(container: Container) {
    return container.volume > 0;
  }

  checkWinCondition() {
    if (
      this.containers[0].volume === 0 &&
      this.containers[1].volume === 4 &&
      this.containers[2].volume === 4
    ) {
      this.notificationService.showSuccess(
        'Congratulations! The answer is: ocean',
        15000
      );
    }
  }
}
