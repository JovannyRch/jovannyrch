<?php

namespace App\Models\WaterPayments;

use Illuminate\Database\Eloquent\Model;

class Cash extends Model
{
    protected $table = 'water_cash';
    protected $fillable = ['amount', 'description', 'date', 'last_total_amount'];

    public function total()
    {
        return Cash::sum('amount');
    }

    public function expenses()
    {
        return Cash::where('amount', '<', 0)->sum('amount');
    }

    public function incomes()
    {
        return Cash::where('amount', '>', 0)->sum('amount');
    }
}
