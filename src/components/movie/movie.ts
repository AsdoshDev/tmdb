import { MovieDtlsComponent } from './../movie-dtls/movie-dtls';
import { NavController } from 'ionic-angular';
//import { GlobalApp } from './../../app/main';

import { MovieService } from './movie.service';
import { Component } from '@angular/core';
import { MovieDetailsPage } from './../../pages/movie-details/movie-details';
import * as Rx from "rxjs"; 
/**
 * Generated class for the MovieComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'movie',
  templateUrl: 'movie.html'
})
export class MovieComponent {
  md:any;
  movies:any;
  config:Object = {};
  //numbers = [{name: "karthik"},{name: "jugal"},{name: "ratna"}]
  //numbers = [1,2,3,4,5,6,7,8,9,10];
  //subscription:any;
  constructor(private service:MovieService,public navCtrl:NavController){ }
  saveConfig(response){
    console.log(this.config);
    this.config['baseUrl'] = response.images.base_url;
    this.config['logoSize'] = response.images.logo_sizes[0];
    this.config['backdropSize'] = response.images.backdrop_sizes[0];
    this.config['posterSize'] = response.images.poster_sizes[4];

    // localStorage.setItem('baseUrl',response.images.base_url);
    // localStorage.setItem('logoSize',response.images.logo_sizes[0]);
    // localStorage.setItem('backdropSize',response.images.backdrop_sizes[0]);
    // localStorage.setItem('posterSize',response.images.poster_sizes[0]);
  }

  openMovieDtls(movie){
    // this.service.getMovieDtls(id).subscribe(response => {
    //   let movie = response.json();
    //   let targetMovie = this.movies.find(x => x.id === movie.id);
    //   if(targetMovie) {
    //     movie.imagePath = targetMovie.imagePath;
    //     movie.logoPath = targetMovie.logoPath;

    //   }
     // this.navCtrl.push(MovieDtlsComponent,{movieDtls : movie});
       this.navCtrl.push(MovieDetailsPage,{movie : movie});
 //   });
  }

  addImageUrl(movies){
    for(var i=0;i<movies.length;i++){
      movies[i].imagePath = this.config['baseUrl'] + this.config['posterSize'] +this.movies[i].poster_path;
      movies[i].logoPath = this.config['baseUrl'] + this.config['logoSize'] +this.movies[i].poster_path;

    }
  }
  ngOnInit()
{
  
  // let data = Rx.Observable.from(this.numbers).flatMap(val=>val['name']);
  // console.log(data);

  // this.subscription = data.subscribe(
  //   nextValue => console.log(nextValue),
  //   error => console.log(error),
  //   () => console.log("Done")
  // );


  // Below is the better  method of using 2 services using observables.
  //by using switchMap 


  const obs1 = this.service.getConfig();
  const obs2 =  this.service.getMovies();

  Rx.Observable.from(obs1).switchMap(config => {
    this.saveConfig(config.json());
    return obs2}
  ).subscribe(response => 
  {
    this.movies= response.json();  
    this.movies  = this.movies.results ? this.movies.results :"";
    this.addImageUrl(this.movies);
  });

// Below is the normal method of using 2 services using observables.

//  this.service.getConfig().subscribe(response =>{
//       this.saveConfig(response.json());
//       this.service.getMovies().subscribe(response => {
//         this.movies= response.json();  
//         this.movies  = this.movies.results ? this.movies.results :"";
//         this.addImageUrl(this.movies);
//         console.log(this.movies);
//       })
//     });

  }
}
