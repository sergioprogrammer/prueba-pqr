import { Component } from '@angular/core';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'view';
  public ngOnInit() {

    $(document).ready(function () {
     /* $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          if ($('#sidebar').hasClass('active')){
            $('#sidebarCollapse span').text('Mostrar Sidebar')
          } else {

            $('#sidebarCollapse span').text('Ocultar Sidebar')
          }

      });*/


    $('#dismiss, .overlay').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay
        $('.overlay').removeClass('active');
    });

    $('.linkSideBar').on('click', function(){
      // hide sidebar
      $('#sidebar').removeClass('active');
      // hide overlay
      $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        // open sidebar
        $('#sidebar').addClass('active');
        // fade in the overlay
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

  });

  }
}
