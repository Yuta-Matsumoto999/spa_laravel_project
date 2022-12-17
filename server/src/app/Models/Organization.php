<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_name',
        'organization_address_number',
        'organization_prefecture',
        'organization_city',
        'organization_address'
    ];

    public function admin()
    {
        return $this->belongsToMany(Admin::class);
    }
}
