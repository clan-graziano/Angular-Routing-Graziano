import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { serverURI } from '../app.config';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './card-detail.html',
  styleUrls: ['./card-detail.css']
})
export class CardDetailComponent implements OnInit {
  card: any;
  loading = false;
  placeholderUrl = '/assets/clash_royale_sprites/placeholder.png';
  serverURI = serverURI;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.loading = true;
    const unitName = this.route.snapshot.paramMap.get('unit');
    this.http.get(this.serverURI).subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.card = data.find((item: any) => item.Unit === unitName);
      }
      this.loading = false;
    });
  }

  getImageUrl(item: any): string {
    if (!item.image_url) return this.placeholderUrl;
    const base = this.serverURI.endsWith('/') ? this.serverURI.slice(0, -1) : this.serverURI;
    const path = item.image_url.startsWith('/') ? item.image_url : '/' + item.image_url;
    return base + path;
  }

  getOtherKeys(item: any): string[] {
    return Object.keys(item).filter(k => k !== 'Unit' && k !== 'image_url');
  }
}
