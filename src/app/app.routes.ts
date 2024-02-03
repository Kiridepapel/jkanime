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

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: JKAnimeComponent },

  // Ruta para manejar errores
  { path: 'error', component: ErrorComponent },

  // Rutas estáticas
  { path: 'directorio', component: DirectoryComponent },
  { path: 'directorio/estrenos', component: PremiereComponent },
  { path: 'horario', component: ScheduleComponent },
  { path: 'top', component: TopComponent },

  // Rutas dinámicas
  // Búsqueda
  { path: 'buscar', component: SearchComponent },
  { path: 'buscar/:anime', component: SearchComponent },
  { path: 'buscar/:anime/:page', component: SearchComponent },
  // Animes
  { path: ':anime', component: AnimeComponent },
  { path: ':anime/:chapter', component: ChapterComponent },

  // Ruta comodín para manejar URLs no encontradas
  { path: '**', component: ErrorComponent },
];
