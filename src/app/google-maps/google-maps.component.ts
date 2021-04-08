import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

declare var google

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {
    @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

    public map: any;
    public markers: any[] = [];

    constructor(){ }

    ngOnInit(){
        this.initMap();
    }

    private initMap() {

        Geolocation.getCurrentPosition().then((position) => {

            console.log(position);

            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            let mapOptions = {
                center: latLng,
                zoom: 15
            };

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            console.log('got a map', this.map)

        }, (error) => {

            console.log('Could not initialise map', error);

        });
    }

    public addMarker(lat: number, lng: number): void {

        let latLng = new google.maps.LatLng(lat, lng);

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });

        this.markers.push(marker);

    }

}


