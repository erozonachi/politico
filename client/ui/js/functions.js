/**
 * 
 * @author: Eneh, James 
 */
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        
      function makeToast (message) {
        const toast = document.getElementById('toast');

        toast.innerHTML = message;
        toast.setAttribute('class', 'show');
        console.log(message);
        setTimeout(function(){ toast.removeAttribute('class'); }, 4000);
      }

      const signUpForm = document.getElementById('signUpForm');
      if (signUpForm) {
        signUpForm.onsubmit = (e) => {
            
            e.preventDefault();

            const username = String(document.getElementById('username').value).trim();
            const fName = String(document.getElementById('fName').value).trim();
            const lName = String(document.getElementById('lName').value).trim();
            const email = String(document.getElementById('email').value).trim();
            const password = String(document.getElementById('password').value).trim();
            const confirm = String(document.getElementById('confirm').value).trim();
            const nameFormat = /^[a-zA-Z]+$/i;
            const alphaNum = /^[a-zA-Z0-9]+$/i;

            if (fName == "") {
              makeToast("First Name is required");
              return false;
            } else if (!nameFormat.test(fName)) {
              makeToast("First Name can only contain letters");
              return false;
            }
            if (lName == "") {
              makeToast("Last Name is required");
              return false;
            } else if (!nameFormat.test(lName)) {
              makeToast("Last Name can only contain letters");
              return false;
            }
            if (username == "") {
              makeToast("Username is required");
              return false;
            } else if (!alphaNum.test(username)) {
              makeToast("Username can only contain letters and digits");
              return false;
            } else if (!isNaN(username.charAt(0))) {
              makeToast("Username cannot start with a number");
              return false;
            }
            
            const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (email == "") {
              makeToast("Email is required");
              return false;
            } else if (!emailRegEx.test(email)) {
              makeToast("Invalid email format");
              return false;
            }
            
            if (password.length < 10) {
              makeToast("Password not up to 10 characters");
              return false;
            } else if (/^[a-zA-Z]+$/i.test(password) || /^[0-9]+$/i.test(password)) {
              makeToast("Weak password: mix letters, numbers, and special characters");
              return false;
            } else if (confirm != password) {
              makeToast("Password and confirm password not match");
              return false;
            }
            const btnSignUp = document.getElementById('btnSignUp');
            btnSignUp.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Wait';
            setTimeout(function () { btnSignUp.innerHTML ='Sign Up'; }, 10000);
            
        };
      }

      const signInForm = document.getElementById('signInForm');
      if (signInForm) {
        signInForm.onsubmit = (e) => {
          e.preventDefault();

          const btnLogin = document.getElementById('btnSignIn');
          btnLogin.setAttribute('disabled', 'disabled');
          const username = String(document.getElementById('username')).trim();
          const password = String(document.getElementById('password')).trim();
          
          if(username == "") {
            makeToast("Username is required");
            return false;
          }
          if(password == "") {
            makeToast("Password is required");
            return false;
          }

          btnLogin.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Authenticating';
          setTimeout(function () { 
            btnLogin.removeAttribute('disabled');
            btnLogin.innerHTML ='<i class="fa fa-lock"></i>&nbsp;Sign In';
          }, 10000);
        }
      }

      const forgotPassword = document.getElementById('forgot');
      if (forgotPassword) {
        forgotPassword.onclick = (e) => {
          e.preventDefault();

          const signInForm = document.getElementById('signInForm');
          const resetForm = document.getElementById('resetForm');

          signInForm.setAttribute('class', 'hidden');
          resetForm.removeAttribute('class');
        }
      }

      const loginLink = document.getElementById('loginLink');
      if (loginLink) {
        loginLink.onclick = (e) => {
          e.preventDefault();

          const signInForm = document.getElementById('signInForm');
          const resetForm = document.getElementById('resetForm');

          resetForm.setAttribute('class', 'hidden');
          signInForm.removeAttribute('class');
        }
      }

      const resetForm = document.getElementById('resetForm');
      if (resetForm) {
        resetForm.onsubmit = (e) => {
          e.preventDefault();

          const btnReset = document.getElementById('btnReset');
          btnReset.setAttribute('disabled', 'disabled');

          const signInForm = document.getElementById('signInForm');
          const resetForm = document.getElementById('resetForm');

          const otpGroup = document.getElementById('otpGroup');
          const resetGroup = document.getElementById('resetGroup');
          const email = document.getElementById('email');
          const otp = document.getElementById('otp');
          const password = document.getElementById('newPassword');
          const confirm = document.getElementById('confirm');

          const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (String(email.value).trim() == "") {
            makeToast("Email is required");
            btnReset.removeAttribute('disabled');
            return false;
          } else if (!emailRegEx.test(String(email.value).trim())) {
            makeToast("Invalid email format");
            btnReset.removeAttribute('disabled');
            return false;
          }

          if (otp.getAttribute('required') && password.getAttribute('required') && confirm.getAttribute('required')) {

            if (String(otp.value).trim() == "") {
              makeToast("OTP is required");
              btnReset.removeAttribute('disabled');
              return false;
            }
            
            if (String(password.value).length < 10) {
              makeToast("Password not up to 10 characters");
              btnReset.removeAttribute('disabled');
              return false;
            } else if (/^[a-zA-Z]+$/i.test(String(password.value)) || /^[0-9]+$/i.test(String(password.value))) {
              makeToast("Weak password: mix letters, numbers, and special characters");
              btnReset.removeAttribute('disabled');
              return false;
            } else if (String(confirm.value) !== String(password.value)) {
              makeToast("Password and confirm password not match");
              btnReset.removeAttribute('disabled');
              return false;
            }
            
            btnReset.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Resetting Password...';
            setTimeout(function () {
              btnReset.removeAttribute('disabled');
              btnReset.innerHTML ='<i id="resetSpin" class="fa fa-lock"></i>&nbsp;Request OTP';
              makeToast('Password reset successful!');

              resetForm.setAttribute('class', 'hidden');
              signInForm.removeAttribute('class');

              otp.removeAttribute('required');
              password.removeAttribute('required');
              confirm.removeAttribute('required');
              email.removeAttribute('readonly');
              email.value = '';
              otp.value = '';
              password.value = '';
              confirm.value = '';

              resetGroup.setAttribute('class', 'hidden');
              otpGroup.removeAttribute('class');
            }, 10000);
          } else {
            btnReset.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Requesting OTP...';
            setTimeout(function () {
              btnReset.removeAttribute('disabled');
              btnReset.innerHTML ='Reset Password';
              makeToast('Success! Check your email for an OTP!');

              otp.setAttribute('required', 'required');
              password.setAttribute('required', 'required');
              confirm.setAttribute('required', 'required');
              email.setAttribute('readonly', 'readonly');

              otpGroup.setAttribute('class', 'hidden');
              resetGroup.removeAttribute('class');

              const otpDisplay = document.getElementById('otpDisplay');
              const otpTimer = document.getElementById('otpTimer');
              const resend = document.getElementById('resend');

              otpTimer.removeAttribute('class');
              otpDisplay.removeAttribute('class');
              resend.setAttribute('class', 'hidden');
              let second = 60;
              let minute = 4;
              const makeTwoDigits = (i) => {
                return (i < 10 ? "0" : "") + i;
              }
              const period = setInterval(() => {
                second--;
                otpTimer.innerHTML = 'Remaining Time: ' + makeTwoDigits(minute) + ':' + makeTwoDigits(second);
                if (second <= 0 && minute > 0) {
                  minute--;
                  second = 60;
                }

                if (second <= 0 && minute <= 0) {
                  otpTimer.innerHTML = '';
                  if (!resetForm.getAttribute('class')) {
                    otpTimer.setAttribute('class', 'hidden');
                    otpDisplay.removeAttribute('class');
                    resend.removeAttribute('class');
                  } else {
                    otpTimer.removeAttribute('class');
                    resend.removeAttribute('class');
                    otpDisplay.setAttribute('class', 'hidden');
                  }
                  clearInterval(period);
                }
              }, 1000);
            }, 10000);
          }
        }
      }

    }
};

function toggleMenu(X) {
  X.classList.toggle("change");
  const x = document.getElementById("nav");
  if (x.className === "nav") {
      x.className += " responsive";
  } else {
      x.className = "nav";
  }
}
