import { Component, signal, computed } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

interface Ville {
  nom: string;
  pays: string;
  temperature: number;
  ressenti: number;
  humidite: number;
  vent: number;
  condition: 'soleil' | 'nuageux' | 'pluie' | 'orage' | 'neige';
}

@Component({
  selector: 'app-meteo',
  imports: [TitleCasePipe],
  templateUrl: './meteo.html',
  styleUrl: './meteo.css'
})
export class Meteo {
  readonly villes: Ville[] = [
    { nom: 'Paris', pays: 'FR', temperature: 18, ressenti: 16, humidite: 62, vent: 14, condition: 'nuageux' },
    { nom: 'Nice', pays: 'FR', temperature: 26, ressenti: 28, humidite: 45, vent: 8, condition: 'soleil' },
    { nom: 'Bordeaux', pays: 'FR', temperature: 13, ressenti: 11, humidite: 80, vent: 22, condition: 'pluie' },
    { nom: 'Lyon', pays: 'FR', temperature: 9, ressenti: 6, humidite: 88, vent: 30, condition: 'orage' },
    { nom: 'Grenoble', pays: 'FR', temperature: -2, ressenti: -6, humidite: 75, vent: 10, condition: 'neige' },
  ];

  private indexVille = signal(0);
  ville = computed(() => this.villes[this.indexVille()]);

  selectionnerVille(i: number) {
    this.indexVille.set(i);
  }
}
