import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../config/environment';
import { UserStore } from '../../../../store/user.store';
import { Observable, tap } from 'rxjs';

export interface LevelUpDto {
  key: string;
  answer: string;
  currentLevel: number;
}

export interface RiddleQuestion {
  key: string;
  description: string;
  levelReward: number;
}

export interface NumberResponse {
  response: number;
  errorMessage?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RiddlesService {
  apiUrl = (environment.production ? '' : environment.apiBaseUrl) + 'api/';
  private userStore = inject(UserStore);

  constructor(private http: HttpClient) {}

  getRiddleQuestions(): Observable<RiddleQuestion[]> {
    return this.http.get<RiddleQuestion[]>(`${this.apiUrl}riddles/questions`);
  }

  levelUp(dto: LevelUpDto): Observable<NumberResponse> {
    return this.http
      .post<NumberResponse>(
        `${this.apiUrl}users/${this.userStore.user()?.userId}/levelup`,
        dto
      )
      .pipe(
        tap((res) => {
          this.userStore.levelUp(res.response);
        })
      );
  }
}
