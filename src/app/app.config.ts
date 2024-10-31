import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideAnimationsAsync(),
        provideCharts(withDefaultRegisterables()),
        provideAnimations(),
        provideToastr({
            timeOut: 1800,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
    ]
};
