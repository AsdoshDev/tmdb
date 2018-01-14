import { MovieDtlsComponent } from './../components/movie-dtls/movie-dtls';
import { MovieService } from './../components/movie/movie.service';
import { MovieComponent } from './../components/movie/movie';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MovieDetailsPage } from '../pages/movie-details/movie-details';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule} from '@angular/http';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MovieComponent,
    MovieDtlsComponent,
    MovieDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    HttpModule
  ],
  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MovieDtlsComponent,
    MovieDetailsPage
  ],
  providers: [
    MovieService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
