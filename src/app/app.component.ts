import { Component, HostListener } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'campusV2';

  constructor(private authService: AuthService) {}

  @HostListener('window:click') windowClick() {
    this.authService.iniciarTemporizadorInactividad();
  }

  @HostListener('window:keydown') windowKeydown() {
    this.authService.iniciarTemporizadorInactividad();
  }
}
