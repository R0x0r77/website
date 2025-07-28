import { Component, computed, inject, input, OnInit } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleStore } from '../../../../store/article.store';
import { ArticleService } from '../services/article.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-article',
  imports: [MarkdownModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  slug = input.required<string>();
  readonly articleStore = inject(ArticleStore);

  constructor(
    private articleService: ArticleService,
    private notificationService: NotificationService
  ) {}

  article = computed(() =>
    this.articleStore.articles().find((article) => this.slug() === article.slug)
  );

  ngOnInit(): void {
    if (this.articleStore.articles().length === 0)
      this.articleService.getArticle(this.slug()).subscribe({
        next: (res) => this.articleStore.setArticles([res]),
        error: (error) => this.notificationService.showError(error),
      });
  }
}
