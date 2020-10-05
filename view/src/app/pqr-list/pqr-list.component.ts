import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PqrService } from '../pqr.service';
import { environment } from '../../environments/environment';
import { PqrReports } from '../interfaces/pqr-reports';
import { PqrReport } from '../interfaces/pqr-report';
import * as moment from 'moment-timezone';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-pqr-list',
  templateUrl: './pqr-list.component.html',
  styleUrls: ['./pqr-list.component.css'],
})
export class PqrListComponent implements OnInit {
  mapa: mapboxgl.Map;
  pqrReports: PqrReports[] = [];
  pqr_Id: number;
  pqrSelected: PqrReport;

  constructor(private pqrServ: PqrService) {
    this.pqrServ.getPqrReports().subscribe(
      (resp) => {
        this.pqrReports = resp;
        this.creteMap(this.pqrReports);
      },
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {
/*     let now = moment(new Date()).subtract(1, "days"); //todays date
    let end = moment(new Date()).weekday(6).hour(12).minute(0).second(0).tz('America/Bogota'); // another date
    let duration = moment.duration(end.diff(now));
    let hours = duration.asHours();
    console.log(hours); */
  }
  creteMap(pqrs: PqrReports[]) {
    console.log(pqrs);
    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new mapboxgl.Map({
      container: 'mapboxApp2', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.2532502, 10.4670371], // starting position
      zoom: 12, // starting zoom
    });
    // Add zoom and rotation controls to the map.
    this.mapa.addControl(new mapboxgl.NavigationControl());
    //this.crearMarcador(-74.8016862, 10.9877282);
    this.marcadoresArr();
  }
  marcadoresArr() {
    var mapabox = this.mapa;
    var reportes = this.pqrReports;
    console.log(reportes);
    reportes.forEach(function (marcador) {
      let now = moment(new Date()); //todays date
      let end = moment(marcador.solution_date); // another date
      let duration = moment.duration(end.diff(now));
      let hours = duration.asHours();
      console.log(hours);
      if (hours <= 0) {
      } else {
        new mapboxgl.Marker({
          color: '#7289DA',
        })
          .setLngLat([
            parseFloat(marcador.longitude),
            parseFloat(marcador.latitude),
          ])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h3>
                ${marcador.address}
                </h3><p>
                ${marcador.desc}
                </p>
                <p><strong>codigo:</strong>${marcador.code}</p>`
              )
          )
          .addTo(mapabox);
        console.log(marcador.longitude, marcador.latitude);
      }
    });
  }

  detallesPqr(el) {
    let parId = el.getAttribute('data-pqrId');
    // this.pqr_Id = parId;
    this.pqrServ.getPqrReport(parId).subscribe(
      (resp) => (this.pqrSelected = resp),
      (err) => console.log(err)
    );
  }
}
