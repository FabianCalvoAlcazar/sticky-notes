import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { MyStickyNotesComponent } from './components/my-sticky-notes/my-sticky-notes.component';
import { StickynoteComponent } from "./components/stickynote/stickynote.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ErrorComponent,
        HomeComponent,
        MyStickyNotesComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        CdkDrag,
        StickynoteComponent,
        SweetAlert2Module.forRoot({
            provideSwal: () => import('sweetalert2').then(({ default: swal }) => swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            }))
        }) 
    ]
})
export class AppModule { }
