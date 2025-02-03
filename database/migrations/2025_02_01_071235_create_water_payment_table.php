<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('water_payment', function (Blueprint $table) {
            $table->id();
            $table->foreignId('type_id')->constrained('water_payment_types')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('water_users')->cascadeOnDelete();
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('water_payment');
    }
};
