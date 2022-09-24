import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit {
  constructor(private authService: AuthService) {}

  public async logout() {
    await this.authService.logout();
  }

  ngOnInit(): void {}
}
