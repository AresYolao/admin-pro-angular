import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService,SidebarService,SharedService,UsuarioService,LoginGuardsGuard,SubirArchivoService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { MedicoService } from './medico/medico.service';




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
    LoginGuardsGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ]
})
export class ServiceModule { }
