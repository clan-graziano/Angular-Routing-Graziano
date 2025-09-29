import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Emoji, FRUITS, ANIMALS, VEHICLES, SPORTS } from '../models/emoji.models';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-generic',
  imports: [CommonModule],
  templateUrl: './generic.html',
  styleUrl: './generic.css'
})
export class Generic{
  //Crea un vettore di tipo Emoji e lo inizializza
  genVect: Emoji[] = [];
  //Riceve l'oggetto ActivatedRoute come dependency injection
  constructor(private route: ActivatedRoute) {
    //Gestisce i cambi di route con l'observable paramMap
    this.route.paramMap.subscribe(this.getRouterParam);
  }
 
  //Ogni volta che viene invocata la route tracks/:id, l'observable paramMap richiama questo metodo
  getRouterParam = (params: ParamMap) =>
  {
    let uri_param = params.get('id'); //Ottengo l'id dalla ParamMap
    console.log (uri_param); //Stampo su console
    //this.service.getTrack()
  if (uri_param == 'fruits') this.genVect = FRUITS;
  if (uri_param == 'animals') this.genVect = ANIMALS;
  if (uri_param == 'vehicles') this.genVect = VEHICLES;
  if (uri_param == 'sports') this.genVect = SPORTS;
  }
}