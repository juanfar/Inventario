import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InventarioComponent } from './inventario.component';
import { InventarioListaComponent } from './inventario-lista.component';
import { InventarioDetalleComponent } from './inventario-detalle.component';
import { AuthGuard } from '../login/auth.guard';

const InventarioRoutes: Routes = [
	{
		path: 'inventario',
		component: InventarioComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: 'lista', pathMatch: 'full' },
			{ path: 'lista', component: InventarioListaComponent },
			{ path: 'detalle', component: InventarioDetalleComponent },
			{ path: 'detalle/:id', component: InventarioDetalleComponent }
		]

	},
]

@NgModule({
	imports: [
		RouterModule.forChild(InventarioRoutes)
	],

	exports: [
		RouterModule
	]
})

export class InventarioRoutingModule { }