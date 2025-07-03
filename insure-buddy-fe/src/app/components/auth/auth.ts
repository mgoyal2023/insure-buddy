import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, HttpClientModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
    // Add HttpClient to the constructor and use it to send a POST request
    // Note: HttpClientModule should be imported in your app module for this to work
    const { username, password } = this.loginForm.value;
    this.http.post('http://localhost:3000/auth/login', { username, password })
      .subscribe({
        next: (response: any) => {
          // Handle successful login response
          console.info('Login successful:', response);
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          // Handle login error
          console.error('Login failed:', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
