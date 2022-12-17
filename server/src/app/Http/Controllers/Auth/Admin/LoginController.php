<?php

namespace App\Http\Controllers\Auth\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoginRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Admin;

class LoginController extends Controller
{
    /**
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function login(LoginRequest $request)
    {
        // validation check
        $credentials = $request->all();

        // ユーザーの照合
        if (Auth::guard('admins')->attempt($credentials)) {
            $request->session()->regenerate();
    
            return response()->json(Auth::guard('admins')->user());
        } else {
            $existsUser = Admin::where('email', $request->email)->first();

            if($existsUser == null) {
                $error = [
                    'errors' => [
                        'email' => ['メールアドレスが無効です。']
                    ]
                ];
            } elseif($existsUser->password !== $request->password) {
                $error = [
                    'errors' => [
                        'password' => ['パスワードが一致しません。']
                    ]
                ];
            }
            return response()->json($error, 401);
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('admins')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json("success logout");
    }
}
