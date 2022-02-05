---
extends: _layouts.post
section: content
title: Auto-completion in Nova Resources
date: 2021-12-15
description: This is your first blog post.
---

Resources are the main building blocks of Laravel Nova. Besides fields, there are defined actions, metrics and other things. Therefore, you sometimes want to access the underlying model instance. Unfortunately, the IDE does not recognize the context and therefore cannot offer auto-completion. Here is a trick to help the IDE with that. You can just type-hint the `$resource` property like so: 

```php
// [tl! add:1,2]
/** @var App\Models\User */
public $resource;

public function fields(Request $request)
{
    return [
        ID::make()->sortable(),
        Text::make('Email')->sortable(),
        Text::make('Company', fn() => __($this->company->name)), // [tl! remove]
        Text::make('Company', fn() => __($this->resource->company->name)), // [tl! add]
    ];
}
```

That's it. In every Nova resource I just throw that type-hint in and start enjoying auto-completion. If you're eager to find out about why that works read further.

## Behind the scenes

Nova's resource base class has a `$resource` property which is already type-hinted with `Model|null`. That's all well and good, but it doesn't help with actual model properties like in the example above.

```php
// Laravel\Nova\Resource

/**
 * The underlying model resource instance.
 *
 * @var \Illuminate\Database\Eloquent\Model|null
 */
public $resource;
```

As soon as you access a property on one of your Nova resources it gets automagically delegated to the underlying model resource instance. Nova's base resource uses a trait called `DelegatesToResource` for that. The code looks like this:

```php
// Illuminate\Http\Resources\DelegatesToResource

/**
 * Dynamically get properties from the underlying resource.
 *
 * @param  string  $key
 * @return mixed
 */
public function __get($key)
{
    return $this->resource->{$key};
}
```

Nice. I hope you find it useful. Happy coding!
