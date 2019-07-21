<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Follow;
use App\Http\Requests\CreateFolder;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('comments', 'user:id,name')->orderBy('id', 'desc')->paginate(4);
        return $posts;  
    }

    public function store(CreateFolder $request)
    {
        $post = new Post();
        $post->title = $request->title;
        $post->body = $request->body;
        $post->user_id = $request->user_id;
        $post->save();
        $posts = Post::all();
        return $posts;
    }

    public function show($id)
    {
        $post = Post::find($id);
        return $post;
    }

    public function update(Request $request, $id) 
    {
        $post = Post::find($id);
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();
    }

    public function destroy($id)
    {
        $post = Post::find($id);
        $post->likes()->delete();
        $post->comments()->delete();
        $post->delete();
        return Post::all();
    }

    public function isFollow($id)
    {
        if(\Auth::check()){
            $check = Follow::where('follow_id', $id)->where('user_id', \Auth::user()->id)->get();
            $isCheck = false;
            if(!$check->isEmpty()){
                $isCheck = true;
            }
            return [$isCheck];
        }
    }

    public function mostLikesPost()
    {
        $post = Post::withCount('likes')->orderBy('likes_count', 'desc')->with('user:id,name')->paginate(3);
        return $post;
    }
    
}


