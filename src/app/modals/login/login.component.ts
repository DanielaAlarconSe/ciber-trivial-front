import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  selectedColor: string = 'default';
   usuario: Usuario;
  hide = true;
  ver = true;
   public load: boolean;
  today = new Date();
  cargando: boolean = false;
  formulario!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.load = false; this.usuario = new Usuario();
  }

  ngOnInit() {
    this.dialogRef.updateSize('60%', '75%');
    setTimeout(() => {
      this.load = true;
    }, 4000);

   this.crearFormularioLogin();
  }

  cerrarDialogo(): void {
    this.dialogRef.close();
  }

  private crearFormularioLogin(): void {
    this.formulario = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.email]], 
      contrasenia: ['', Validators.required]
    });
 
  }

  setColor(color: string): void {
    this.selectedColor = color;
  }

  // Método para realizar el inicio de sesión del usuario
  login(): void {
    this.cargando = true;
    this.usuario.username = this.formulario.get('usuario')!.value;
    this.usuario.password = this.formulario.get('contrasenia')!.value;

    // Realizar la solicitud de inicio de sesión al servicio authService
    this.authService.login(this.usuario).subscribe(
      (response) => {
        // Si el inicio de sesión es exitoso, guardar el token y redirigir al usuario según el valor del parámetro web
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        // Mostrar mensaje de éxito y redirigir
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
    
        Toast.fire({
          icon: 'success',
          title: 'Sesión iniciada correctamente',
        });
        this.cerrarDialogo();
        this.router.navigate(['/panel']);
      },
      (err) => this.fError(err)
    );
  }
  // Método para manejar errores de inicio de sesión
  fError(er: { error: { error_description: any } }): void {
    let err = er.error.error_description;
    let arr: string[] = err.split(':');
    if (arr[0] == 'Access token expired') {
      // Si el token de acceso ha expirado, redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['login']);
      this.cargando = false;
    } else {
      // Manejo de otros errores
      this.cargando = false;
    }
  }
}
