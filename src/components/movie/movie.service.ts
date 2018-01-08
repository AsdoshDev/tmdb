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
 
}