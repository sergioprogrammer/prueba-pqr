<?php

namespace App\Http\Controllers;

use App\Neighborhood;
use Illuminate\Http\Request;

class NeighborhoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Neighborhood::orderBy('ne_name', 'ASC')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    public function getNeighborhoods(){
        /*$neighbors = DB::TABLE('pqrs')
        ->SELECT('neighbors.name AS neighbor', 'problem_lists.problem AS problem', 'infrastructures.name AS infrastructure', 'pqrs.neighbor_id', 'pqrs.problem_id', 'pqrs.infrastructure_id')
        ->JOIN('neighbors','pqrs.neighbor_id','=','neighbors.id')
        ->JOIN('problem_lists','pqrs.problem_id','=','problem_lists.id')
        ->JOIN('infrastructures','pqrs.infrastructure_id','=','infrastructures.id')
        ->groupBy('neighbors.name','problem_lists.problem','infrastructures.name','pqrs.neighbor_id','pqrs.infrastructure_id','pqrs.problem_id')
        ->get();
        return $neighbors;*/
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
