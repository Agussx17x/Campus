import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css'],
})
export class NosotrosComponent implements OnInit {
  images = [
    { name: 'Zellotti Gerardo', fileName: 'zellotti.jpg', url: '' },
    { name: 'Esponda Tomás', fileName: 'tomas.jpg', url: '' },
    { name: 'Cappellini Ignacio', fileName: 'cappellini.jpg', url: '' },
    { name: 'Acuña Bruno', fileName: 'bruno.jpeg', url: '' },
    { name: 'Bravo Franco', fileName: 'franco.jpeg', url: '' },
  ]; // Agrega los nombres y los nombres de archivo aquí

  constructor(private storage: AngularFireStorage) {}

  ngOnInit() {
    this.getImageUrls();
  }

  getImageUrls() {
    this.images.forEach((image) => {
      const ref = this.storage.ref('imagenes/' + image.fileName);
      ref.getDownloadURL().subscribe((url: string) => {
        image.url = url;
      });
    });
  }
}
