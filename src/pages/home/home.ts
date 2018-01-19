import { Component } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { SearchPage } from '../search/search';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public modalCtrl: ModalController) {
  }

  openSearchModal() {
    let modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }

}
