<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class RefreshCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'solar:flare';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Triggers data fetch from associated services.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{

		NestController::refreshData();
		TransitController::refreshData();
		WeatherController::refreshData();

	}

}
