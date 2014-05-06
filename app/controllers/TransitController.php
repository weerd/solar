<?php

use Httpful\Httpful;

class TransitController extends BaseController
{
    public static function connect()
    {
        $data = \Httpful\Request::get(MTA_API_ENDPOINT)->expectsXml()->send();

        return $data;
    }

    public function get()
    {
        // MTA returns terribly mal-formed XML response... have to do lots of parsing to convert it to pretty JSON
        $data = self::connect();
        $subway = array();

        foreach ($data->body->subway->line as $line):

            if (in_array($line->name, array('G','L','456')) )
            {
                if ($line->name == '456') $lineName = 6;
                else $lineName = $line->name;

                if ($line->status == 'GOOD SERVICE') $lineClass = 'green';
                if ($line->status == 'DELAYS') $lineClass = 'red';
                if ($line->status == 'PLANNED WORK') $lineClass = 'yellow';

                $subway[] = array(
                    'line' => (string) $lineName,
                    'status' => (string) $line->status,
                    'status_class' => (string) $lineClass,
                    'updated_at' => (string) $line->time
                );
            }

        endforeach;

        return Response::json(array('lines' => $subway));
    }
}