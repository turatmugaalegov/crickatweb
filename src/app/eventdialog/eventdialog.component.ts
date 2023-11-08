import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var google: any;

@Component({
  selector: 'app-eventdialog',
  templateUrl: './eventdialog.component.html',
  styleUrls: ['./eventdialog.component.css']
})
export class EventdialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  eventInfo: any[] = [];

  ngOnInit() {
    this.eventInfo = [
      { label: 'Event', value: this.data.name },
      { label: 'Datum', value: this.data.date },
      { label: 'Zielgruppe', value: this.data.ageRating },
      { label: 'Veranstalter', value: this.data.host },
      { label: 'Ticket Preis', value: this.data.ticketPrice },
      { label: 'Veranstaltungsort', value: this.data.location },
    ];

    this.geocodeAddress(this.data.location, (location) => {
      this.initMap(location); // Initialisiere die Karte mit den Koordinaten
    });
  }

  geocodeAddress(address: string, callback: (location: any) => void) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === 'OK' && results[0].geometry) {
        const location = results[0].geometry.location;
        callback(location);
      } else {
        console.error('Geokodierung fehlgeschlagen:', status);
      }
    });
  }

  loadGoogleMapsScript(callback: () => void) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDQNpsH91_aQmUOyJLvE9jD0InW8ueTjm8`;
    script.onload = callback;
    document.body.appendChild(script);
  }

  initMap(location: any) {
    const mapOptions = {
      center: location,
      zoom: 15,
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: this.data.name,
    });
  }

}