<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class HyphenInclude implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $include_hyphen = strpos($value, '-');

        return $include_hyphen === false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return ':attributeはハイフンなしで入力してください。';
    }
}
