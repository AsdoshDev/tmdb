import { Subject } from 'rxjs/Subject';
import { MovieService } from './../../components/movie/movie.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  searchTerm$ = new Subject<string>();
  constructor(public navCtrl: NavController,private service:MovieService,) {
  this.searchTerm$.debounceTime(400)
      .distinctUntilChanged().subscribe((term) => this.service.postMovieSearch(term));
  }

}
