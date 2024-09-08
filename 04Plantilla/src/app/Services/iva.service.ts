import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IIva } from "../Interfaces/iva.interface";

@Injectable({
    providedIn: 'root'
})
export class IvaService {
  apiurl = 'http://localhost/Sexto/guias/Sexto/Proyectos/03MVC/controllers/iva.controller.php?op=';
  constructor(private lector: HttpClient) {}
    todos() {
        return this.lector.get<IIva[]>(this.apiurl + 'todos');
    }
}
