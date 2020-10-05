<?php

namespace App\Http\Controllers;

use App\Pqr_reports;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PqrController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Pqr_reports::orderBy('date_picked', 'DESC')->where('status',1)->get();
        //return Pqr_reports::where('status',1)->sortByDesc('created_at')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
   /*  public function create()
    {
        //
    } */

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $pqrData = $request->validate([
            'name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'address' => 'required|max:255',
            'desc' => 'max:255',
            'phone_num' => 'required|max:255',
            'latitude' => 'required|max:255',
            'longitude' => 'required|max:255',
            'date_picked' => 'required',
            'solution_date' => 'required',
            'code' => 'max:255',
            'known_reports_id' => 'required|numeric',
            'neighborhood_id' => 'required|numeric',
            'infrastructure_id' => 'required|numeric'
        ]);
        return Pqr_reports::create($pqrData);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $Pqr = Pqr_reports::findOrFail($id);
    }

    public function getAReport($id){
        $Pqr = Pqr_reports::select('neighborhoods.ne_name','known_reports.issue', 'infrastructures.inf_name','pqr_reports.name' ,'pqr_reports.last_name', 'pqr_reports.address', 'pqr_reports.desc', 'pqr_reports.phone_num', 'pqr_reports.date_picked', 'pqr_reports.code')
        ->join('neighborhoods','pqr_reports.neighborhood_id','=','neighborhoods.id')
        ->join('known_reports','pqr_reports.known_reports_id','=','known_reports.id')
        ->join('infrastructures','pqr_reports.infrastructure_id','=','infrastructures.id')
        ->where('pqr_reports.id', $id)
        ->first();
        return $Pqr;

    }

    public function getAReportByAddress($urlStr){
        $address = urldecode($urlStr);
        $Pqr = Pqr_reports::select('pqr_reports.id','neighborhoods.ne_name', 'pqr_reports.longitude','pqr_reports.latitude', 'pqr_reports.date_picked','pqr_reports.neighborhood_id', 'pqr_reports.known_reports_id', 'pqr_reports.infrastructure_id' ,'known_reports.issue', 'infrastructures.inf_name','pqr_reports.name' ,'pqr_reports.last_name', 'pqr_reports.address', 'pqr_reports.desc', 'pqr_reports.phone_num', 'pqr_reports.date_picked', 'pqr_reports.code')
        ->join('neighborhoods','pqr_reports.neighborhood_id','=','neighborhoods.id')
        ->join('known_reports','pqr_reports.known_reports_id','=','known_reports.id')
        ->join('infrastructures','pqr_reports.infrastructure_id','=','infrastructures.id')
        ->where('pqr_reports.address', $address)
        ->first();
        return $Pqr;

    }

    public function totalReportsByNH(){
        $Pqr = DB::table('pqr_reports')
        ->select(DB::raw('pqr_reports.neighborhood_id as idnb, neighborhoods.ne_name as namenb, (SELECT COUNT(neighborhood_id) from pqr_reports WHERE neighborhood_id = idnb) as cantidad'))
        ->join('neighborhoods','pqr_reports.neighborhood_id','=','neighborhoods.id')
        ->where('status', 1)
        ->groupBy('idnb')
        ->get();
        return $Pqr;

    }

    public function totalReportsByMonth(){
        $Pqr = DB::table('pqr_reports')
        ->select(DB::raw('MONTH(pqr_reports.date_picked) AS mes , (SELECT COUNT(MONTH(date_picked)) FROM pqr_reports WHERE MONTH(date_picked) = mes AND status = 1) as total'))
        ->where('status', 1)
        ->whereRaw('pqr_reports.date_picked BETWEEN  DATE_SUB(NOW(),INTERVAL 1 YEAR) and NOW()')
        ->groupBy('mes')
        ->limit(12)
        ->get();
        return $Pqr;
    }

    public function currentMonthKnownIssues(){
        $Pqr = DB::table('pqr_reports')
        ->select(DB::raw('pqr_reports.known_reports_id as reporte, known_reports.issue as nombre ,(SELECT COUNT(known_reports_id) WHERE known_reports_id = reporte AND status = 1) as total'))
        ->join('known_reports', 'pqr_reports.known_reports_id', '=','known_reports.id')
        ->where('status', 1)
        ->whereRaw('pqr_reports.date_picked BETWEEN DATE_FORMAT(NOW() ,"%Y-%m-01") AND NOW()')
        ->groupBy('reporte')
        ->get();
        return $Pqr;
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
        $Pqr = Pqr_reports::findOrFail($id);
        $Pqr->update($request->all());
        return $Pqr;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Pqr = Pqr_reports::findOrFail($id);
        $Pqr->delete();
        return $Pqr;
    }
}
