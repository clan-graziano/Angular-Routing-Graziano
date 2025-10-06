import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, provideHttpClient } from '@angular/common/http'; //QUI
import { DataViewComponent } from './data-view/data-view';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, DataViewComponent, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('routing-graziano');
   data!: Object;
   loading!: boolean;
   o! :Observable<Object>;
   http: HttpClient;
   
  constructor(http: HttpClient) {
   this.http = http;
  }  

  makeRequest(): void {
     //Notifichiamo che stiamo attendendo dei dati
     this.loading = true; 
     //Facciamo una get e otteniamo l'oggetto Observable che attende la risposta
     this.o = this.http.get('https://super-couscous-jjjxx499xpr9fq9px-5000.app.github.dev/'); //QUI inserisci link
     //Attacchiamo all'Observable o un metodo "observer" che verrà lanciato quando arriva la 
     //risposta
     this.o.subscribe(this.getData);
   }
   //Il metodo che notifica la risposta (nota che usiamo una "arrow function")
getData = (d: Object) => {
  this.data = d;
  this.loading = false;
  if (Array.isArray(this.data)) {
    // Stampa ogni elemento dell'array come stringa JSON
    this.data.forEach((item, index) => {
      console.log(`Elemento ${index}:`, JSON.stringify(item));
    });
  } else {
    console.log(this.data);
  }
}

  ngOnInit(): void {
    this.makeRequest();
  }
}
