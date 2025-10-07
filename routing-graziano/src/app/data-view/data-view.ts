// ...existing code...
// ...existing code...
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { serverURI } from '../app.config';

@Component({
  selector: 'app-data-view',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './data-view.html',
  styleUrls: ['./data-view.css']
})
export class DataViewComponent implements OnInit {
  placeholderUrl = '/assets/clash_royale_sprites/placeholder.png';

  public serverURI = serverURI;

  getImageUrl(item: any): string {
    if (!item.image_url) return this.placeholderUrl;
    // Rimuove slash finale da serverURI e iniziale da image_url, poi concatena
    const base = this.serverURI.endsWith('/') ? this.serverURI.slice(0, -1) : this.serverURI;
    const path = item.image_url.startsWith('/') ? item.image_url : '/' + item.image_url;
    return base + path;
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.placeholderUrl;
  }
  getOtherKeys(item: any): string[] {
    return Object.keys(item).filter(k => k !== 'Unit');
  }
  isArray(val: any): boolean {
    return Array.isArray(val);
  }
  data: any;
  loading = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loading = true;
    this.http.get(this.serverURI)
      .subscribe((d: any) => {
        if (Array.isArray(d)) {
          this.data = d.sort((a, b) => {
            if (a.Unit < b.Unit) return -1;
            if (a.Unit > b.Unit) return 1;
            return 0;
          });
        } else {
          this.data = d;
        }
        this.loading = false;
      });
  }
}