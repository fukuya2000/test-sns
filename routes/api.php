<?php

use Illuminate\Http\Request;
use Symfony\Component\Routing\Router;
use App\Http\Controllers\PostController;

// 会員登録
Route::post('/register', 'Auth\RegisterController@register')->name('register');
// ログイン
Route::post('/login', 'Auth\LoginController@login')->name('login');
// ログアウト
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');

Route::get('/user', function(){
  return Auth::user();
})->name('user');

Route::get('/posts', 'PostController@index');
Route::post('/posts', 'PostController@create');
Route::get('/posts/{id}', 'PostController@edit');
Route::post('/posts/{id}', 'PostController@updata');
Route::delete('/posts/{id}', 'PostController@destroy');

Route::get('/comments', 'CommentController@index');
Route::post('/comments', 'CommentController@create');
Route::delete('/comments/{id}', 'CommentController@destroy');


//いいね機能
Route::get('/likes/{id}', 'LikeController@index');
Route::put('/likes/{id}', 'LikeController@like');
Route::delete('/likes/{id}', 'LikeController@destroy');

//Follow
Route::get('/follows/{id}', 'PostController@isFollow');

//FollowList
Route::get('/follow/list', 'FollowController@index');
Route::put('/follows/{id}', 'FollowController@follow');
Route::delete('/follows/{id}', 'FollowController@unfollow');

//Trend
Route::get('/trend/post','PostController@mostLikesPost');
Route::get('/trend/user','FollowController@popularUser');

Route::get('/home', 'HomeController@index');