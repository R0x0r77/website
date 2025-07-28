import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-article-opener',
  standalone: true,
  imports: [MatButtonModule, DatePipe, MarkdownModule, RouterLink],
  templateUrl: './blog-article-opener.component.html',
})
export class BlogArticleOpenerComponent {
  @Input() title!: string;
  @Input() date!: string;
  @Input() excerpt!: string;
  @Input() tags: string[] = [];
  @Input() imageUrl?: string;
  @Input() readMoreLink!: string;
}
