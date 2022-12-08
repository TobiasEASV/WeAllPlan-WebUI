import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  email: any;
  password: any;
  keepMeLoggedIn: boolean = false;

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
        document.getElementById("buttonSpan"),
        {theme: "outline", size: "medium", width: "400"}
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {
      });
    };

    if (!localStorage.getItem('HasReloaded')) {
      localStorage.setItem('HasReloaded', 'no more reload')
      location.reload()
    } else {
      localStorage.removeItem('HasReloaded')
    }

    }


  ngAfterContentInit(): void {

  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.loginService.LogInWithGoogle(response.credential);
  }

  Register() {
    this.router.navigate(['Register']);
  }


}
