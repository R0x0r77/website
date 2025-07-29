import { Injectable } from '@angular/core';
import { environment } from '../../../../config/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Article {
  id: number;
  title: string;
  publishedDate: Date;
  markdownContent: string;
  tags: string[];
  coverImageUrl: string;
  slug: string;
  contentPreview: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  apiUrl = (environment.production ? '' : environment.apiBaseUrl) + 'api/';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}articles/full-articles`);
  }

  getArticlePreviews(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}articles`);
  }

  getArticle(slug: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}articles/${slug}`);
  }
}
