
import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


/**
 * Generated class for the MovieDtlsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */


 @Component({
  selector: 'movie-dtls',
  templateUrl: 'movie-dtls.html'
})
export class MovieDtlsComponent {
id:any;
  movieDtls;
  Math: any;
  rating:number;
  

  constructor(private navParams:NavParams) {
    this.Math = Math;
 
  }

  ngOnInit(){
    this.movieDtls = this.navParams.get('movieDtls');
    if(this.movieDtls){
      // this.rating =this.Math.round(this.movieDtls.vote_average/2);
      // this.movieDtls['fullRating'] = Array(this.rating).fill(this.rating-1); 
      // this.movieDtls['emptyRating'] = Array(5- this.rating).fill((5-this.rating)-1);
      // debugger;
     } // [4,4,4,4,4]
    //this.movieCom.addImageUrl(this.movieDtls);
  }
}
