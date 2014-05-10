<?php

use Httpful\Httpful;

class TransitController extends BaseController
{
    public static function pusher()
    {
        $pusher = new Pusher( PUSHER_API_KEY, PUSHER_API_SECRET, PUSHER_API_APP_ID );

        return $pusher;
    }

    public static function connect()
    {
        $pusher = self::pusher();
        $data = \Httpful\Request::get(MTA_API_ENDPOINT)->expectsXml()->send();

        $pusher->trigger( 'solar', 'transit', 'refresh' );

        return $data;
    }

    public function get()
    {
        // MTA returns terribly mal-formed XML response... have to do lots of parsing to convert it to pretty JSON
        $data = self::connect();
        $subway = array();

        foreach ($data->body->subway->line as $key => $line):

            if (in_array($line->name, array('G','L','456')) ):

                if ($line->name == '456'):

                    $key = 3;
                    $lineName = 6;

                elseif ($line->name == 'G'):
                    
                    $lineName = $line->name;
                    $key = 1;

                elseif ($line->name == 'L'):

                    $lineName = $line->name;
                    $key = 2;

                else:

                    $lineName = $line->name;

                endif;

                if ($line->status == 'GOOD SERVICE') $lineClass = 'green';
                if ($line->status == 'DELAYS') $lineClass = 'red';
                if ($line->status == 'PLANNED WORK') $lineClass = 'yellow';

                $subway[$key] = array(
                    'line' => (string) $lineName,
                    'status' => (string) $line->status,
                    'status_class' => (string) $lineClass,
                    'updated_at' => (string) $line->time
                );
            endif;

        endforeach;

        return Response::json(array('lines' => $subway));
    }
}