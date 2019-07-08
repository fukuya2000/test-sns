<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Http\Requests\CreateFolder;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        
        return $posts;  
    }

    public function create(CreateFolder $request)
    {
        $post = new Post();
        $post->title = $request->title;
        $post->body = $request->body;
        $post->user_id = $request->user_id;
        $post->save();

        $posts = Post::all();
        return $posts;
    }

    public function edit($id)
    {
        $post = Post::find($id);
        return $post;
    }

    public function updata(Request $request, $id) 
    {
        $post = Post::find($id);
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();
    }

    public function destroy($id)
    {
        $post = Post::find($id);
        $post->delete();
    }
}


