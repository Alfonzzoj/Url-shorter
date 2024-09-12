<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RateLimiter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $maxRequests = 10; // número máximo de solicitudes permitidas en un minuto
        $decayMinutes = 1; // tiempo de decadencia en minutos

        $rateLimiter = new \Illuminate\Support\Facades\RateLimiter();
        $rateLimiter->attempt($request->ip(), $maxRequests, $decayMinutes);

        if ($rateLimiter->tooManyAttempts()) {
            return response()->json(['error' => 'Demasiadas solicitudes'], 429);
        }

        return $next($request);
    }
}
