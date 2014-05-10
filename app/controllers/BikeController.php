<?php

class BikeController extends BaseController
{
    public static function pusher()
    {
        $pusher = new Pusher( PUSHER_API_KEY, PUSHER_API_SECRET, PUSHER_API_APP_ID );

        return $pusher;
    }

    public static function connect()
    {
        $response = \Httpful\Request::get(CITIBIKE_API_ENDPOINT)->send();

        $stations = $response->body->stationBeanList;

        $pusher = self::pusher();
        $pusher->trigger( 'solar', 'transit', 'refresh' );

        return $stations;
    }

    public static function refreshData()
    {
        $instance = self::connect();

        return 'TRANSIT UPDATE SUCCESS';
    }

    public function get()
    {
        $stations = self::connect();
        
        foreach ($stations as $station):

            if ($station->stationName == 'Willoughby Ave & Walworth St'):

                $availableDocks = $station->availableDocks;
                $availableBikes = $station->availableBikes;

            endif;

        endforeach;

        $json = array(
                    'docks' => $availableDocks,
                    'bikes' => $availableBikes
                );

        return Response::json(array('station' => $json));
    }
}