import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-Archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

imagenSubir: File;
imagenTemporal: string | ArrayBuffer;

  constructor(public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService) { 
   
  }

  ngOnInit() {
  }


  seleccionImagen(archivo: File){

    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){
      Swal.fire(
        'Solo imagenes',
        'El archivo seleccionado no es una imagen',
        'error'
      );

      this.imagenSubir = null;
      return;
    }

     this.imagenSubir = archivo;


     let reader = new FileReader();
     let urlTemp = reader.readAsDataURL(archivo);

     reader.onloadend = () => this.imagenTemporal = reader.result;

  }

  subirImagen(){
this._subirArchivoService.subirArchivo(this.imagenSubir,this._modalUploadService.tipo,this._modalUploadService.id)
.then(resp =>{
this._modalUploadService.notificacion.emit(resp);
this.cerrarModal();
}).catch(err =>{
  console.log('Error en la carga');
})
  }

cerrarModal(){
  this.imagenSubir = null;
  this.imagenTemporal = null;


  this._modalUploadService.ocultarModal();
}


}
