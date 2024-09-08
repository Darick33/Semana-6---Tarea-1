import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { UnidadmedidaService } from '../../Services/unidadmedida.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevaunidadmedida',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './nuevaunidadmedida.component.html',
  styleUrl: './nuevaunidadmedida.component.scss'
})
export class NuevaunidadmedidaComponent implements OnInit {
  titulo = 'Nueva Unidad de Medida';
  frm_UnidadMedida: FormGroup;

  idUnidadMedida = 0;
  constructor(
    private unidadService: UnidadmedidaService,
    private navegacion: Router,
    private ruta: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.idUnidadMedida = parseInt(this.ruta.snapshot.paramMap.get('id'));
    this.frm_UnidadMedida = new FormGroup({
      Detalle: new FormControl('', [Validators.required]),
      Tipo: new FormControl('', [Validators.required])
    });
    if (this.idUnidadMedida > 0) {
      this.uno();
    }
  }

  cambio(objetoSleect: any) {
    this.frm_UnidadMedida.get('Tipo')?.setValue(objetoSleect.target.value);
  }
  uno(){
    this.unidadService.uno(this.idUnidadMedida).subscribe((x)=>{
      console.log(x);
      this.frm_UnidadMedida.patchValue(x);
      this.frm_UnidadMedida.controls['Tipo'].setValue(x.Tipo.toString());
    });
  this.titulo = 'Editar Unidad de Medida';
    
  }
  grabar() {
    let unidadmedida: IUnidadMedida = {
      Detalle: this.frm_UnidadMedida.get('Detalle')?.value,
      Tipo: this.frm_UnidadMedida.get('Tipo')?.value
    };
    if (this.idUnidadMedida == 0) {
      this.unidadService.insertar(unidadmedida).subscribe((x) => {
        Swal.fire('Exito', 'La unidad de medida se grabo con exito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    } else {
      unidadmedida.idUnidad_Medida = this.idUnidadMedida;
      this.unidadService.actualizar(unidadmedida).subscribe((x) => {
        Swal.fire('Exito', 'La unidad de medida se modifico con exito', 'success');
        this.navegacion.navigate(['/unidadmedida']);
      });
    }
  }
}
