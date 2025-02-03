<?php

namespace App\Models\WaterPayments;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $table = 'water_groups';
    protected $fillable = ['name'];

    public function users()
    {
        return $this->hasMany(WaterUser::class);
    }
}
