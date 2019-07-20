<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Follow;
use App\User;


class FollowController extends Controller
{
    public function index()
    {
        //followerのみの結果を返す
        return Follow::getFollowList();
    }

    public function follow($id)
    {
        $follow = new Follow();
        $follow->user_id = \Auth::user()->id;
        $follow->follow_id = $id;
        $follow->save();

        return Follow::getFollowList();
    }

    public function unfollow($id)
    {
        Follow::where('follow_id', $id)->where('user_id', \Auth::user()->id)->delete();
        return Follow::getFollowList();
    }

    public function popularUser()
    {
        $popularUser = User::select(['id', 'name'])->withCount('followers', 'follows')->orderBy('followers_count', 'desc')->paginate(2);
        return $popularUser;
    }
}
