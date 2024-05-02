import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place?: Place;
  constructor(private activatedRoute: ActivatedRoute,
    private placeService: PlacesService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      if (p.has('placeId')) {
        this.place = this.placeService.getPlace(p.get('placeId'));
      }
      return;
    })
  }

}
