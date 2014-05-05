<?php

use Httpful\Httpful;

class TransitController extends BaseController
{
    public static function get()
    {
        // MTA returns terribly mal-formed XML response... have to do lots of parsing to convert it to pretty JSON
        $data = \Httpful\Request::get(MTA_API_ENDPOINT)->expectsXml()->send();
        $subway = array();

        foreach ($data->body->subway->line as $line):

            if (in_array($line->name, array('G','L','456')) )
            {
                $subway[(string) $line->name] = array(
                    'status' => (string) $line->status,
                    'updated_at' => (string) $line->time
                );
            }

        endforeach;

        return Response::json(array('lines' => $subway));
    }
}