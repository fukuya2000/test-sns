<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    public function index()
    {
        return Comment::all();
    }
    
    public function create(Request $request)
    {
        $comments = new Comment();
        $comments->comments = $request->content;
        $comments->post_id = $request->post_id;
        $comments->user_id = $request->user_id;
        $comments->save();
        return Comment::all();
    }

    public function destroy($id)
    {
       $comment = Comment::find($id);
       $comment->delete();
       return Comment::all();
    }
}
