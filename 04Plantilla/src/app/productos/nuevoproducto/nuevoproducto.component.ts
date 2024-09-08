import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { Iproveedor } from 'src/app/Interfaces/iproveedor';
import { IUnidadMedida } from 'src/app/Interfaces/iunidadmedida';
import { IIva } from 'src/app/Interfaces/iva.interface';
import { IvaService } from 'src/app/Services/iva.service';
import { ProductoService } from 'src/app/Services/productos.service';
import { ProveedorService } from 'src/app/Services/proveedores.service';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevoproductoComponent implements OnInit {
  listaUnidadMedida: IUnidadMedida[] = [];
  listaProveedores: Iproveedor[] = [];
  producto: IProducto;
  listaIva: IIva[] = [];
  titulo = '';
  frm_Producto: FormGroup;
  idProdcuto: number = 0;
  constructor(
    private uniadaServicio: UnidadmedidaService,
    private fb: FormBuilder,
    private proveedoreServicio: ProveedorService,
    private ivaService: IvaService,
    private productoService: ProductoService,
    private navegacion: Router,
    private ruta: ActivatedRoute,

  ) {}
  ngOnInit(): void {
    this.idProdcuto = parseInt(this.ruta.snapshot.paramMap.get('id'));
    this.uniadaServicio.todos().subscribe((data) => (this.listaUnidadMedida = data));
    this.proveedoreServicio.todos().subscribe((data) => (this.listaProveedores = data));
    this.ivaService.todos().subscribe((data) => this.listaIva = data); 
    
    this.crearFormulario();  
    if(this.idProdcuto> 0){

      this.uno(); 
    }

    /*
1.- Modelo => Solo el procedieminto para realizar un select
2.- Controador => Solo el procedieminto para realizar un select
3.- Servicio => Solo el procedieminto para realizar un select
4.-  realizar el insertar y actualizar

*/
  }

  uno(){
    this.productoService.uno(this.idProdcuto).subscribe(
      (res)=>{
        console.log(res);
        // this.frm_Producto.controls['Codigo_Barras'].setValue(res.Codigo_Barras);
        this.frm_Producto.patchValue(res);
      }
    )
  }

  crearFormulario() {
    /* this.frm_Producto = this.fb.group({
      Codigo_Barras: ['', Validators.required],
      Nombre_Producto: ['', Validators.required],
      Graba_IVA: ['', Validators.required],
      Unidad_Medida_idUnidad_Medida: ['', Validators.required],
      IVA_idIVA: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.min(1)]],
      Valor_Compra: ['', [Validators.required, Validators.min(0)]],
      Valor_Venta: ['', [Validators.required, Validators.min(0)]],
      Proveedores_idProveedores: ['', Validators.required]
    });*/
    this.frm_Producto = new FormGroup({
      Codigo_Barras: new FormControl('', Validators.required),
      Nombre_Producto: new FormControl('', Validators.required),
      Graba_IVA: new FormControl('', Validators.required),
      Unidad_Medida_idUnidad_Medida: new FormControl('', Validators.required),
      IVA_idIVA: new FormControl('', Validators.required),
      Cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      Valor_Compra: new FormControl('', [Validators.required, Validators.min(0)]),
      Valor_Venta: new FormControl('', [Validators.required, Validators.min(0)]),
      Proveedores_idProveedores: new FormControl('', Validators.required)
    });
  }

  grabar() {
    console.log(this.frm_Producto.value);
    this.producto = this.frm_Producto.value;
    if(this.idProdcuto > 0){
      this.producto.idProductos = this.idProdcuto;
      console.log(this.producto)
      this.productoService.actualizar(this.producto).subscribe((data) => {
        console.log(data)
        Swal.fire('Exito', 'El producto de medida se actualizo con exito', 'success');
        this.navegacion.navigate(['/productos']);
      });
    }else{

      this.productoService.insertar(this.producto).subscribe((data) => {
        Swal.fire('Exito', 'El producto de medida se grabo con exito', 'success');
        this.navegacion.navigate(['/productos']);
      });
    }
  }
}
