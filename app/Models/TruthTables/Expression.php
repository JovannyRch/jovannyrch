<?php

namespace App\Models\TruthTables;

use Illuminate\Database\Eloquent\Model;

class Expression extends Model
{
    protected $table = 'tt_expressions';
    protected $fillable = ['expression', 'type', 'description', 'video_link', 'counter'];

    public function incrementCounter()
    {
        $this->counter++;
        $this->save();
    }
}
