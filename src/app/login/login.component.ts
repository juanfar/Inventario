import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	titulo: string = '';
	isLogged: boolean = false;
	error: string = '';
	form: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private auth: AuthService,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.titulo = 'Login';
		this.auth.logout();
		this.crearControles();
	}

	crearControles() {
		this.form = this.fb.group({
			user: ['', Validators.required],
			pass: ['', Validators.required],
		})
	}
	login(f) {
		let token: string;
		this.auth.login(f)
				.subscribe(
					res => this.isLogged = res,
					er => console.log(er),
					() => {
						if (this.isLogged) {
							this.goInventario();
						}
						else {
							this.error = 'error';
						}
					}
				)
	}

	goInventario() {
		let link = ['/inventario'];
		this.router.navigate(link);
	}
}