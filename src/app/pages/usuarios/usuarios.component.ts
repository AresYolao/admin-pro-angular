import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { ReturnStatement } from '@angular/compiler';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
 
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {


usuarios: Usuario[] = [] ;

desde: number = 0;

totalRegistros: number = 0;

cargando : boolean = true;

  constructor(public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.
    subscribe(resp => this.cargarUsuarios());
  }


mostrarModal(id: string){
  this._modalUploadService.mostrarModal('usuarios',id);
}

cargarUsuarios(){
  this.cargando = true;
this._usuarioService.cargarUsuarios(this.desde).
subscribe((resp: any) =>{
  console.log(resp);
  this.totalRegistros = resp.total;
  this.usuarios = resp.usuarios;
  this.cargando = false;
})
}


cambiarDesde(valor: number){

let desde = this.desde + valor;
if(desde >= this.totalRegistros){
  return;

}

if (desde < 0){
  return;
}

this.desde += valor;
this.cargarUsuarios();




}

buscarUsuario(termino: string){

  if(termino.length <= 0){
    this.cargarUsuarios();
    return;
  }
this.cargando = true;

  this._usuarioService.buscarUsuarios(termino)
  .subscribe( (usuarios: Usuario[]) =>{
    this.usuarios = usuarios;
    this.cargando = false;
  })


}

borrarUsuario(usuario: Usuario){
  if(usuario._id === this._usuarioService.usuario._id){
    Swal.fire('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
    return;
  }

  Swal.fire({
    title: 'Está seguro?',
    text: `Está Seguro que desea borrar el usuario ${usuario.nombre}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar!'
  }).then(borrar => {
    if (borrar) {

      this._usuarioService.borrarUsuario(usuario._id)
.subscribe(resp =>{
  console.log(resp);
  this.cargarUsuarios();
})

      Swal.fire(
        'Usuario Borrado!',
        `El usuario ${usuario.nombre} ha sido borrado`,
        'success'
      )
    }
  })

}

guardarUsuario(usuario: Usuario){

  this._usuarioService.actualizar(usuario).subscribe();
}



}
