<?php

namespace App\Models\WaterPayments;

use Illuminate\Database\Eloquent\Model;

class PaymentType extends Model
{
    protected $table = 'payment_types';
    protected $fillable = ['name', 'amount'];

    public function users()
    {
        return $this->hasMany(WaterUser::class);
    }
}
