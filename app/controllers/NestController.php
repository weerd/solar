<?php

use Nest\Nest,
    Carbon\Carbon;

class NestController extends BaseController
{
    public static function connect()
    {

        $cache = 'nest__status';

        if (Cache::has($cache)):

            $nestStatus = Cache::get($cache);

        else:

            $nest = new Nest();

            $nestStatus = $nest->getStatus();

            $expires = Carbon::now()->addMinutes(2);

            Cache::put($cache, $nestStatus, $expires);

        endif;

        return $nestStatus;
    }

    /*
        Get NEST device serial numbers, save them for later
        NOT USED / NEEDS REFACTOR
    */
    // public static function getDevices()
    // {
    //     self::connect();

    //     // Get associated devices
    //     $nest__devices = $nest->getDevices();
    //     $nest__expires = Carbon::now()->addDays(5);

    //     foreach ($nest__devices as $key => $serial):

    //         $nest_device = 'nest_device_' . $key;


    //         if (!Cache::get($nest_device)):

    //             Cache::put($nest_device, $serial, $expires);
            
    //         endif;

    //     endforeach;
    // }

    public static function getStatus()
    {
        $nestStatus = self::connect();

        $nestData = array();
        $nestLocations = array();
        $nestStructure = key($nestStatus->structure);
        

        $locations = $nestStatus->where->$nestStructure->wheres;

        foreach ($locations as $location):

            $nestLocations[$location->where_id]['name'] = $location->name;

        endforeach;


        $devices = $nestStatus->device;

        foreach ($devices as $key => $device):

            $nestData[$key]['location'] = $nestLocations[$device->where_id]['name'];
            $nestData[$key]['leaf'] = $device->leaf;
            $nestData[$key]['current_humidity'] = $device->current_humidity;

        endforeach;


        $shared = $nestStatus->shared;

        foreach ($shared as $key => $device):

            $nestData[$key]['auto_away'] = $device->auto_away;
            $nestData[$key]['temperature_type'] = $device->target_temperature_type;
            $nestData[$key]['temperature_target'] = round($device->target_temperature * 9/5+32);
            $nestData[$key]['temperature_current'] = round($device->current_temperature * 9/5+32);

        endforeach;


        return Response::json(array('devices' => $nestData));
    }


}