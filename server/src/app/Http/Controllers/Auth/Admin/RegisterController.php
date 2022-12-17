<?php

namespace App\Http\Controllers\Auth\Admin;

use App\Events\OrganizationRegister;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RegisterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use App\Models\Organization;

class RegisterController extends Controller
{
    use RegistersUsers;

    private $admin;
    private $organization;

    public function __construct(Admin $admin,
                                Organization $organization)
    {
        $this->admin = $admin;
        $this->organization = $organization;
    }

    public function register(RegisterRequest $request)
    {
        $newAdmin = $request->only('name', 'email', 'password');
        event(new Registered($admin = $this->create($newAdmin)));

        Auth::guard('admins')->login($admin);

        $newOrganization = $request->only("organization_name", "organization_prefecture", "organization_address_number", "organization_city", "organization_address");
        event(new OrganizationRegister($admin, $newOrganization));

        return response()->json(Auth::guard('admins')->user());
    }

    protected function create(array $data)
    {
        return Admin::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
