import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentEditorComponent } from './components/document-editor/document-editor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'inline-editor',
    component: DocumentEditorComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
