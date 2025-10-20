import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, provideHttpClient } from '@angular/common/http'; //QUI
import { DataViewComponent } from './data-view/data-view';
import { JsonPipe } from '@angular/common';
import { serverURI } from './app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, DataViewComponent, JsonPipe, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('routing-graziano');
   data!: Object;
   loading!: boolean;
   o! :Observable<Object>;
   http: HttpClient;
  isDark: boolean = true;
  isHomePage: boolean = false;
   
  constructor(http: HttpClient, private router: Router) {
   this.http = http;
   this.router.events.subscribe(() => {
     this.isHomePage = this.router.url === '/';
   });
  }  

  makeRequest(): void {
     //Notifichiamo che stiamo attendendo dei dati
     this.loading = true; 
     //Facciamo una get e otteniamo l'oggetto Observable che attende la risposta
     this.o = this.http.get(serverURI); //QUI inserisci link
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
    // Carica preferenza tema da localStorage (se disponibile)
    try {
      const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('dark-theme') : null;
      this.isDark = stored !== null ? stored === 'true' : true;
      if (typeof document !== 'undefined' && document.body) {
        if (this.isDark) document.body.classList.add('dark-theme');
        else document.body.classList.remove('dark-theme');
      }
    } catch (e) {
      // ambiente non browser o errore di accesso: manteniamo default
      console.warn('Impossibile leggere preferenze tema:', e);
    }
  }

  toggleTheme(): void {
    try {
      this.isDark = !this.isDark;
      if (typeof document !== 'undefined' && document.body) {
        document.body.classList.toggle('dark-theme', this.isDark);
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('dark-theme', String(this.isDark));
      }
    } catch (e) {
      console.warn('Errore toggle tema:', e);
    }
  }
}
