<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    public function counter($id)
    {
        $likes = DB::table('likes');
        $counter = count($likes->where('post_id', $id)->get());
        return $counter;
    }
}
