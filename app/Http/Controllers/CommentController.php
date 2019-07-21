<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    public function index()
    {
        //$comments = Comment::with('user:id,name')->orderBy('id', 'desc')->get();
        $comment = new Comment();
        return $comment->getComments();
    }
    
    public function create(Request $request)
    {
        $comments = new Comment();
        $comments->comments = $request->content;
        $comments->post_id = $request->post_id;
        $comments->user_id = $request->user_id;
        $comments->save();
        return $comments->getComments();
    }

    public function destroy($id)
    {
       $comments = new Comment();
       $comment = Comment::find($id);
       $comment->delete();
       return $comments->getComments();
    }
}
