import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/move-response';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula?: MovieResponse;
  public cast?: Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               private location: Location,
               private router: Router ) { }

  ngOnInit(): void {
    
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.peliculasService.getPeliculaDetalle( id ),
      this.peliculasService.getCast( id ),

    ]).subscribe( 
      ( [ pelicula, cast ] ) => {
        if ( !pelicula ) {
          this.router.navigateByUrl('/home');
          return;
        }
        this.pelicula = pelicula;
        this.cast = cast.filter( actor => actor.profile_path != null );
      }
    );
  }

  onRegresar(): void {
    this.location.back();
  }

}
