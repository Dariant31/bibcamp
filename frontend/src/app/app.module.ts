import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from '@app/config/guard/auth.guard';
import {AuthUtils} from '@app/shared/utils/auth.utils';
import {SharedModule} from '@app/shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {MainModule} from '@app/view/main/main.module';
import {AuthModule} from '@app/view/auth/auth.module';
import {ClientModule} from '@api/angular/client.module';
import {environment} from '../environments/environment';
import {BASE_PATH} from '@api/angular/client';
import {httpInterceptorsProvider} from '@app/config/interceptor/_index';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        // OAS3 Client
        ClientModule,

        // NgRx Modules
        StoreModule.forRoot({}, {
            runtimeChecks: {
                strictStateImmutability: false,
                strictActionImmutability: false
            }
        }),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: true, // Restrict extension to log-only mode
        }),

        // Bibsurfer Component Module
        SharedModule,
        MainModule,
        AuthModule,
    ],
    providers: [
        AuthGuard,
        AuthUtils,
        httpInterceptorsProvider,
        {
            provide: BASE_PATH,
            useValue: environment.api_url
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
