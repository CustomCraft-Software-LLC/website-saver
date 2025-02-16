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
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Sign In with Auth0</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
  <style>
    body, html {
      height: 100%;
      background-color: #f9f9f9;
    }

    .invisible {
  		visibility: hidden;
		}

    .login-container {
      position: relative;
      height: 100%;
    }

    .login-box {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding: 15px;
      background-color: #fff;
      box-shadow: 0px 5px 5px #ccc;
      border-radius: 5px;
      border-top: 1px solid #e9e9e9;
    }

    .login-header {
      text-align: center;
    }

    .login-header img {
      width: 75px;
    }

    #error-message {
      display: none;
      white-space: break-spaces;
    }
  </style>
<body>
  <div class="login-container">
    <div class="col-xs-12 col-sm-4 col-sm-offset-4 login-box">
      <div class="login-header">
        <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"/>
        <h3>Welcome</h3>
        <h5>PLEASE LOG IN</h5>
      </div>
      <div id="error-message" class="alert alert-danger"></div>
      <form onsubmit="return false;" method="post">
        <button
          type="button"
          id="btn-google"
          class="btn btn-default btn-danger btn-block">
            Log In with Google
        </button>
        <hr>
      </form>
    </div>
  </div>

  <!--[if IE 8]>
  <script src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js"></script>
  <![endif]-->

  <!--[if lte IE 9]>
  <script src="https://cdn.auth0.com/js/polyfills/1.0/base64.min.js"></script>
  <script src="https://cdn.auth0.com/js/polyfills/1.0/es5-shim.min.js"></script>
  <![endif]-->

  <script src="https://cdn.auth0.com/js/auth0/9.28/auth0.min.js"></script>
  <script src="https://cdn.auth0.com/js/polyfills/1.0/object-assign.min.js"></script>
  <script>
    window.addEventListener('load', function() {

      var config = JSON.parse(
        decodeURIComponent(escape(window.atob('@@config@@')))
      );

      var leeway = config.internalOptions.leeway;
      if (leeway) {
        var convertedLeeway = parseInt(leeway);

        if (!isNaN(convertedLeeway)) {
          config.internalOptions.leeway = convertedLeeway;
        }
      }

      var params =  {
        overrides: {
          __tenant: config.auth0Tenant,
          __token_issuer: config.authorizationServer.issuer
        },
        domain: config.auth0Domain,
        clientID: config.clientID,
        redirectUri: config.callbackURL,
        responseType: 'code',
        scope: config.internalOptions.scope,
        _csrf: config.internalOptions._csrf,
        state: config.internalOptions.state,
        _intstate: config.internalOptions._intstate
      };

      var triggerCaptcha = null;
      var signupCaptcha = null;
      var webAuth = new auth0.WebAuth(params);
      var databaseConnection = 'Username-Password-Authentication';
      var captcha = webAuth.renderCaptcha(
        document.querySelector('.captcha-container'),
        null,
        (error, payload) => {
          if (payload) {
            triggerCaptcha = payload.triggerCaptcha;
          }
        }
      );

      function login(e) {
        e.preventDefault();
        var button = this;
        var username = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        button.disabled = true;

        var request = () => {
          webAuth.login({
            realm: databaseConnection,
            username: username,
            password: password,
            captcha: captcha.getValue()
          }, function(err) {
            if (err) displayError(err);
            button.disabled = false;
          });
        };

        if (triggerCaptcha) {
          triggerCaptcha(request);
        } else {
          request();
        }
      }

      function toggleSignupLogin(e) {
        e.preventDefault();
        var loginSignupLink = e.target;
        var loginBtn = document.getElementById('btn-login');
        var googleBtn = document.getElementById('btn-google');
        var signupBtn = document.getElementById('btn-signup');
        var msg = document.getElementById('login-signup-msg');
        loginBtn.classList.toggle('invisible');
        googleBtn.classList.toggle('invisible');
        signupBtn.classList.toggle('invisible');

        if (signupBtn.classList.contains('invisible')) {
          loginSignupLink.innerHTML = "Sign Up";
          msg.innerHTML = "Don't have an account?"

          captcha = webAuth.renderCaptcha(
            document.querySelector('.captcha-container'),
            null,
            (error, payload) => {
              if (payload) {
                triggerCaptcha = payload.triggerCaptcha;
              }
            }
          );
        } else {
          loginSignupLink.innerHTML = "Login";
          msg.innerHTML = "Already have an account?"

          signupCaptcha = webAuth.renderSignupCaptcha(
            document.querySelector('.captcha-container'),
            null,
            (error, payload) => {
              if (payload) {
                triggerCaptcha = payload.triggerCaptcha;
              }
            }
          );
        }
      }

      function signup() {
        var button = this;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        button.disabled = true;

        var request = () => {
          webAuth.redirect.signupAndLogin({
            connection: databaseConnection,
            email: email,
            password: password,
            captcha: signupCaptcha.getValue()
          }, function(err) {
            if (err) displayError(err);
            button.disabled = false;
          });
        };

        if (triggerCaptcha) {
          triggerCaptcha(request);
        } else {
          request();
        }
      }

      function loginWithGoogle() {
        webAuth.authorize({
          connection: 'google-oauth2'
        }, function(err) {
          if (err) displayError(err);
        });
      }

      function displayError(err) {
        captcha.reload();
        var errorMessage = document.getElementById('error-message');
        errorMessage.innerText = err.policy || err.description;
        errorMessage.style.display = 'block';
      }

      document.getElementById('btn-google').addEventListener('click', loginWithGoogle);
    });
  </script>
</body>
</html>
```

## env

### Auth0

VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=

### Render hosted server or where the server

VITE_BACKEND_URL=