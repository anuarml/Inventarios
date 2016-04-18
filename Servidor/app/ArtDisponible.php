<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArtDisponible extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ThoWArtDisponible';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    //protected $primaryKey = 'Empresa';

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
    protected $fillable = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    //protected $visible = ['Empresa'];

    /**
     * Validate a plain text string with the encrypted password for the user.
     *
     * @param string $plain
     * @return boolean
     */
    public static function getDisponible($articulo,$descripcion,$fabricante,$empresa,$usuario){

        $stmt = \DB::getPdo()->prepare('EXEC dbo.spThoWArtDisponible ?, ?, ?, ?, ?');

        $stmt->bindParam(1, $articulo);
        $stmt->bindParam(2, $descripcion);
        $stmt->bindParam(3, $fabricante);
        $stmt->bindParam(4, $empresa);
        $stmt->bindParam(5, $usuario);

        $stmt->execute();

        $artDisponible = $stmt->fetchAll(\PDO::FETCH_CLASS);

        return $artDisponible;
    }

}