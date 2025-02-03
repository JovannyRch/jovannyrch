<?php

namespace App\Models\WaterPayments;

use Illuminate\Database\Eloquent\Model;

class WaterUser extends Model
{
    protected $table = 'water_users';
    protected $fillable = ['name', 'group_id', 'payment_type_id', 'amount', 'number'];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function paymentType()
    {
        return $this->belongsTo(PaymentType::class);
    }
}
