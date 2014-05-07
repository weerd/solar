<?php

Route::get('/', function()
{
	return View::make('index');
});


Route::group(array('prefix' => 'api/v1'), function()
{
    Route::get('weather', 'WeatherController@getReport');
    Route::get('nest', 'NestController@getStatus');
    Route::get('transit', 'TransitController@get');
    Route::get('citibike','BikeController@get');
});