import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PqrService } from '../pqr.service';
import { Infrastructures } from '../interfaces/infrastructures';
import { Neighborhoods } from '../interfaces/neighborhoods';
import { KnownReports } from '../interfaces/known-reports';
import { environment } from '../../environments/environment';
import * as moment from 'moment-timezone';
import * as mapboxgl from 'mapbox-gl';
//import {  } from "module";
import Swal from 'sweetalert2';
import { PqrReport } from '../interfaces/pqr-report';

@Component({
  selector: 'app-pqr-form',
  templateUrl: './pqr-form.component.html',
  styleUrls: ['./pqr-form.component.css'],
})
export class PqrFormComponent implements OnInit {
  mapa: mapboxgl.Map;
  globalMarker = new mapboxgl.Marker({
    draggable: true,
    color: '#7289DA',
  });
  pqrForm: FormGroup;
  infrastructures: Infrastructures[] = [];
  neighborhoods: Neighborhoods[] = [];
  knownreports: KnownReports[] = [];
  //pqrLng: number;
  pqrQuery: PqrReport;
  isLoaded: boolean = false;
  idE;
  day: number = moment().day();
  date: string = moment().format('YYYY-MM-DD');

  constructor(private formBuilder: FormBuilder, private pqrServ: PqrService) {}

