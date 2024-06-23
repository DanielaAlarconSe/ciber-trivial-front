import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modals/login/login.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TrivialComponent } from './components/trivial/trivial.component';
import { PanelComponent } from './components/panel/panel.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminNavbarComponent } from './shared/admin-navbar/admin-navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {
  PersonaComponent,
  ModalFormularioPersona,
} from './components/persona/persona.component';
import { MaterialModules } from './material.modules';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CursoComponent, ModalFormularioCurso } from './components/curso/curso.component';
import { ModalFormularioUsuario, UsuarioComponent } from './components/usuario/usuario.component';
import { ModalFormularioCuestionario, CuestionarioComponent } from './components/cuestionarios/cuestionario/cuestionario.component';

@NgModule({
  declarations: [
    AppComponent,
    TrivialComponent,
    PanelComponent,
    PersonaComponent,
    LoginComponent,
    NavbarComponent,
    AdminNavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    ModalFormularioPersona,
    ModalFormularioUsuario,
    ModalFormularioCuestionario,
    CursoComponent,
    UsuarioComponent,
    CuestionarioComponent,
    ModalFormularioCurso

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  entryComponents: [LoginComponent, ModalFormularioPersona, ModalFormularioUsuario, ModalFormularioCurso, ModalFormularioCuestionario],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
})
export class AppModule {}