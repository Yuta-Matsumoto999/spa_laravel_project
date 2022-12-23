<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([
            [
                'organization_id' => 1,
                'name' => 'admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'organization_id' => 2,
                'name' => 'admin2',
                'email' => 'admin2@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'organization_id' => 3,
                'name' => 'admin3',
                'email' => 'admin3@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'organization_id' => 4,
                'name' => 'admin4',
                'email' => 'admin4@example.com',
                'password' => Hash::make('password'),
            ],
            [
                'organization_id' => 5,
                'name' => 'admin5',
                'email' => 'admin5@example.com',
                'password' => Hash::make('password'),
            ],
        ]);
    }
}
