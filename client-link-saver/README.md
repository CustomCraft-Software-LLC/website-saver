# LinkSaver

## Auth0

### Steps to Customize the Universal Login Page:

Log in to your Auth0 Dashboard.

Navigate to Authentication > Universal Login.

Under the Login Experience tab, select Classic.

Toggle on Customize Login Page.

Replace the default code with the following HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Login</title>
    <script src="https://cdn.auth0.com/js/auth0/9.19/auth0.min.js"></script>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 50px;
        background-color: #f4f4f4;
      }
      .login-container {
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        display: inline-block;
      }
      .login-button {
        background-color: #4285f4;
        color: white;
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-transform: uppercase;
        margin-top: 20px;
        display: inline-block;
      }
      .login-button:hover {
        background-color: #357ae8;
      }
    </style>
  </head>
  <body>
    <div class="login-container">
      <h2>Login with Google</h2>
      <button class="login-button" id="google-login">Login with Google</button>
    </div>
    <script>
      var webAuth = new auth0.WebAuth({
        domain: 'YOUR_AUTH0_DOMAIN',
        clientID: 'YOUR_CLIENT_ID',
        redirectUri: 'YOUR_CALLBACK_URL',
        responseType: 'token id_token',
        scope: 'openid profile email',
      });

      document.getElementById('google-login').addEventListener('click', function () {
        webAuth.authorize({
          connection: 'google-oauth2',
        });
      });
    </script>
  </body>
</html>
```