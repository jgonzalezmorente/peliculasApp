import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  texto: string = '';
  movies: Movie[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map( params => params['texto']),
      tap( texto => this.texto = texto ),
      switchMap( texto => this.peliculasService.buscarPeliculas( texto ) )
    ).subscribe( movies => this.movies = movies );
  }

}
