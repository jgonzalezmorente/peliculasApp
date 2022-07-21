import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Movie, CarteleraResponse } from '../interfaces/cartelera-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';
import { MovieResponse } from '../interfaces/move-response';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage: number = 1;
  public cargando: boolean = false;

  constructor( private http: HttpClient ) { }

  get params() {
    return {
      api_key: '1b715df9a16fa7687b9206606bd3f101',
      language: 'es-ES',
      page: this.carteleraPage.toString(),
    }
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {

    if ( this.cargando ) {
      return of([]);
    }

    console.log('Cargando API');
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing`, {
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas( query: string ): Observable<Movie[]> {

    const params = { ...this.params, page: '1', query };

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results )
    );

  }

  getPeliculaDetalle( id: string ): Observable<MovieResponse | undefined> {
    return this.http.get<MovieResponse>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of( undefined ))
    );
  }

  getCast( id: string ): Observable<Cast[]> {
    return this.http.get<CreditsResponse>(`${ this.baseUrl }/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of([]))
    );
  }

}
