<?php

namespace App;

use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'Usuario';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'Usuario';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;


    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'ThoWAuthToken',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    public function setAuthToken($token){
        $this->ThoWAuthToken = $token;
    }

    public function getAuthToken(){
        return $this->ThoWAuthToken;
    }

    /*public function updateAuthToken(){

        $usuario = $this->Usuario;
        $token = Str::random(60);

        $stmt = \DB::getPdo()->prepare('EXEC dbo.spThoWUpdateAuthToken ?, ?');

        $stmt->bindParam(1, $usuario);
        $stmt->bindParam(2, $token);

        $stmt->execute();
    }*/
    
    public function updateAuthToken(){

        $usuario = $this->Usuario;
        $token = $this->ThoWAuthToken;

        $stmt = \DB::getPdo()->prepare('EXEC dbo.spThoWUpdateAuthToken ?, ?');

        $stmt->bindParam(1, $usuario);
        $stmt->bindParam(2, $token);

        $stmt->execute();
    }
}
