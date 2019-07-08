<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{ config('app.name') }}</title>
  <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
  <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/css/styles.css">
  <script src="{{ mix('js/app.js') }}" defer></script>
</head>
<body>
  <div id="app">
  </div>
</body>
</html>