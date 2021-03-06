//import { MovieDtlsComponent } from './../movie-dtls/movie-dtls';
import { NavController } from 'ionic-angular';
//import { GlobalApp } from './../../app/main';

import { MovieService } from './movie.service';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { MovieDetailsPage } from './../../pages/movie-details/movie-details';
import * as Rx from "rxjs"; 
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
//import { ViewChild } from '@angular/core';
//import { Slides } from 'ionic-angular';
/**
 * Generated class for the MovieComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Pipe({ name: 'keys',  pure: false })

export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
      return Object.keys(value)//.map(key => value[key]);
  }
}
@Component({
  selector: 'movie',
  templateUrl: 'movie.html',
 
})


export class MovieComponent {
  //@ViewChild(Slides) slides: Slides;
  md:any;
  movies;
  sections = {
    'topRated' : 'Top Rated Movies',
    'popular'  : 'Popular Movies',
    'topRatedTv' : 'Top Rated TV Shows',
    'popularTv' : 'Popular TV Shows'
  };

  constructor(private service:MovieService,public navCtrl:NavController,public  loader:LoadingController){ }

  ngAfterViewInit() {
   // this.slides.autoplay();
    //this.slides.resize();  
    //this.slides.enableKeyboardControl(true);  
  }

  movieSections = {};
  popularTv:boolean = false;
  topRated:boolean = false;
  popular:boolean = false;
  topRatedTv:boolean = false;
  config:Object = {};
  //numbers = [{name: "karthik"},{name: "jugal"},{name: "ratna"}]
  //numbers = [1,2,3,4,5,6,7,8,9,10];
  //subscription:any;
  toggleSection(event){
   if(event.target.id === "topRated")
      this.topRated = !this.topRated;
    if(event.target.id === "popular")
      this.popular = !this.popular;
    if(event.target.id === "topRatedTv")
      this.topRatedTv = !this.topRatedTv;
    if(event.target.id === "popularTv")
      this.popularTv = !this.popularTv;
}

  openMovieDtls(event,movie){

    // Loader for the service all 
    this.loader.create({
      spinner: "crescent",
      duration: 800
    }).present();
    
    if(event.currentTarget.id === 'tv')
      movie.category = "tv";
      else
      movie.category = "movie";

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

  addImageUrl(movieType){
    let movieColl:[{}]; 
    movieColl = this.movieSections[movieType];
    for(let i=0;i<movieColl.length;i++){
      movieColl[i]['imagePath'] = this.config['baseUrl'] + this.config['posterSize'] + movieColl[i]['poster_path'];
      movieColl[i]['logoPath']= this.config['baseUrl'] + this.config['logoSize'] + movieColl[i]['poster_path'];
    }
  }


parseMovieResponse(response) {
  for (let key in response) {  
      let movieSection = response[key].json();  
      this.movieSections[key] = movieSection.results ? movieSection.results :"";
      this.addImageUrl(key);
  }
  console.log(this.movieSections);
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
  const obs2 =  this.service.getMovies('top_rated');
  const obs3 =  this.service.getMovies('popular');
  const obs4 =  this.service.getTvshows('top_rated');
  const obs5 =  this.service.getTvshows('popular');

/* use combineLatest to get multiple observables */

 let combineObs = obs2.combineLatest([obs3,obs4,obs5], 
    (topRated, popular,topRatedTv, popularTv) => { 
        return {topRated: topRated, popular: popular,topRatedTv: topRatedTv, popularTv: popularTv};
    });

  Rx.Observable.from(obs1).switchMap(config => {
     this.config = config;
    return Rx.Observable.from(combineObs)
    }
  ).subscribe(response => {
    this.parseMovieResponse(response);
  });

  }
}
