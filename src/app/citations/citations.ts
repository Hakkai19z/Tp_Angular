import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-citations',
  templateUrl: './citations.html',
  styleUrl: './citations.css'
})
export class Citations {
  readonly citations = [
    { texte: 'La vie, c\'est comme une bicyclette, il faut avancer pour ne pas perdre l\'équilibre.', auteur: 'Albert Einstein' },
    { texte: 'Le seul moyen de faire du bon travail est d\'aimer ce que vous faites.', auteur: 'Steve Jobs' },
    { texte: 'Soyez le changement que vous voulez voir dans le monde.', auteur: 'Mahatma Gandhi' },
    { texte: 'L\'imagination est plus importante que le savoir.', auteur: 'Albert Einstein' },
    { texte: 'La créativité, c\'est l\'intelligence qui s\'amuse.', auteur: 'Albert Einstein' },
  ];

  private index = signal(0);
  citation = computed(() => this.citations[this.index()]);

  nouvellesCitation() {
    let nouvelIndex: number;
    do {
      nouvelIndex = Math.floor(Math.random() * this.citations.length);
    } while (nouvelIndex === this.index());
    this.index.set(nouvelIndex);
  }
}
