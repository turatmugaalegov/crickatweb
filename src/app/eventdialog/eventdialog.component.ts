import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

    this.initMap();

    this.loadGoogleMapsScript(() => {
      this.initMap(); // Rufe die Methode zum Initialisieren der Karte auf
    });
  }

  loadGoogleMapsScript(callback: () => void) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=DEIN_GOOGLE_MAPS_API_KEY`;
    script.onload = callback;
    document.body.appendChild(script);
  }

  initMap() {
    const mapOptions = {
      center: { lat: this.data.location.lat, lng: this.data.location.lng },
      zoom: 15,
    };
  
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
    const marker = new google.maps.Marker({
      position: { lat: this.data.location.lat, lng: this.data.location.lng },
      map: map,
      title: this.data.name,
    });
  }

}