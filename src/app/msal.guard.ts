import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MsalService } from '@azure/msal-angular';



export const msalGuard: CanActivateFn = (route, state) => {
  const msalService=inject(MsalService)
  if(msalService.instance.getActiveAccount()==null)
  {
    return false;
  }
  return true;
};
