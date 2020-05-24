import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService,SidebarService,SharedService,UsuarioService,LoginGuardsGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardsGuard
  ]
})
export class ServiceModule { }
