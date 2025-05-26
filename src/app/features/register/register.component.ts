import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService, LoginRequest } from '../../core/services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  
  
  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      Swal.fire({
        title: 'Cargando...',
        text: 'Por favor, espere un momento.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const credentials: LoginRequest = this.loginForm.value;

      this.authService.register(credentials).subscribe({
        next: (response) => {
          Swal.close();
          this.loading = false;
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Inicio de sesión exitoso.',
              timer: 1500,
            });
            localStorage.setItem('token', response.token!);
            this.router.navigate(['']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.message,
            });
          }
        },
        error: (err) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message,
          });
          console.error(err);
        }
      });
    }
  }
}
