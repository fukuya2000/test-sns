<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Like;

class LikeController extends Controller
{

    public function index($id)
    {

        $like =  new Like();
        $counter = count($like->where('post_id', $id)->get());
        
        $check = Like::where('user_id', \Auth::user()->id)->where('post_id', $id)->get();
        $Ischeck = false;
        if(!$check->isEmpty()){
            $Ischeck =  true;
        }
        return[$counter, $Ischeck];
        
    }

    public function like(Request $request, $id)
    {
        $like = new Like();
        $like->post_id = $id;
        $like->user_id = $request->userId;
        $like->save();
        $counter = count($like->where('post_id', $id)->get());
        return $counter;
    }

    public function destroy($id)
    {
        $like = new Like();
        Like::where('user_id', \Auth::user()->id)->where('post_id', $id)->delete();
        $counter = count($like->where('post_id', $id)->get());
        return $counter;
    }
}