  ngOnInit(): void {
    //console.log(this.marcador, 'hola')
    this.makeForm();
    console.log(this.date, this.day)

    this.pqrServ.getInfrastructures().subscribe(
      (resp) => (this.infrastructures = resp),
      (err) => console.log(err)
    );

    this.pqrServ.getNeighborhoods().subscribe(
      (resp) => (this.neighborhoods = resp),
      (err) => console.log(err)
    );

    this.pqrServ.getKnownReports().subscribe(
      (resp) => (this.knownreports = resp),
      (err) => console.log(err)
    );
    /**
     *  SECCIÓN MAPBOX
     */
    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.mapa = new mapboxgl.Map({
      container: 'mapboxApp', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.2532502, 10.4670371], // starting position
      zoom: 12, // starting zoom
    });
    // Add zoom and rotation controls to the map.
    this.mapa.addControl(new mapboxgl.NavigationControl());
    this.crearMarcador(-73.2532502, 10.4670371);
  }

  /**
   *  AQUI TERMINA
   */

  makeForm() {
    this.pqrForm = this.formBuilder.group({
      main_st: ['', [Validators.required]],
      first_st: ['', [Validators.required]],
      second_st: ['', [Validators.required]],
      st_num: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      desc: [''],
      infrastructure: ['', [Validators.required]],
      code: [''],
      neighborhood: ['', [Validators.required]],
      phone_num: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      date_picked: ['', [Validators.required]],
      known_report: ['', [Validators.required]],
      lng: ['', [Validators.required]],
      lat: ['', [Validators.required]],
    });

    /*       this.pqrForm.get('first_st').disable();
      this.pqrForm.get('second_st').disable();
      this.pqrForm.get('st_num').disable(); */
  }

  focusOutService() {
    let address: string;
    if (this.pqrForm.get('main_st').value.length === 0 || this.pqrForm.get('first_st').value.length === 0 || this.pqrForm.get('second_st').value.length === 0 || this.pqrForm.get('st_num').value.length === 0) {

    }else{
      Swal.fire({
        title: 'Un momento!',
        html: 'Verificando si existe un reporte en esta dirección...',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      address = `${this.pqrForm.controls.main_st.value}+${this.pqrForm.controls.first_st.value}+No+${this.pqrForm.controls.second_st.value}-${this.pqrForm.controls.st_num.value}`;
      this.pqrServ.getAReportByAddress(address).subscribe(
        (resp) => this.fillPqr(resp),
        (err) => console.log(err)
      );
    }
  }

  fillPqr(val: PqrReport) {
    if(val != undefined){
      this.isLoaded = true;
      let datePickedFormat = moment(val.date_picked)
      .tz('America/Bogota')
      .format('yyyy-MM-DDTHH:mm:ss');
      this.pqrForm.get('name').setValue(val.name);
      this.pqrForm.get('lastname').setValue(val.last_name);
      this.pqrForm.get('desc').setValue(val.desc);
      this.pqrForm.get('date_picked').setValue(datePickedFormat);
      this.pqrForm.get('desc').setValue(val.desc);
      this.pqrForm.get('phone_num').setValue(val.phone_num);
      this.pqrForm.get('lat').setValue(val.latitude);
      this.pqrForm.get('lng').setValue(val.longitude);
      this.pqrForm.get('code').setValue(val.code);
      this.pqrForm.get('known_report').setValue(val.known_reports_id);
      this.pqrForm.get('neighborhood').setValue(val.neighborhood_id);
      this.pqrForm.get('infrastructure').setValue(val.infrastructure_id);
      this.crearMarcador(parseFloat(val.longitude), parseFloat(val.latitude));
      this.mapa.setCenter([parseFloat(val.longitude), parseFloat(val.latitude)]);
      this.mapa.setZoom(14);
      localStorage.setItem('id', JSON.stringify(val.id));
    }else{
      this.isLoaded = false;
    }
  }

  crearMarcador(lng: number, lat: number) {
    var longitud = this.pqrForm.get('lng');
    var latitud = this.pqrForm.get('lat');
    var marker = this.globalMarker;
    /* var marker = new mapboxgl.Marker({
      draggable: true,
      color: '#7289DA',
    })
      .setLngLat([lng, lat])
      .addTo(this.mapa);  */
    this.globalMarker.setLngLat([lng, lat]).addTo(this.mapa);
    this.globalMarker.on('dragend', onDragEnd);
    function onDragEnd() {
      var lngLat = marker.getLngLat();
      // console.log(longitud.value);
      longitud.setValue(lngLat.lng);
      latitud.setValue(lngLat.lat);
    }
  }

  /*   onChanges(): void {
    this.pqrForm.get('name').valueChanges.subscribe(val => {
      console.log(this.pqrForm.controls.name.value);
    });
  } */

  OnSubmit() {

    const currentTime = moment();
    let currentFormDate = this.pqrForm.controls.date_picked.value;
    let solutionDate;
    console.log(currentFormDate);
      if (moment(currentFormDate).day() === 0){
        currentFormDate = moment().add(1, 'days').set('hour', 6).set('minute', 0).set('second',0).format('YYYY-MM-DD HH:mm:ss');
        solutionDate = moment().add(4, 'days').set('hour', 6).set('minute', 0).set('second',0).format('YYYY-MM-DD HH:mm:ss');
        console.log(currentFormDate);
        console.log(solutionDate);
      }
      if (moment(currentFormDate).day() === 6 && currentTime.isAfter(moment('13:00 p', "HH:mm a"))) {
        currentFormDate = moment().add(1, 'days').set('hour', 6).set('minute', 0).set('second',0).format('YYYY-MM-DD HH:mm:ss');
        solutionDate = moment().add(4, 'days').set('hour', 6).set('minute', 0).set('second',0).format('YYYY-MM-DD HH:mm:ss');
        console.log(currentFormDate);
        console.log(solutionDate);
      };
      if(moment(currentFormDate).day() != 0 && moment(currentFormDate).day() != 6){
        solutionDate = moment(currentFormDate)
        .tz('America/Bogota')
        .add(3, 'days')
        .format('YYYY-MM-DD HH:mm:ss');
      }
    this.idE = JSON.parse(localStorage.getItem('id'));
    let formatedAddress: string = `${this.pqrForm.controls.main_st.value} ${this.pqrForm.controls.first_st.value} No ${this.pqrForm.controls.second_st.value}-${this.pqrForm.controls.st_num.value}`;
    Swal.fire({
      title: '¿Deseas continuar?',
      text: 'Estas a un paso de enviar el reporte',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      const data = {
        name: this.pqrForm.controls.name.value,
        last_name: this.pqrForm.controls.lastname.value,
        address: formatedAddress,
        date_picked: this.pqrForm.controls.date_picked.value,
        solution_date: solutionDate,
        desc: this.pqrForm.controls.desc.value,
        phone_num: this.pqrForm.controls.phone_num.value,
        latitude: this.pqrForm.controls.lat.value.toString(),
        longitude: this.pqrForm.controls.lng.value.toString(),
        code: this.pqrForm.controls.code.value,
        known_reports_id: parseInt(this.pqrForm.controls.known_report.value),
        neighborhood_id: parseInt(this.pqrForm.controls.neighborhood.value),
        infrastructure_id: parseInt(this.pqrForm.controls.infrastructure.value),
      };
      if (result.value) {
        if (this.isLoaded === true) {
          this.pqrServ.updatePqr(data, parseInt(this.idE)).subscribe( resp => console.log(resp))
          console.log(this.idE);
        }else{

          this.pqrServ.createPqr(data).subscribe(
            () => Swal.fire('¡Listo!', 'Reporte enviado con Exito', 'success'),
            () =>
              Swal.fire('ERROR!', 'Algo ha fallado intente mas tarde', 'error')
          );
        }
        this.pqrForm.reset();
        console.log(data);
      }
    });
  }
}
