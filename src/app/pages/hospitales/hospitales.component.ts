import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];

  cargando = true;

  // tslint:disable-next-line: variable-name
  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.
    subscribe(resp => this.cargarHospitales());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe(hospitales  => {
      this.hospitales = hospitales;
      this.cargando = false;
    } );
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;

    this._hospitalService
      .buscarHospitales(termino)
      .subscribe((hospitales: Hospital[]) => {
        console.log(hospitales);
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }


  actualizarHospital(hospital: Hospital) {
this._hospitalService.actualizarHospital(hospital).subscribe();


  }

  borrarHospital(hospital: Hospital) {
    this._hospitalService.borrarHospital(hospital._id).subscribe(
      () => this.cargarHospitales() );
  }


  crearHospital() {

    Swal.fire({
      title: 'Registrar Hospital',
      text: 'Ingrese nombre del hospital',
      input: 'text',
      showCancelButton: true ,
      confirmButtonColor: 'green'
      }).then((result) => {

        if (!result.value || result.value.length === 0) {
         return;
        }

        this._hospitalService.crearHospital(result.value.trim()).subscribe(() => {
           this.cargarHospitales();
         });

      // if (result.value) {
      //     Swal.fire('Result:'+ result.value);
      // }
    });
  }
}
