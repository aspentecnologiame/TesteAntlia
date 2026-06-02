// angular import
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { email, Field, form, minLength, required } from '@angular/forms/signals';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth-signin',
  imports: [CommonModule, RouterModule, SharedModule, Field],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent {
  private cd = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  private router = inject(Router);

  submitted = signal(false);
  error = signal('');
  showPassword = signal(false);
  loading = signal(false);

  loginModal = signal<{ email: string; password: string }>({
    email: 'dev@antlia.com.br',
    password: 'Abcd1234@'
  });

  loginForm = form(this.loginModal, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters' });
  });

  onSubmit(event: Event) {
    this.submitted.set(true);
    this.error.set('');
    event.preventDefault();

    // Validar cada campo
    const emailErrors = this.loginForm.email().errors();
    const passwordErrors = this.loginForm.password().errors();

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      return;
    }

    this.loading.set(true);
    const credentials = this.loginModal();

    this.authService
      .login(credentials)
      .then(() => {
        this.loading.set(false);
        // Redirecionar para movimentos manuais após login bem-sucedido
        this.router.navigate(['/dashboard/movimentos-manuais']);
      })
      .catch((err) => {
        this.loading.set(false);
        this.error.set('Credenciais inválidas. Tente novamente.');
        this.cd.detectChanges();
      });
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }
}

