import { MovieService } from './../../components/movie/movie.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController,ViewController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
//import { MovieComponent } from '../../components/movie/movie';


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'search.html',
})



export class SearchPage {
  @ViewChild("searchText") inputEl: ElementRef;
  config = {};

  ngAfterViewChecked(): void {
    this.inputEl.nativeElement.focus();
  }

ngOnInit(){

      this.service.newMovieSubject.subscribe(response => {
      this.parseMovieSearchResponse(response);});
  }

  movies:Array<object>;
  searchTerm$ = new Subject<string>();
  constructor(/*private mc:MovieComponent,*/public navCtrl: NavController,private service:MovieService,   public viewCtrl: ViewController) {

    /* debounce time and distinctUntilChanged are used to reduce the number of api 
      calls on keyup during search */

  this.searchTerm$.debounceTime(400)
      .distinctUntilChanged().subscribe((term) => this.service.postMovieSearch(term));
  }


  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  

  parseMovieSearchResponse(response){
      this.movies = response.results ? response.results :"";
      this.service.getConfig().subscribe(res => {
        this.config = res;
        this.addImageUrl();
      }
      );
     
  }

  addImageUrl(){
    let movieColl = []; 
    movieColl = this.movies;
    if(this.movies){
      for(let i=0;i<movieColl.length;i++){
        movieColl[i]['imagePath'] = this.config['baseUrl'] + this.config['posterSize'] + movieColl[i]['poster_path'];
        movieColl[i]['logoPath']= this.config['baseUrl'] + this.config['logoSize'] + movieColl[i]['poster_path'];
      }
    }
   
  }

  openMovie(e,m){
    this.dismiss();
   // this.mc.openMovieDtls(e,m);
}

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
