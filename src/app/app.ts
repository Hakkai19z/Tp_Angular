import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Profil } from './profil/profil';
import { Citations } from './citations/citations';
import { Meteo } from './meteo/meteo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Profil, Citations, Meteo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular-tp');
}
