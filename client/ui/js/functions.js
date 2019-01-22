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
        setTimeout(function(){ toast.removeAttribute('class'); }, 4000);
      }
        const signUpForm = document.getElementById('signUpForm');
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
