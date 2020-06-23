import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { map, repeat } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';
import { NgAnalyzedModules } from '@angular/compiler';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {

  totalHospitales: number = 0;
  constructor(public http: HttpClient, public router: Router, public _usuarioService: UsuarioService) {
 
  }



  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    );
  }


  buscarHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }

  buscarHospitales(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, {nombre}).pipe(
      map((resp: any) =>  resp.hospital));
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital).pipe(
      map((resp: any) =>{ 
        Swal.fire('Hospital Actualizado', hospital.nombre, 'success');
        return resp.hospital;
      } ));
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;

     url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(map((resp: any) => {
      Swal.fire('Hospital Borrado', resp.hospital.nombre, 'success');
    }));
  }
}
