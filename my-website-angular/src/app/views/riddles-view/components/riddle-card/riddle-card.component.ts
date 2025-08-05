import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  LevelUpDto,
  RiddleQuestion,
  RiddlesService,
} from '../../services/riddles.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { UserStore } from '../../../../../store/user.store';
import { SnakeRiddleComponent } from '../complicated-riddles/snake-riddle/snake-riddle.component';
import { WaterContainerRiddleComponent } from '../complicated-riddles/water-container-riddle/water-container-riddle.component';
import { CastleRiddleComponent } from '../complicated-riddles/castle-riddle/castle-riddle.component';

@Component({
  selector: 'app-riddle-card',
  imports: [
    FormsModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    SnakeRiddleComponent,
    WaterContainerRiddleComponent,
    CastleRiddleComponent,
  ],
  templateUrl: './riddle-card.component.html',
  styleUrl: './riddle-card.component.scss',
})
export class RiddleCardComponent {
  currentRiddle = input<RiddleQuestion | undefined>();
  userStore = inject(UserStore);
  answer = signal<string>('');

  constructor(
    private riddlesService: RiddlesService,
    private notificationService: NotificationService
  ) {}

  allDone = computed(
    () => this.userStore.user()?.level === this.userStore.MAX_LEVEL()
  );

  onSubmitAnswer() {
    if (this.checkNuances()) return;
    const levelUpDto: LevelUpDto = {
      key: this.currentRiddle()?.key || '',
      answer: this.answer().toLowerCase(),
      currentLevel: this.userStore.user()?.level || 0,
    };
    this.riddlesService.levelUp(levelUpDto).subscribe({
      next: (res) => {
        this.notificationService.showSuccess('Your answer is correct!');
        this.userStore.levelUp(res);
        this.answer.set('');
      },
      error: (error) => {
        this.notificationService.showError(error);
      },
    });
  }

  checkNuances(): boolean {
    if (this.currentRiddle()?.levelReward === 4) {
      if (this.answer().toLowerCase() === 'shoes') this.answer.set('boots');
      if (this.answer().toLowerCase() === 'eyes') {
        this.notificationService.showSuccess(
          "That answer is good. However, there is a better one, that doesn't have anything to do with eyes. Try again.",
          20000
        );
        // stop submition
        return true;
      }
    }
    return false;
  }
}
