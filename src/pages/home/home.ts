import { MovieService } from './../../components/movie/movie.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private service:MovieService,) {

  }


callMyFunc(t){
  this.service.postMovieSearch(t);
}

}
