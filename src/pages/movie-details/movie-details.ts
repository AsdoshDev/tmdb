import { MovieService } from './../../components/movie/movie.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
})
export class MovieDetailsPage implements OnInit{
  id;
  movieDtls;
  movie;

  constructor(private service:MovieService, public navCtrl: NavController, public navParams: NavParams) {
   // console.log(navParams);
    this.movie = navParams.data.movie;
  }

ngOnInit() {
  if(this.movie && this.movie.id){
    if(this.movie.category === "movie"){
      this.service.getMovieDtls(this.movie.id).subscribe(response => {
        this.movieDtls = response.json();;
        console.log(this.movieDtls);
         this.movieDtls.imagePath = this.movie.imagePath;
        // let targetMovie = this.movies.find(x => x.id === movie.id);
        // if(targetMovie) {
        //   movie.imagePath = targetMovie.imagePath;
        //   movie.logoPath = targetMovie.logoPath;
  
        // }
      });
    }
    else{
      this.service.getTvDtls(this.movie.id).subscribe(response => {
        this.movieDtls = response.json();;
        console.log(this.movieDtls);
         this.movieDtls.imagePath = this.movie.imagePath;
        // let targetMovie = this.movies.find(x => x.id === movie.id);
        // if(targetMovie) {
        //   movie.imagePath = targetMovie.imagePath;
        //   movie.logoPath = targetMovie.logoPath;
  
        // }
      });
    }
   
  }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MovieDetailsPage');
  }

}
