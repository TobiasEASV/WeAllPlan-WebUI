import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {environment} from "../../environments/environment";
import {CredentialResponse} from "google-one-tap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private googleClientId = environment.googleClientId
  @ViewChild('googleButton') googleButton: ElementRef = new ElementRef({});
  email: any;
  password: any;

  constructor(public loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: this.googleClientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        this.googleButton.nativeElement,
        {
          type: "standard", theme: "outline",
          size: "large"
        }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {
      });
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.loginService.LoginWithGoogle(response.credential);
  }

  Register() {
    this.router.navigate(['Register']);
  }
}
