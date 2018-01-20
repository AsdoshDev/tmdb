import { MovieDtlsComponent } from './../components/movie-dtls/movie-dtls';
import { MovieService } from './../components/movie/movie.service';
import { MovieComponent, KeysPipe } from './../components/movie/movie';
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
import { SearchPage } from '../pages/search/search';

@NgModule({
  declarations: [
    KeysPipe,
    MyApp,
    HomePage,
    ListPage,
    MovieComponent,
    MovieDtlsComponent,
    MovieDetailsPage,
    SearchPage
  ],
  imports: [
    BrowserModule,
    
  IonicModule.forRoot(MyApp, {}, {
    links: [
     { component: HomePage, name: 'Movies', segment: 'movies' },
     { component: MovieDetailsPage, name: 'MovieDetails', segment: 'movies/movieDetails' },
     { component: ListPage, name: 'List', segment: 'list' }
   ]
 }),
    HttpModule
  ],

  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MovieDtlsComponent,
    MovieDetailsPage,
    SearchPage
  ],
  providers: [
    KeysPipe,
    MovieService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
