<?php

namespace App\Http\Controllers\Inv;

use Auth;
use App\User;
use App\ArtDisponible;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class InvController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | UserController
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */


    /**
     * Create a new user controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['cors','jwt.auth'/*,'jwt.refresh'*/]);
    }

    /**
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getArtExistencia(Request $request)
    {
        $articulo = $request->input('search.articulo');
        $descripcion = $request->input('search.descripcion');
        $fabricante = $request->input('search.fabricante');
        $empresa = $request->input('search.empresa');

        $usuario = Auth::user()->Usuario;
        
        $artDisponible = ArtDisponible::getDisponible($articulo,$descripcion,$fabricante,$empresa,$usuario);

        if( (array)$artDisponible === $artDisponible ) {

            if(count($artDisponible)==0) {
                $status = 200;
            } else if($artDisponible[0]->Status) {
                $status = $artDisponible[0]->Status;
            } else {
                $status = 500;
            }
        } else {
            $status = 500;
        }

        return response()->json(compact('artDisponible'),$status);
    }

}