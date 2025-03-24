import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, InteractionRequiredAuthError } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,RouterLink,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  apiResponse:string | undefined;
  constructor(private readonly msalService: MsalService, private httpClient:HttpClient) {}

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

  callProfile()
  {
    this.httpClient.get('https://graph.microsoft.com/v1.0/me').subscribe(res=>{
      this.apiResponse=JSON.stringify(res);
    })
  }
  callMessage()
  {
    this.httpClient.get('https://graph.microsoft.com/v1.0/me/messages').subscribe(res1=>{
      this.apiResponse=JSON.stringify(res1);
    })
  }

}
