<?php

namespace App\Http\Controllers\Auth\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ResetPasswordRequest;
use App\Models\Admin;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    public function resetPassword(ResetPasswordRequest $request)
    {
        $status = Password::broker('admins')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                ])->save();
    
                event(new PasswordReset($user));
            }
        );

        return $status == Password::PASSWORD_RESET
                ? response()->json(['message' => 'パスワードの再設定が完了しました。', 'status' => true], 201)
                : response()->json(['message' => 'パスワードの再設定に失敗しました。', 'status' => false], 401);
    }
}