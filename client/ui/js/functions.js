/**
 * 
 * @author: Eneh, James 
 */
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      /**Index Page Functions... */
      const signUpForm = document.getElementById('signUpForm');
      if (signUpForm) {
        signUpForm.onsubmit = (e) => {
            
            e.preventDefault();

            const phone = String(document.getElementById('phone').value).trim();
            const fName = String(document.getElementById('fName').value).trim();
            const lName = String(document.getElementById('lName').value).trim();
            const email = String(document.getElementById('email').value).trim();
            const password = String(document.getElementById('password').value).trim();
            const confirm = String(document.getElementById('confirm').value).trim();
            const nameFormat = /^[a-zA-Z]+$/i;

            if (fName == "") {
              alert("First Name is required");
              return false;
            } else if (!nameFormat.test(fName)) {
              alert("First Name can only contain letters");
              return false;
            }
            if (lName == "") {
              alert("Last Name is required");
              return false;
            } else if (!nameFormat.test(lName)) {
              alert("Last Name can only contain letters");
              return false;
            }
            if (phone == "") {
              alert("Phone number is required");
              return false;
            }
            
            const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (email == "") {
              alert("Email is required");
              return false;
            } else if (!emailRegEx.test(email)) {
              alert("Invalid email format");
              return false;
            }
            
            if (password.length < 10) {
              alert("Password not up to 10 characters");
              return false;
            } else if (/^[a-zA-Z]+$/i.test(password) || /^[0-9]+$/i.test(password)) {
              alert("Weak password: mix letters, numbers, and special characters");
              return false;
            } else if (confirm != password) {
              alert("Password and confirm password not match");
              return false;
            }
            const btnSignUp = document.getElementById('btnSignUp');
            btnSignUp.innerHTML = '<i class="spinner spin"></i> Wait...';
            setTimeout(function () { btnSignUp.innerHTML ='Sign Up'; }, 10000);
            
        };
      }

      /***Signin Page Functions... */

      const signInForm = document.getElementById('signInForm');
      if (signInForm) {
        signInForm.onsubmit = (e) => {
          e.preventDefault();

          const btnLogin = document.getElementById('btnSignIn');
          btnLogin.setAttribute('disabled', 'disabled');
          const username = String(document.getElementById('username').value).trim();
          const password = String(document.getElementById('password').value).trim();
          
          if (username === '') {
            alert("Username is required");
            btnLogin.removeAttribute('disabled');
            return false;
          }

          if (password === '') {
            alert("Password is required");
            btnLogin.removeAttribute('disabled');
            return false;
          }

          btnLogin.innerHTML = '<i class="spinner spin"></i> Authenticating...';
          setTimeout(function () { 
            btnLogin.removeAttribute('disabled');
            btnLogin.innerHTML ='<i class="lock"></i>&nbsp;Sign In';
            window.location.replace("dashboard.html");
          }, 1000);
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

          let period = null;

          const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (String(email.value).trim() == "") {
            alert("Email is required");
            btnReset.removeAttribute('disabled');
            return false;
          } else if (!emailRegEx.test(String(email.value).trim())) {
            alert("Invalid email format");
            btnReset.removeAttribute('disabled');
            return false;
          }

          if (otp.getAttribute('required') && password.getAttribute('required') && confirm.getAttribute('required')) {

            if (period) {
              clearInterval(period);
            }

            if (!otpTimer.getAttribute('class')) {
              otpTimer.setAttribute('class', 'hidden');
            }
            if (!otpDisplay.getAttribute('class')) {
              otpDisplay.setAttribute('class', 'hidden');
            }
            if (!resend.getAttribute('class')) {
              resend.setAttribute('class', 'hidden');
            }

            if (String(otp.value).trim() == "") {
              alert("OTP is required");
              btnReset.removeAttribute('disabled');
              return false;
            }
            
            if (String(password.value).length < 10) {
              alert("Password not up to 10 characters");
              btnReset.removeAttribute('disabled');
              return false;
            } else if (String(password.value).trim() === '') {
              alert("New password field cannot be empty");
              btnReset.removeAttribute('disabled');
              return false;
            } else if (/^[a-zA-Z]+$/i.test(String(password.value)) || /^[0-9]+$/i.test(String(password.value))) {
              alert("Weak password: mix letters, numbers, and special characters");
              btnReset.removeAttribute('disabled');
              return false;
            }
            
            if (String(confirm.value) !== String(password.value)) {
              alert("Password and confirm password not match");
              btnReset.removeAttribute('disabled');
              return false;
            }
            
            btnReset.innerHTML = '<i class="spinner spin"></i> Resetting Password...';
            setTimeout(function () {
              btnReset.removeAttribute('disabled');
              btnReset.innerHTML ='<i id="resetSpin" class="lock"></i>&nbsp;Request OTP';
              alert('Password reset successful!');

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
            btnReset.innerHTML = '<i class="spinner spin"></i> Requesting OTP...';
            setTimeout(function () {
              btnReset.removeAttribute('disabled');
              btnReset.innerHTML ='Reset Password';
              alert('Success! Check your email for an OTP!');

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

      /**Dashboard Page Functions... */

      //Political parties link click...
      const linkParties = document.getElementById('linkParties');
      if (linkParties) {
        linkParties.onclick = (e) => {
          if (!document.getElementById('addPartyForm').getAttribute('class')) {
            document.getElementById('addPartyForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('editPartyForm').getAttribute('class')) {
            document.getElementById('editPartyForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('addOfficeForm').getAttribute('class')) {
            document.getElementById('addOfficeForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('contestForm').getAttribute('class')) {
            document.getElementById('contestForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('candidateList').getAttribute('class')) {
            document.getElementById('candidateList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('votedCandidates').getAttribute('class')) {
            document.getElementById('votedCandidates').setAttribute('class', 'hidden');
          }
        
          if (document.getElementById('partyList').getAttribute('class')) {
            document.getElementById('partyList').removeAttribute('class');
          }

          if (linkOffices.getAttribute('class')) linkOffices.removeAttribute('class');
          if (linkProfile.getAttribute('class')) linkProfile.removeAttribute('class');
          if (linkPolls.getAttribute('class')) linkPolls.removeAttribute('class');
          if (linkContest.getAttribute('class')) linkContest.removeAttribute('class');

          if (!linkParties.getAttribute('class')) linkParties.setAttribute('class', 'active');
        }
      }

      //Government offices link click...
      const linkOffices = document.getElementById('linkOffices');
      if (linkOffices) {
        linkOffices.onclick = (e) => {
          if (!document.getElementById('addPartyForm').getAttribute('class')) {
            document.getElementById('addPartyForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('editPartyForm').getAttribute('class')) {
            document.getElementById('editPartyForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('partyList').getAttribute('class')) {
            document.getElementById('partyList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('contestForm').getAttribute('class')) {
            document.getElementById('contestForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('candidateList').getAttribute('class')) {
            document.getElementById('candidateList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('votedCandidates').getAttribute('class')) {
            document.getElementById('votedCandidates').setAttribute('class', 'hidden');
          }
        
          if (document.getElementById('addOfficeForm').getAttribute('class')) {
            document.getElementById('addOfficeForm').removeAttribute('class');
          }

          if (linkParties.getAttribute('class')) linkParties.removeAttribute('class');
          if (linkProfile.getAttribute('class')) linkProfile.removeAttribute('class');
          if (linkPolls.getAttribute('class')) linkPolls.removeAttribute('class');
          if (linkContest.getAttribute('class')) linkContest.removeAttribute('class');

          if (!linkOffices.getAttribute('class')) linkOffices.setAttribute('class', 'active');
        }
      }

      //Polls link click...
      const linkPolls = document.getElementById('linkPolls');
      if (linkPolls) {
        linkPolls.onclick = (e) => {
          if (!document.getElementById('addPartyForm').getAttribute('class')) {
            document.getElementById('addPartyForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('editPartyForm').getAttribute('class')) {
            document.getElementById('editPartyForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('partyList').getAttribute('class')) {
            document.getElementById('partyList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('addOfficeForm').getAttribute('class')) {
            document.getElementById('addOfficeForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('contestForm').getAttribute('class')) {
            document.getElementById('contestForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('votedCandidates').getAttribute('class')) {
            document.getElementById('votedCandidates').setAttribute('class', 'hidden');
          }
        
          if (document.getElementById('candidateList').getAttribute('class')) {
            document.getElementById('candidateList').removeAttribute('class');
          }

          if (linkOffices.getAttribute('class')) linkOffices.removeAttribute('class');
          if (linkProfile.getAttribute('class')) linkProfile.removeAttribute('class');
          if (linkParties.getAttribute('class')) linkParties.removeAttribute('class');
          if (linkContest.getAttribute('class')) linkContest.removeAttribute('class');

          if (!linkPolls.getAttribute('class')) linkPolls.setAttribute('class', 'active');
        }
      }

      //Profile link click...
      const linkProfile = document.getElementById('linkProfile');
      if (linkProfile) {
        linkProfile.onclick = (e) => {
          if (!document.getElementById('addPartyForm').getAttribute('class')) {
            document.getElementById('addPartyForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('editPartyForm').getAttribute('class')) {
            document.getElementById('editPartyForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('partyList').getAttribute('class')) {
            document.getElementById('partyList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('addOfficeForm').getAttribute('class')) {
            document.getElementById('addOfficeForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('contestForm').getAttribute('class')) {
            document.getElementById('contestForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('candidateList').getAttribute('class')) {
            document.getElementById('candidateList').setAttribute('class', 'hidden');
          }
        
          if (document.getElementById('votedCandidates').getAttribute('class')) {
            document.getElementById('votedCandidates').removeAttribute('class');
          }

          if (linkOffices.getAttribute('class')) linkOffices.removeAttribute('class');
          if (linkParties.getAttribute('class')) linkParties.removeAttribute('class');
          if (linkPolls.getAttribute('class')) linkPolls.removeAttribute('class');
          if (linkContest.getAttribute('class')) linkContest.removeAttribute('class');

          if (!linkProfile.getAttribute('class')) linkProfile.setAttribute('class', 'active');
        }
      }

      //Contest link click
      const linkContest = document.getElementById('linkContest');
      if (linkContest) {
        linkContest.onclick = (e) => {
          if (!document.getElementById('addPartyForm').getAttribute('class')) {
            document.getElementById('addPartyForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('editPartyForm').getAttribute('class')) {
            document.getElementById('editPartyForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('partyList').getAttribute('class')) {
            document.getElementById('partyList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('addOfficeForm').getAttribute('class')) {
            document.getElementById('addOfficeForm').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('candidateList').getAttribute('class')) {
            document.getElementById('candidateList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('votedCandidates').getAttribute('class')) {
            document.getElementById('votedCandidates').setAttribute('class', 'hidden');
          }
  
          if (document.getElementById('contestForm').getAttribute('class')) {
            document.getElementById('contestForm').removeAttribute('class');
          }
  
          if (linkOffices.getAttribute('class')) linkOffices.removeAttribute('class');
          if (linkParties.getAttribute('class')) linkParties.removeAttribute('class');
          if (linkPolls.getAttribute('class')) linkPolls.removeAttribute('class');
          if (linkProfile.getAttribute('class')) linkProfile.removeAttribute('class');
  
          if (!linkContest.getAttribute('class')) linkContest.setAttribute('class', 'active');
        }
      
      }

      //Add party form submission
      const addPartyForm = document.getElementById('addPartyForm');
      if (addPartyForm) {
        addPartyForm.onsubmit = (e) => {
          e.preventDefault();

          const partyName = document.getElementById('partyName');
          const partyAddress = document.getElementById('partyAddress');
          const partyLogo = document.getElementById('partyLogo');

          if (String(partyName.value).trim() === '') {
            alert('Party Name cannot be empty');
            return;
          }

          if (String(partyAddress.value).trim() === '') {
            alert('Party Address cannot be empty');
            return;
          }

          if (String(partyLogo).trim() === '') {
            alert('Party Logo file cannot be empty');
            return;
          }

          const btnAddParty = document.getElementById('btnAddParty');
          btnAddParty.innerHTML = '<i class="spinner spin"></i> Creating...';
          setTimeout(function () {
            partyName.value = '';
            partyAddress.value = '';
            partyLogo.value = '';
            btnAddParty.innerHTML ='Add Party';
          }, 10000);

        }
      }

      //Edit party form submission
      const editPartyForm = document.getElementById('editPartyForm');
      if(editPartyForm) {
        editPartyForm.onsubmit = (e) => {
          e.preventDefault();

          const partyName = document.getElementById('editPartyName');
          if (String(partyName.value).trim() === '') {
            alert('Party Name cannot be empty');
            return;
          }

          const btnEditParty = document.getElementById('btnEditParty');
          btnEditParty.innerHTML = '<i class="spinner spin"></i> Updating...';
          setTimeout(function () {
            partyName.value = '';
            btnEditParty.innerHTML ='Edit Party';
          }, 10000);

        }
      }

      //Add office form submission
      const addOfficeForm = document.getElementById('addOfficeForm');
      if(addOfficeForm) {
        addOfficeForm.onsubmit = (e) => {
          e.preventDefault();

          const officeType = document.getElementById('officeType');
          const officeName = document.getElementById('officeName');
          if (String(officeType.value).trim() === '') {
            alert('Office type cannot be empty');
            return;
          }
          if (String(officeName.value).trim() === '') {
            alert('Office name cannot be empty');
            return;
          }

          const btnAddOffice = document.getElementById('btnAddOffice');
          btnAddOffice.innerHTML = '<i class="spinner spin"></i> Creating...';
          setTimeout(function () {
            officeType.selectedIndex = 0;
            officeName.value = '';
            btnAddOffice.innerHTML ='Add Office';
          }, 10000);

        }
      }

      //Contest form submission
      const contestForm = document.getElementById('contestForm');
      if(contestForm) {
        contestForm.onsubmit = (e) => {
          e.preventDefault();

          const office = document.getElementById('contestOffice');
          const party = document.getElementById('contestParty');
          if (String(office.value).trim() === '') {
            alert('Office type cannot be empty');
            return;
          }
          if (String(party.value).trim() === '') {
            alert('Party cannot be empty');
            return;
          }

          const btnContest = document.getElementById('btnContest');
          btnContest.innerHTML = '<i class="spinner spin"></i> Creating...';
          setTimeout(function () {
            office.selectedIndex = 0;
            party.selectedIndex = 0;
            alert('Submission Successful')
            btnContest.innerHTML ='Contest';
          }, 10000);

        }
      }

    }
};

function toggleMenu(X) {
  X.classList.toggle("change");
  const x = document.getElementById("nav");
  if (x.className === "custom nav") {
      x.className += " responsive";
  } else {
      x.className = "custom nav";
  }
}

function newParty() {
  if (!document.getElementById('editPartyForm').getAttribute('class')) {
    document.getElementById('editPartyForm').setAttribute('class', 'hidden');
  }

  if (!document.getElementById('partyList').getAttribute('class')) {
    document.getElementById('partyList').setAttribute('class', 'hidden');
  }
  if (!document.getElementById('addOfficeForm').getAttribute('class')) {
    document.getElementById('addOfficeForm').setAttribute('class', 'hidden');
  }
  if (!document.getElementById('contestForm').getAttribute('class')) {
    document.getElementById('contestForm').setAttribute('class', 'hidden');
  }
  if (!document.getElementById('candidateList').getAttribute('class')) {
    document.getElementById('candidateList').setAttribute('class', 'hidden');
  }
  if (!document.getElementById('votedCandidates').getAttribute('class')) {
    document.getElementById('votedCandidates').setAttribute('class', 'hidden');
  }

  document.getElementById('addPartyForm').removeAttribute('class');
}

function editParty() {
  if (!document.getElementById('addPartyForm').getAttribute('class')) {
    document.getElementById('addPartyForm').setAttribute('class', 'hidden');
  }

  if (!document.getElementById('partyList').getAttribute('class')) {
    document.getElementById('partyList').setAttribute('class', 'hidden');
  }
  if (!document.getElementById('addOfficeForm').getAttribute('class')) {
    document.getElementById('addOfficeForm').setAttribute('class', 'hidden');
  }
  if (!document.getElementById('contestForm').getAttribute('class')) {
    document.getElementById('contestForm').setAttribute('class', 'hidden');
  }
  if (!document.getElementById('candidateList').getAttribute('class')) {
    document.getElementById('candidateList').setAttribute('class', 'hidden');
  }
  if (!document.getElementById('votedCandidates').getAttribute('class')) {
    document.getElementById('votedCandidates').setAttribute('class', 'hidden');
  }

  document.getElementById('editPartyForm').removeAttribute('class');
}

function removeParty() {
  if (confirm("Are you sure, you want to delete the party?\nClick 'OK' to continue")) {
    alert('Party deletion successful');
  }
}

function vote() {
  if (confirm("Confirm you want to vote Eneh for President!\nClick 'OK' to continue")) {
    alert('Vote successful');
  }
}
