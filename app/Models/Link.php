<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'url', 'slug', 'full_shortened_url'];

    public function visits()
    {
        return $this->hasMany(Visit::class);
    }
}
