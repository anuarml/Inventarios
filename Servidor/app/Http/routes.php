<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use App\User;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {

	//$inputKey = Auth::guard()->inputKey;

	//$authenticated = Auth::guard('tho')->validate(['authToken'=>'token']);

	//$authenticated = User::where('Usuario','ADMIN')->get(['Usuario','ThoWAuthToken'])->first();

	//$authenticated->ThoWAuthToken = Illuminate\Support\Str::random(60);

    //$authenticated->save();

	$authenticated = Auth::attempt(['Usuario'=>'ADMIN','Contrasena'=>'5509a482cd11e68477167e896e7b9237','Estatus'=>'ALTA']);

	//dd($authenticated->first()->Usuario);
    
	return response()->json($authenticated);
    //return view('welcome');
});
