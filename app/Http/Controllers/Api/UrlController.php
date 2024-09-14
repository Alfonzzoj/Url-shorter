<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UrlRequest;
use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UrlController extends Controller
{

    public function test()
    {
        return response()->json([
            'status' => true,
            'message' => 'API is working'
        ]);
    }
    public function getLinks()
    {
        $links = Link::all();
        return response()->json([
            'status' => true,
            'message' => 'Links retrieved successfully',
            'data' => $links
        ]);
    }



    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'url' => ['required', 'regex:/^(http|https)?(:\/\/)?(www\.)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid URL',
                'error' => $validator->errors()
            ], 422);
        }
        // Check if the URL already exists
        if (Link::where('url', $request->url)->exists()) {
            return response()->json([
                'status' => true,
                'message' => 'URL already exists',
                'url' => $request->url,
                'shortened' => url('/' . Link::where('url', $request->url)->first()->slug)
            ]);
        } else { // Create a new shortened URL

            try {
                // Get the title of the URL
                $url = $request->url;

                if (!preg_match("~^(?:f|ht)tps?://~i", $url)) {
                    $url = "http://" . $url;
                }

                $contents = file_get_contents($url);
                if (preg_match('/<title>([^<]*)<\/title>/i', $contents, $matches)) {
                    $title = $matches[1];
                } else {
                    $title = 'No title';
                }
                $slug = Str::random(8);
                $link = Link::create([
                    'title' => $title ?? 'undefined',
                    'url' => $request->url,
                    'slug' => $slug,
                    'full_shortened_url' => url('/' . $slug)
                ]);
                return response()->json([
                    'status' => true,
                    'message' => 'URL shortened successfully',
                    'url' => $link->url,
                    'shortened' => url('/' . $link->slug)
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid URL',
                    'error' => $e->getMessage()
                ], 422);
            }
        }
    }
}
