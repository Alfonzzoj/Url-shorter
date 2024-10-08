<?php

use App\Models\Link;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/{slug}', function ($slug) {
    return redirect(Link::where('slug', $slug)->first()->url) ?? redirect()->back();
    // redirect($link->url);
})->name('shortlink');
Route::get('{any}', function () {
    return view('welcome');
})->where('any', '.*');
