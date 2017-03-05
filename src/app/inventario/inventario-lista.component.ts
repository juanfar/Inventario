import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from './inventario.service';
import { Inventario } from './inventario';
/*import { slide } from './animations';*/

@Component({
	selector: 'inventario-list',
	templateUrl: './inventario-lista.component.html'
	/*animations: [slide]*/
})

export class InventarioListaComponent implements OnInit {
	lista: Inventario[];
	
	/*@HostBinding('@routeAnimation') routeAnimation = true;
	@HostBinding('style.display') display = 'block';
	@HostBinding('style.position') position = 'absolute';*/

	constructor(
		private router: Router,
		private servicio: InventarioService
	) { }

	ngOnInit() {
		this.servicio.getInventarios()
			.subscribe(
				rs => this.lista = rs,
				er => console.log(er),
				() => console.log(this.lista)
			)
	}

	Editar(item: Inventario) {
		let link = ['/inventario/detalle', item.id];
		this.router.navigate(link);
	}

	Borrar(item: Inventario) {
		if(!item) return;

		this.servicio.delInventario(item.id)
					.subscribe(
						rs => console.log(rs),
						er => console.log(er),
						() => {
							this.lista = this.lista.filter(h => h !== item)
						}
					)
	}
}