<?php

use Illuminate\Database\Seeder;
use App\Post;
class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        POst::create([
            'title' => 'title1',
            'body' => 'body1',
            'user_id' => 1
        ]);
    }
}
