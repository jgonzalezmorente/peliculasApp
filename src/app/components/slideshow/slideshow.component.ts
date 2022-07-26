import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[] = [];

  swiper!: Swiper;

  constructor() { }

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      loop: true,
    });

  }

  ngOnInit(): void {    
  }

  onSlideNext(): void {
    this.swiper.slideNext();

  }
  
  onSlidePrevious(): void {

    this.swiper.slidePrev();

  }

}
