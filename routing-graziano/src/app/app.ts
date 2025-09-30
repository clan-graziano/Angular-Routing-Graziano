import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, provideHttpClient } from '@angular/common/http'; //QUI

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
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
     this.o = this.http.get('https://stunning-space-potato-699jjrp95q7pc44jx-5002.app.github.dev/'); //QUI
     //Attacchiamo all'Observable o un metodo "observer" che verrà lanciato quando arriva la 
     //risposta
     this.o.subscribe(this.getData);
   }
   //Il metodo che notifica la risposta (nota che usiamo una "arrow function")
   getData = (d : Object) =>
   {
     this.data = d; //Notifico l’oggetto ricevuto dal server
     this.loading = false;  // Notifico che ho ricevuto i dati
     console.log(this.data); //Stampo su console
   }

  ngOnInit(): void {
    this.makeRequest();
  }
}
