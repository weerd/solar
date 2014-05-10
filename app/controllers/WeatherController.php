<?php

use Forecast\Forecast,
    Carbon\Carbon;

class WeatherController extends BaseController
{
    public static function pusher()
    {
        $pusher = new Pusher( PUSHER_API_KEY, PUSHER_API_SECRET, PUSHER_API_APP_ID );

        return $pusher;
    }

    public static function connect()
    {
        $forecast = new Forecast(FORECAST_IO_API_KEY);

        return $forecast; 
    }

    /*
        Returns a JSON object containing current weather conditions from Forecast.io
        Forecast is cached for 10 minutes
    */
    public function getReport()
    {
        if (Cache::has('weather__current')):

            $current = Cache::get('weather__current');

        else:


            $forecast = self::connect();
            $expires = Carbon::now()->addMinutes(5);
            $current = $forecast->get('40.692902','-73.954646');

            Cache::put('weather__current', $current, $expires);

            $pusher = self::pusher();
            $pusher->trigger( 'solar', 'weather', 'refresh' );

        endif;

        return Response::json($current);
    }
}