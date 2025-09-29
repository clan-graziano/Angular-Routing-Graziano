import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-fruits',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './fruits.html',
  styleUrls: ['./fruits.css']
})
export class Fruits {
  fruits = [
       { name: 'l3ineb', emoji: '🍇' },
      { name: 'btikha', emoji: '🍈' },
      { name: 'della7a', emoji: '🍉' },
      { name: 'limouna', emoji: '🍊' },
      { name: '7ameDa', emoji: '🍋' },
      { name: 'banana', emoji: '🍌' },
      { name: 'ananaSa', emoji: '🍍' },
      { name: 'teffa7a 7emra', emoji: '🍎' },
      { name: 'teffa7a kheDra', emoji: '🍏' },
      { name: 'nGaSa', emoji: '🍐' },
      { name: 'khokha', emoji: '🍑' },
    ];

}
