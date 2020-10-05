<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePqrReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pqr_reports', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 255);
            $table->string('last_name', 255);
            $table->string('address', 255);
            $table->string('desc',255)->nullable();
            $table->string('phone_num', 255);
            $table->string('latitude', 255);
            $table->string('longitude', 255);
            $table->tinyInteger('status')->default('1');
            $table->timestamp('date_picked')->nullable();
            $table->timestamp('solution_date')->nullable();
            $table->timestamps();
            $table->string('code', 255)->nullable();
            $table->foreign('infrastructure_id')->references('id')->on('infrastructures');
            $table->bigInteger('known_reports_id')->unsigned();
            $table->bigInteger('neighborhood_id')->unsigned();
            $table->foreign('neighborhood_id')->references('id')->on('neighborhoods');
            $table->bigInteger('infrastructure_id')->unsigned();
            $table->foreign('known_reports_id')->references('id')->on('known_reports');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pqr_reports');
    }
}
