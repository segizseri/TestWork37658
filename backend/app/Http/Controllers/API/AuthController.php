<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $validate = $request->validate([
            'name'=>'required',
            'email'=>'email|required|unique:users',
            'password'=>'required|confirmed'
        ]);

        $validate['password'] = Hash::make($request->password);
        $user = User::create($validate);
        $accessToken = $user->createToken($validate)->accessToken;
        return response(['user'=>$user,'access_token'=>$accessToken],201);
    }

    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);
        if (!auth()->attempt($loginData)) {
            return response(['message' => 'user does not exist'], 400);
        }
        $accessToken = auth()->user()->createToken('authToken')->accessToken;
        return response(['user' => auth()->user(), 'access_token' => $accessToken]);
    }
}
