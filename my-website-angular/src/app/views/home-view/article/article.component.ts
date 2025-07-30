import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleStore } from '../../../../store/article.store';
import { ArticleService } from '../services/article.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-article',
  imports: [MarkdownModule, MatProgressSpinnerModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  slug = input.required<string>();
  readonly articleStore = inject(ArticleStore);
  articleLoading = signal(false);

  constructor(
    private articleService: ArticleService,
    private notificationService: NotificationService
  ) {}

  article = computed(() =>
    this.articleStore.articles().find((article) => this.slug() === article.slug)
  );

  ngOnInit(): void {
    if (!this.article()?.markdownContent) {
      this.articleLoading.set(true);
      this.articleService
        .getArticle(this.slug())
        .pipe(finalize(() => this.articleLoading.set(false)))
        .subscribe({
          next: (res) => this.articleStore.updateArticle(res),
          error: (error) => this.notificationService.showError(error),
        });
    }
  }
}
