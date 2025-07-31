import { Routes } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { AboutViewComponent } from './views/about-view/about-view.component';
import { CurriculumVitaeViewComponent } from './views/curriculum-vitae-view/curriculum-vitae-view.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { TechnologiesViewComponent } from './views/technologies-view/technologies-view.component';
import { BoardGamesViewComponent } from './views/board-games-view/board-games-view.component';
import { RiddlesViewComponent } from './views/riddles-view/riddles-view.component';
import { ArticleComponent } from './views/home-view/article/article.component';

export const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  {
    path: 'articles',
    component: HomeViewComponent,
    // loadComponent: () => import('./views/home-view/home-view.component'),
  },
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  },
  {
    path: 'about',
    component: AboutViewComponent,
  },
  {
    path: 'cv',
    component: CurriculumVitaeViewComponent,
  },
  {
    path: 'boardgames',
    component: BoardGamesViewComponent,
  },
  {
    path: 'riddles',
    component: RiddlesViewComponent,
  },
  {
    path: 'technologies',
    component: TechnologiesViewComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
