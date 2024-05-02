import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { IonItemSliding, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  loadedPlaces: Place[] = [];
  constructor(private placeService: PlacesService,
    private menuCtrl: MenuController,
    private router: Router) { }

  ngOnInit() {
    this.loadedPlaces = this.placeService.places;
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onEdit(offerId?: string, slidingItem?: IonItemSliding) {
    slidingItem?.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', offerId])
    console.log('offerId::', offerId)
  }
}
