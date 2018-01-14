import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieService{
  rooturl:string = "https://api.themoviedb.org/3";
  apiKey:string = 'a9e7482a6c5aba9675676c73cc5ac334';
  config:any;

  constructor(private http:Http){}

  getConfig(){
    return this.http.get(this.rooturl+'/configuration?api_key='+this.apiKey)
  }
  getMovies(){
    return this.http.get(this.rooturl+'/movie/top_rated?api_key='+this.apiKey+'&language=en-US&page=1');
  }  
  getMovieDtls(id){
    return this.http.get(this.rooturl+'/movie/'+id+'?api_key='+this.apiKey)
  }

  postMovieSearch(name){
  let url = this.rooturl+'/search/movie?api_key='+this.apiKey+'&query='+name;
  //  https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher

      this.http.get(url, {})
      .toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(console.log);
    }
  }
