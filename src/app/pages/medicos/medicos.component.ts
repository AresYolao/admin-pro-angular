import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando = true;
  constructor(public _medicoService: MedicoService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();
    this._modalUploadService.notificacion.
    subscribe(resp => this.cargarMedicos());
  }


  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  cargarMedicos(){

    this._medicoService.cargarMedicos().subscribe(medicos => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  buscarMedicos(termino: string){

if(termino.length >= 0){
  this.cargarMedicos();
  return;
}

this._medicoService.buscarMedicos(termino).subscribe(medicos => this.medicos = medicos);
  }


  borrarMedico(medico: Medico){


    this._medicoService.borrarMedico(medico._id).subscribe(

      () => this.cargarMedicos() );
  }

}
