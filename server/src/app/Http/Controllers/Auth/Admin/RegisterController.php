<?php

namespace App\Http\Controllers\Auth\Admin;

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
        $newOrganization = $request->only('organization_name');

        $this->organization->fill($newOrganization)->save();

        $newAdmin = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'organization_id' => $this->organization->id
        ];

        event(new Registered($admin = $this->create($newAdmin)));

        Auth::guard('admins')->login($admin);

        return response()->json(Auth::guard('admins')->user());
    }

    protected function create(array $data)
    {
        return Admin::create($data);
    }
}
