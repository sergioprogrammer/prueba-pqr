<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pqr_reports extends Model
{
    protected $fillable = ['name', 'last_name', 'address', 'desc', 'phone_num', 'latitude', 'longitude', 'status', 'date_picked', 'solution_date', 'code', 'known_reports_id', 'neighborhood_id', 'infrastructure_id'];
}
