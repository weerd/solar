<?php

class BikeController extends BaseController
{
    public static function connect()
    {
        $response = \Httpful\Request::get(CITIBIKE_API_ENDPOINT)->send();

        $stations = $response->body->stationBeanList;

        return $stations;
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