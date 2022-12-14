<?php

namespace App\Http\Requests\Admin;

use App\Rules\HyphenInclude;
use App\Rules\PrefectureMatch;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */

    const STRING_MAX_LENGTH = 225;
    
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:' . self::STRING_MAX_LENGTH],
            'email' => ['required', 'email', 'unique:admins', 'max:' . self::STRING_MAX_LENGTH],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'organization_name' => ['required',  'max:' . self::STRING_MAX_LENGTH],
            'organization_address_number' => ['required', new HyphenInclude, 'min:7', 'max:7'],
            'organization_prefecture' => ['required', new PrefectureMatch],
            'organization_city' => ['required', 'max:' . self::STRING_MAX_LENGTH],
            'organization_address' => ['required', 'max:' . self::STRING_MAX_LENGTH]
        ];
    }
}
