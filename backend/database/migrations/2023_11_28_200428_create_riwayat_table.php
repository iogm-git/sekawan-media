<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('riwayat', function (Blueprint $table) {
            $table->id();
            $table->foreignId('penyetuju_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('pegawai_id')->constrained('pegawai');
            $table->foreignId('kendaraan_id')->constrained('kendaraan');
            $table->foreignId('supir_id')->constrained('supir');
            $table->string('admin_setuju')->default('tidak');
            $table->string('user_setuju')->default('tidak');
            $table->integer('bbm_awal');
            $table->integer('bbm_akhir')->default(50);
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->date('jadwal_service')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('riwayat');
    }
};
