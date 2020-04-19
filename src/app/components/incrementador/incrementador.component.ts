import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  
  @ViewChild('txtPorcentaje',{static: false}) txtPorcentaje: ElementRef;
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() { 
    console.log('Leyenda: ', this.leyenda);
    console.log('porcentaje: ', this.porcentaje);
  }

  ngOnInit() {
  }

onChange(newValue: number){
  // let elemHTML: any = document.getElementsByName('porcentaje')[0];
if(newValue >= 100){
  this.porcentaje = 100
}else if(newValue <= 0){
  this.porcentaje = 0
}else{

  // elemHTML.value = this.porcentaje
  this.porcentaje = newValue;
}
this.txtPorcentaje.nativeElement.value = this.porcentaje;
this.cambioValor.emit(this.porcentaje)
}
  cambiarValor(valor){
    if(this.porcentaje >= 100 && valor > 0){
      this.porcentaje = 100;
      return;
    }
    if(this.porcentaje <= 0 && valor < 0){
      this.porcentaje = 0;
      return;
    }
    this.porcentaje = this.porcentaje + valor;
    this.cambioValor.emit(this.porcentaje);
    this.txtPorcentaje.nativeElement.focus();
  }

}
