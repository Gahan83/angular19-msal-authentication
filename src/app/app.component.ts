import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private msalService: MsalService) {}

  ngOnInit(): void {
    this.initializeMsal();
  }

  private async initializeMsal(): Promise<void> {
    await this.msalService.instance.initialize();
    try {
      const result = await this.msalService.instance.handleRedirectPromise();
      if (result?.account) {
        this.msalService.instance.setActiveAccount(result.account);
      }
    } catch (error) {
      console.error('Error during MSAL initialization:', error);
    }
  }

  public isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() !=  null;
  }

  public login():void {
    //this.msalService.loginRedirect();
    this.msalService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);
      });
  }

  public logout(): void {
    this.msalService.logout();
  }
}
