<?php

namespace App\Http\Controllers\Auth\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ForgotPasswordRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

final class ForgotPasswordController extends Controller
{
    /**
     * @param ForgotPasswordRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function sendResetLinkEmail(ForgotPasswordRequest $request): JsonResponse
    {
        $status = Password::broker('admins')->sendResetLink($request->only('email'));

        if ($status !== Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => trans($status),
            ]);
        }

        return new JsonResponse([
            'message' => trans($status),
        ]);
    }
}
