<?php

namespace App\Listeners;

use App\Events\OrganizationRegister;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;
use App\Models\Admin;
use App\Models\Organization;

class OrganizationRegisterListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */

    private $admin;
    private $organization;

    public function __construct(Admin $admin, Organization $organization)
    {
        $this->admin = $admin;
        $this->organization = $organization;
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\OrganizationRegister  $event
     * @return void
     */
    public function handle(OrganizationRegister $event)
    {
        $this->organization->fill($event->newOrganization)->save();

        $event->admin->organization()->attach($this->organization->id);
    }
}
