import { Component, inject, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-restricted-page',
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.css']
})
export class RestrictedPageComponent implements OnInit {

  msalService=inject(MsalService)
  constructor() { }

  ngOnInit() {
  }

  getName():string | undefined
  {
    if(this.msalService.instance.getActiveAccount() == null)
    {
      return 'unkown'
    }
    return this.msalService.instance.getActiveAccount()?.name ;
  }
}
