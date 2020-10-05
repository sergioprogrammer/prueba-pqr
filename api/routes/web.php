<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('infrastrcucture', 'infrastructureController');

Route::resource('neighborhood', 'neighborhoodController');

Route::resource('known-reports', 'known_reportsController');

Route::resource('pqr-reports', 'pqrController');

Route::get('getAReport/{id}','PqrController@getAReport');

Route::get('getAReportByAddress/{address}','PqrController@getAReportByAddress');

Route::get('reportsNH','PqrController@totalReportsByNH');

Route::get('reportsByMonth', 'PqrController@totalReportsByMonth');

Route::get('knownIssuesThisMonth', 'PqrController@currentMonthKnownIssues');

