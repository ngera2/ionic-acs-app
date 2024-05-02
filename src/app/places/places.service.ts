import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[] = [
    new Place('p1', 'Manhattan mansion', 'In the heart of New York City',
      'https://untappedcities.com/wp-content/uploads/2015/06/Cooper-Hewitt-Smithsonian-Design-Museum-Garden-Upper-East-Side-5th-Avenue-NYC-3-1-1024x768.jpg',
      149.90),
    new Place('p2', 'L\'Amour Toujours', 'A Romantic place in Paris',
      'https://media2.thrillophilia.com/images/photos/000/385/518/original/1661254794_Palaces_In_Paris.jpg?gravity=center&width=1280&height=642&crop=fill&quality=auto&fetch_format=auto&flags=strip_profile&format=jpg&sign_url=true',
      189.99),
    new Place('p3', 'The Foggy palace', 'Not your average city trip!',
      'https://static1.squarespace.com/static/5a2537ab1f318dcca23b2a9a/5a2547c7e4966b1287cdf62e/5bd18edd1905f44639b46fd6/1606230917103/Bourscheid+Castle+in+the+fog+-+Chateau+de+Bourscheid+-+Luxembourg+-+Bourscheid+castle+in+the+fog+during+an+autumn+sunrise+-+Fortress+Rising+from+the+Fog+-+Photography+by+Christophe+Van+Biesen+-+Landscape+and+Travel+Photographer.jpg?format=1500w',
      99.99),
  ];

  get places() {
    return [...this._places];
  }

  getPlace(placeId: string | null) {
    return { ...this._places.find(p => p.id === placeId) };
  }

  constructor() { }
}
