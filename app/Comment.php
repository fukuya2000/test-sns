<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function getComments()
    {
        $comments = Comment::with('user:id,name')->orderBy('id', 'desc')->get();
        return $comments;
    }
}
