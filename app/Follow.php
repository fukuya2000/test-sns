<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Post;



class Follow extends Model
{

    public static function getFollowList()
    {
        if(\Auth::check()){
            $user_id = \Auth::user()->id;
            $followlist = Follow::where('user_id', $user_id)->pluck('follow_id');
            //Follower一覧取得
            $list = User::whereIn('id', $followlist)->get();
            //Follwerの投稿を取得
            $post = Post::whereIn('user_id', $followlist)->with('user:id,name')->orderBy('id', 'desc')->get();
            return [$post, $list];
        }
    }

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function posts()
    {
        return $this.hasMany('App\Post');
    }
}
