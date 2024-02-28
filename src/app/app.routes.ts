import { Routes } from '@angular/router';
import { JKAnimeComponent } from './pages/jkanime/jkanime.component';
import { DirectoryComponent } from './pages/directory/directory.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { TopComponent } from './pages/top/top.component';
import { PremiereComponent } from './pages/premiere/premiere.component';
import { AnimeComponent } from './pages/anime/anime.component';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { ErrorComponent } from './pages/error/error.component';
import { SearchComponent } from './pages/search/search.component';
import { SpecialCasesComponent } from './pages/special-cases/special-cases.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: JKAnimeComponent },
  { path: 'error', component: ErrorComponent },
  // TODO: Español
  { path: 'directorio', component: DirectoryComponent },
  { path: 'directorio/estrenos', component: PremiereComponent },
  { path: 'directorio/:page', component: DirectoryComponent },
  { path: 'horario', component: ScheduleComponent },
  { path: 'buscar/:anime', component: SearchComponent },
  { path: 'buscar/:anime/:page', component: SearchComponent },
  // TODO: English
  { path: 'directory', component: DirectoryComponent },
  { path: 'directory/premieres', component: PremiereComponent },
  { path: 'directory/:page', component: DirectoryComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'search/:anime', component: SearchComponent },
  { path: 'search/:anime/:page', component: SearchComponent },
  // TODO: Español & English
  { path: 'data/special-cases', component: SpecialCasesComponent, canActivate: [AuthGuard]},
  { path: 'top', component: TopComponent },
  { path: ':anime', component: AnimeComponent },
  { path: ':anime/:chapter', component: ChapterComponent },

  // Ruta comodín para manejar URLs no encontradas
  { path: '**', component: ErrorComponent },
];
