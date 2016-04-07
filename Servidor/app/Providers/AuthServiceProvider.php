<?php

namespace App\Providers;

use Auth;
use App\Guards\AuthTokenGuard;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any application authentication / authorization services.
     *
     * @param  \Illuminate\Contracts\Auth\Access\Gate  $gate
     * @return void
     */
    public function boot(GateContract $gate)
    {
        $this->registerPolicies($gate);

        //
        Auth::extend('authtoken', function($app, $name, array $config) {
            // Return an instance of Illuminate\Contracts\Auth\Guard...

            return new AuthTokenGuard(Auth::createUserProvider($config['provider']), $app['request']);
        });
    }
}
