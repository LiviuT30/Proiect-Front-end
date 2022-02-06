import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public emailul = null;

  ngOnInit(): void {
    const user = this.authService.user.getValue();
    console.log(user.email);
    this.emailul = user.email;
  }

}
