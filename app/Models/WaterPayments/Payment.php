<?php

namespace App\Models\WaterPayments;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'water_payments';
    protected $fillable = ['user_id', 'amount', 'date'];

    public function user()
    {
        return $this->belongsTo(WaterUser::class);
    }

    public function type()
    {
        return $this->belongsTo(PaymentType::class);
    }
}
