<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('organizations')->insert([
            [
                'organization_name' => 'test_company'
            ],
            [
                'organization_name' => 'test_company2'
            ],
            [
                'organization_name' => 'test_company3'
            ],
            [
                'organization_name' => 'test_company4'
            ],
            [
                'organization_name' => 'test_company5'
            ],
        ]);
    }
}
