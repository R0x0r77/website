import { Routes } from '@angular/router';
import { HomeViewComponent } from './views/home/home-view.component';
import { AboutViewComponent } from './views/about-view/about-view.component';
import { CurriculumVitaeViewComponent } from './views/curriculum-vitae-view/curriculum-vitae-view.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { TechnologiesViewComponent } from './views/technologies-view/technologies-view.component';
import { BoardGamesViewComponent } from './views/board-games-view/board-games-view.component';
import { RiddlesViewComponent } from './views/riddles-view/riddles-view.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeViewComponent,
  // },
  { path: '', redirectTo: 'about', pathMatch: 'full' },
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
    // component: BoardGamesViewComponent,
    component: NotFoundComponent,
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
