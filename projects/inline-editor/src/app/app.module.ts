import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import {
  DocumentEditorAllModule,
  DocumentEditorContainerModule,
  EditorService,
  SelectionService,
  SfdtExportService,
  TextExportService,
  ToolbarService,
} from '@syncfusion/ej2-angular-documenteditor';
import { HttpClientModule } from '@angular/common/http';
import { DocumentEditorComponent } from './components/document-editor/document-editor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DocumentEditorComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RichTextEditorModule,
    DocumentEditorAllModule,
    DocumentEditorContainerModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ToolbarService,
    EditorService,
    SelectionService,
    SfdtExportService,
    TextExportService,
  ],
  bootstrap: [AppComponent],
  exports: [HeaderComponent, SidebarComponent],
})
export class AppModule {}
