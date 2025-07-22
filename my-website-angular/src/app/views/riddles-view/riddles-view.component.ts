import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RiddleQuestion, RiddlesService } from './services/riddles.service';
import { NotificationService } from '../../shared/services/notification.service';
import { MatCardModule } from '@angular/material/card';
import { UserStore } from '../../../store/user.store';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RiddleCardComponent } from './components/riddle-card/riddle-card.component';

@Component({
  selector: 'app-riddles-view',
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RiddleCardComponent,
  ],
  templateUrl: './riddles-view.component.html',
  styleUrl: './riddles-view.component.scss',
})
export class RiddlesViewComponent implements OnInit {
  userStore = inject(UserStore);
  static riddleQuestions = signal<RiddleQuestion[]>([]);
  loggedInSignal = this.userStore.loggedIn;
  previous = this.loggedInSignal();

  constructor(
    private riddlesService: RiddlesService,
    private notificationService: NotificationService
  ) {
    effect(() => {
      const current = this.loggedInSignal();
      if (!this.previous && current) {
        this.loadRiddleQuestions();
      }
      this.previous = current;
    });
  }

  currentRiddle = computed(() => {
    return RiddlesViewComponent.riddleQuestions().find(
      (r) => r.levelReward - 1 === this.userStore.user()?.level
    );
  });

  loadRiddleQuestions() {
    this.riddlesService.getRiddleQuestions().subscribe({
      next: (questions) => {
        RiddlesViewComponent.riddleQuestions.set(questions);
      },
      error: (error) => {
        this.notificationService.showError(error);
      },
    });
  }

  ngOnInit(): void {
    if (
      this.userStore.loggedIn() &&
      RiddlesViewComponent.riddleQuestions().length < 1
    ) {
      this.loadRiddleQuestions();
    }
  }
}
