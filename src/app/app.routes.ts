import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DirectoryComponent } from './pages/directory/directory.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { TopComponent } from './pages/top/top.component';
import { PremiereComponent } from './pages/premiere/premiere.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent },

  { path: 'directorio', component: DirectoryComponent },
  { path: 'directorio/estrenos', component: PremiereComponent },

  { path: 'horario', component: ScheduleComponent },
  { path: 'top', component: TopComponent },
];
