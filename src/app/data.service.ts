import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http:HttpClient) { }

  getData(){
   return this._http.get('http://jsonplaceholder.typicode.com/photos?_start=0&_limit=5').pipe(map(res=>res))
  }
}
