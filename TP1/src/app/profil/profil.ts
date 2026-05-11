import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil {
  nom = 'Marie Dupont';
  titre = 'Développeuse Full Stack';
  photo = 'https://i.pravatar.cc/150?img=47';

  contacter() {
    alert(`Contacter ${this.nom}`);
  }
}
