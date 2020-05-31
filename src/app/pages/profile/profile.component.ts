import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

imagenSubir: File;
imagenTemporal: string | ArrayBuffer;

  constructor(public _usuarioService: UsuarioService) {

    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }


  guardar(usuario: Usuario){

this.usuario.nombre = usuario.nombre;

if(!this.usuario.google){

  this.usuario.email = usuario.email;
}

this._usuarioService.actualizar(this.usuario).subscribe();

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


  cambiarImagen()
  {
   this._usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id); 
  }
}
