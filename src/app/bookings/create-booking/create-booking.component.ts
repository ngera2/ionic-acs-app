import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from '../../places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() seletedPlace?: Place;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  onBookPlace() {
    this.modalCtrl.dismiss({message:'This is dummy msg'}, 'confirm', 'bookingModal');
  }
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel', 'bookingModal');
  }

}
