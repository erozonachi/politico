/**
 * 
 * @author: Eneh, James 
 */
const base_url = 'https://politico-ng.herokuapp.com/api/v1/';
document.onreadystatechange = () => {
    if (document.readyState === 'complete') {

      const uploadImage = (file) => {
        const cloudName = 'eneh';
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        const formData = new FormData();

        formData.append('upload_preset', 'politico-eneh');
        formData.append('tags', 'client_upload');
        formData.append('file', file);

        const uploadResult = new Promise((resolve, reject) => {
          fetch(url, {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .catch(error => reject(error))
          .then(response => resolve(response));
        });

        return uploadResult;
      };
      // User display picture............................................................
      const displayPic = document.getElementById('dp');
      const displayName = document.getElementById('displayName');
      if (displayPic) {
        if (typeof(Storage) !== 'undefined' && sessionStorage.getItem('passportUrl')) {
          displayPic.removeAttribute('src');
          displayPic.setAttribute('src', sessionStorage.getItem('passportUrl'));
          displayName.innerHTML = sessionStorage.getItem('fullName').toUpperCase();
        }
      }
      // Access Control......................................................................
      const btnNewParty = document.getElementById('btnNewParty');
      const btnNewOffice = document.getElementById('btnNewOffice');
      if (btnNewParty || btnNewOffice) {
        if (typeof(Storage) !== 'undefined' && sessionStorage.getItem('isAdmin') === 'false') {
          btnNewParty.removeAttribute('class');
          btnNewParty.setAttribute('class', 'hidden');
          btnNewOffice.removeAttribute('class');
          btnNewOffice.setAttribute('class', 'hidden');
        }
      }
      /**Index Page Functions... */
      const signUpForm = document.getElementById('signUpForm');
      if (signUpForm) {
        signUpForm.onsubmit = (e) => {
            
          e.preventDefault();
          
          const password = String(document.getElementById('password').value).trim();
          const confirm = String(document.getElementById('confirm').value).trim();

          const phone = String(document.getElementById('phone').value).trim();
          const fName = String(document.getElementById('fName').value).trim();
          const lName = String(document.getElementById('lName').value).trim();
          const oName = String(document.getElementById('oName').value).trim();
          const email = String(document.getElementById('email').value).trim();
          const passport = document.getElementById('passport');

          const errPassword = document.getElementById('error-password');
          const errConfirm = document.getElementById('error-confirm');

          const btnSignUp = document.getElementById('btnNext');

          errPassword.innerHTML = '';
          errConfirm.innerHTML = '';
          
          if (password.length < 10) {
            errPassword.innerHTML = "Password not up to 10 characters";
            return;
          } else if (/^[a-zA-Z]+$/i.test(password) || /^[0-9]+$/i.test(password)) {
            errPassword.innerHTML = "Weak password: mix letters, numbers, and special characters";
            return false;
          } else if (confirm != password) {
            errConfirm.innerHTML = "Password and confirm password not match";
            return false;
          }

          btnSignUp.innerHTML = '<i class="spinner spin"></i> Wait...';
          
          const uploadResult = uploadImage(passport.files[0]);
          uploadResult.then((result) => {
            const imageUrl = result.secure_url;
            const payload = {
              firstName: fName,
              lastName: lName,
              otherName: oName,
              email: email,
              phoneNumber: phone,
              passportUrl: imageUrl,
              password: password
            };

            const url = `${base_url}auth/signup`;
            console.log(payload);
            const fetchData = { 
              method: 'POST', 
              body: JSON.stringify(payload),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            };

            fetch(url, fetchData)
            .then((resp) => resp.json(), (error) => {
              console.log(resp);
              console.error(error);
              btnSignUp.innerHTML = 'Sign Up';
              alert('SignUp cannot be completed at this time! Try again');
            })
            .then((res) => {
              //const res = JSON.parse(data);
              if (res.status === 201) {
                if (typeof(Storage) !== 'undefined') {
                  sessionStorage.setItem('userId', res.data[0].user.id);
                  sessionStorage.setItem('fullName', res.data[0].user.firstName +' '+ res.data[0].user.lastName);
                  sessionStorage.setItem('email', res.data[0].user.email);
                  sessionStorage.setItem('phone', res.data[0].user.phoneNumber);
                  sessionStorage.setItem('passportUrl', res.data[0].user.passportUrl);
                  sessionStorage.setItem('isAdmin', res.data[0].user.isAdmin);
                  sessionStorage.setItem('token', res.data[0].token);
                }
                console.log(res);
                btnSignUp.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Redirecting...';
                alert('Sign up successful!');
                window.location.replace("dashboard.html");
              } else {
                console.log(res);
                btnSignUp.innerHTML = 'Sign Up';
                alert(res.error);
              }
              //return data;
            }, (error) => {
              console.error(error);
              btnSignUp.innerHTML = 'Sign Up';
              alert('SignUp cannot be completed at this time! Try again');
            })
            .catch ((error) => {
              console.error(error);
              btnSignUp.innerHTML = 'Sign Up';
              alert('Unable to sign up, try again');
            });
          }, (error) => {
            console.error(`Error: ${error}`);
            btnSignUp.innerHTML = 'Sign Up'
          }).catch(error => {console.error(`Error: ${error}`); btnSignUp.innerHTML = 'Sign Up';});
            
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

          const errUsername = document.getElementById('error-username');
          const errPassword = document.getElementById('error-password');
          errUsername.innerHTML = '';
          errPassword.innerHTML = '';
          
          if (username === '') {
            errUsername.innerHTML = "Username is required";
            btnLogin.removeAttribute('disabled');
            return false;
          }

          if (password === '') {
            errPassword.innerHTML = "Password is required";
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

      // Reset Password form submission
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

          const errEmail = document.getElementById('error-email');
          const errOtp = document.getElementById('error-otp');
          const errPassword = document.getElementById('error-newPassword');
          const errConfirm = document.getElementById('error-confirm');

          errEmail.innerHTML = '';
          errOtp.innerHTML = '';
          errPassword.innerHTML = '';
          errConfirm.innerHTML = '';

          let period = null;

          const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (String(email.value).trim() == "") {
            errEmail.innerHTML = "Email is required";
            btnReset.removeAttribute('disabled');
            return false;
          } else if (!emailRegEx.test(String(email.value).trim())) {
            errEmail.innerHTML = "Invalid email format";
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
              errOtp.innerHTML = "OTP is required";
              btnReset.removeAttribute('disabled');
              return false;
            }
            
            if (String(password.value).length < 10) {
              errPassword.innerHTML = "Password not up to 10 characters";
              btnReset.removeAttribute('disabled');
              return false;
            } else if (String(password.value).trim() === '') {
              errPassword.innerHTML = "Password field cannot be empty";
              btnReset.removeAttribute('disabled');
              return false;
            } else if (/^[a-zA-Z]+$/i.test(String(password.value)) || /^[0-9]+$/i.test(String(password.value))) {
              errPassword.innerHTML = "Weak password: mix letters, numbers, and special characters";
              btnReset.removeAttribute('disabled');
              return false;
            }
            
            if (String(confirm.value) !== String(password.value)) {
              errConfirm.innerHTML = "Password and confirm password not match";
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
          if (!document.getElementById('officeList').getAttribute('class')) {
            document.getElementById('officeList').setAttribute('class', 'hidden');
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

          if (!linkParties.getAttribute('class')) linkParties.setAttribute('class', 'active');
        }
      }

      //Government offices link click...
      const linkOffices = document.getElementById('linkOffices');
      if (linkOffices) {
        linkOffices.onclick = (e) => {
          if (!document.getElementById('partyList').getAttribute('class')) {
            document.getElementById('partyList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('candidateList').getAttribute('class')) {
            document.getElementById('candidateList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('votedCandidates').getAttribute('class')) {
            document.getElementById('votedCandidates').setAttribute('class', 'hidden');
          }
        
          if (document.getElementById('officeList').getAttribute('class')) {
            document.getElementById('officeList').removeAttribute('class');
          }

          if (linkParties.getAttribute('class')) linkParties.removeAttribute('class');
          if (linkProfile.getAttribute('class')) linkProfile.removeAttribute('class');
          if (linkPolls.getAttribute('class')) linkPolls.removeAttribute('class');

          if (!linkOffices.getAttribute('class')) linkOffices.setAttribute('class', 'active');
        }
      }

      //Polls link click...
      const linkPolls = document.getElementById('linkPolls');
      if (linkPolls) {
        linkPolls.onclick = (e) => {
          if (!document.getElementById('partyList').getAttribute('class')) {
            document.getElementById('partyList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('officeList').getAttribute('class')) {
            document.getElementById('officeList').setAttribute('class', 'hidden');
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

          if (!linkPolls.getAttribute('class')) linkPolls.setAttribute('class', 'active');
        }
      }

      //Profile link click...
      const linkProfile = document.getElementById('linkProfile');
      if (linkProfile) {
        linkProfile.onclick = (e) => {
          if (!document.getElementById('partyList').getAttribute('class')) {
            document.getElementById('partyList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('officeList').getAttribute('class')) {
            document.getElementById('officeList').setAttribute('class', 'hidden');
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

          if (!linkProfile.getAttribute('class')) linkProfile.setAttribute('class', 'active');
        }
      }

      //Contest link click
      const linkContest = document.getElementById('linkContest');
      if (linkContest) {
        linkContest.onclick = (e) => {
          const modalContest = document.getElementById('modalContest');
          if (modalContest) {
            modalContest.style.display = 'block';
          }
        }
      
      }

      //Add party form submission
      const addPartyForm = document.getElementById('addPartyForm');
      if (addPartyForm) {
        addPartyForm.onsubmit = (e) => {
          e.preventDefault();

          const partyName = document.getElementById('partyName');
          const partyAddress = document.getElementById('partyAddress');
          const partyLogo = document.getElementById('partyLogo').value.trim();

          const errName = document.getElementById('error-partyName');
          const errAddress = document.getElementById('error-partyAddress');
          const errLogo = document.getElementById('error-partyLogo');

          errName.innerHTML = '';
          errAddress.innerHTML = '';
          errLogo.innerHTML = '';

          if (String(partyName.value).trim() === '') {
            errName.innerHTML = 'Party Name cannot be empty';
            return;
          } else if (!RegExp(/^[a-zA-Z\s]*$/, 'g').test(partyName.value.trim())) {
            errName.innerHTML = 'Name can only be words and spaces';
            return;
          }

          if (String(partyAddress.value).trim() === '') {
            errAddress.innerHTML = 'Party Address cannot be empty';
            return;
          } else if (RegExp(/^[0-9.\s]*$/, 'g').test(partyAddress.value.trim())) {
            errAddress.innerHTML = 'Address cannot be numbers';
            return;
          } else if (!RegExp(/^[A-Za-z0-9\, _]*[A-Za-z0-9\,][A-Za-z0-9\, _]*$/, 'g').test(partyAddress.value.trim())) {
            errAddress.innerHTML = 'Address can only contain letters, digits and spaces';
            return;
          }

          if (partyLogo === '') {
            errLogo.innerHTML = 'Party Logo file cannot be empty';
            return;
          } else if (!partyLogo.match(/\.jpg$/) && !partyLogo.match(/\.JPG$/) && !partyLogo.match(/\.png$/) && !partyLogo.match(/\.PNG$/)) {
            errLogo.innerHTML = ".jpg or .png extension required";
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
          const errPartyName = document.getElementById('error-editPartyName');

          errPartyName.innerHTML = '';

          if (String(partyName.value).trim() === '') {
            errPartyName.innerHTML = 'Party Name cannot be empty';
            return;
          } else if (!RegExp(/^[a-zA-Z\s]*$/, 'g').test(partyName.value.trim())) {
            errPartyName.innerHTML = 'Name can only be words and spaces';
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

          const errType = document.getElementById('error-officeType');
          const errName = document.getElementById('error-officeName');

          errType.innerHTML = '';
          errName.innerHTML = '';

          if (String(officeType.value).trim() === '') {
            errType.innerHTML = 'Office type cannot be empty';
            return;
          }
          if (String(officeName.value).trim() === '') {
            errName.innerHTML = 'Office name cannot be empty';
            return;
          } else if (!RegExp(/^[a-zA-Z\s]*$/, 'g').test(String(officeName.value).trim())) {
            errName.innerHTML = 'Name can only be words and spaces';
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
      if (contestForm) {
        contestForm.onsubmit = (e) => {
          e.preventDefault();

          const office = document.getElementById('contestOffice');
          const party = document.getElementById('contestParty');

          const errOffice = document.getElementById('error-contestOffice');
          const errParty = document.getElementById('error-contestParty');

          errOffice.innerHTML = '';
          errParty.innerHTML = '';

          if (String(office.value).trim() === '') {
            errOffice.innerHTML = 'Office type cannot be empty';
            return;
          }
          if (String(party.value).trim() === '') {
            errParty.innerHTML = 'Party cannot be empty';
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

      // Modals....................................................
      const closeContest = document.getElementById('closeContest');
      if (closeContest) {
        closeContest.onclick = (e) => {
          const modal = document.getElementById('modalContest');
          modal.style.display = 'none';
        }
      
      }

      const closeAddParty = document.getElementById('closeAddParty');
      if (closeAddParty) {
        closeAddParty.onclick = (e) => {
          const modal = document.getElementById('modalAddParty');
          modal.style.display = 'none';
        }
      
      }

      const closeAddOffice = document.getElementById('closeAddOffice');
      if (closeAddOffice) {
        closeAddOffice.onclick = (e) => {
          const modal = document.getElementById('modalAddOffice');
          modal.style.display = 'none';
        }
      
      }

      const closeEditParty = document.getElementById('closeEditParty');
      if (closeEditParty) {
        closeEditParty.onclick = (e) => {
          const modal = document.getElementById('modalEditParty');
          modal.style.display = 'none';
        }
      
      }

      window.onclick = (e) => {

        const modalContest = document.getElementById('modalContest');
        const modalAddParty = document.getElementById('modalAddParty');
        const modalAddOffice = document.getElementById('modalAddOffice');
        const modalEditParty = document.getElementById('modalEditParty');

        if (e.target == modalContest) {
          modalContest.style.display = "none";
        } 
        else if (e.target === modalAddParty) {
          modalAddParty.style.display = "none";
        }
        else if (e.target === modalAddOffice) {
          modalAddOffice.style.display = "none";
        }
        else if (e.target === modalEditParty) {
          modalEditParty.style.display = "none";
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

function previous() {
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const nameGroup = document.getElementById('nameGroup');
  const contactGroup = document.getElementById('contactGroup');
  const authGroup = document.getElementById('authGroup');

  if (!contactGroup.getAttribute('class')) {
    authGroup.setAttribute('class', 'hidden');
    contactGroup.setAttribute('class', 'hidden');
    nameGroup.removeAttribute('class');
    btnPrev.setAttribute('disabled', 'disabled');
    btnNext.innerHTML = 'Next';
    btnNext.setAttribute('type', 'button');
    return;
    
  } else if (!authGroup.getAttribute('class')) {
    authGroup.setAttribute('class', 'hidden');
    contactGroup.removeAttribute('class');
    nameGroup.setAttribute('class', 'hidden');
    btnPrev.removeAttribute('disabled');
    btnNext.innerHTML = 'Next';
    btnNext.setAttribute('type', 'button');
    return;
  }

  return;
}

function next() {
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const nameGroup = document.getElementById('nameGroup');
  const contactGroup = document.getElementById('contactGroup');
  const authGroup = document.getElementById('authGroup');

  const phone = String(document.getElementById('phone').value).trim();
  const fName = String(document.getElementById('fName').value).trim();
  const lName = String(document.getElementById('lName').value).trim();
  const oName = String(document.getElementById('oName').value).trim();
  const email = String(document.getElementById('email').value).trim();
  const passport = String(document.getElementById('passport').value).trim();
  const nameFormat = /^[a-zA-Z]+$/i;

  const errFName = document.getElementById('error-fName');
  const errLName = document.getElementById('error-lName');
  const errOName = document.getElementById('error-oName');
  const errPhone = document.getElementById('error-phone');
  const errEmail = document.getElementById('error-email');
  const errPassport = document.getElementById('error-passport');

  errFName.innerHTML = '';
  errLName.innerHTML = '';
  errOName.innerHTML = '';

  errEmail.innerHTML = '';
  errPhone.innerHTML = '';
  errPassport.innerHTML = '';

  if (!nameGroup.getAttribute('class')) {
    if (fName == "") {
      errFName.innerHTML = "First Name is required";
      return;
    } else if (!nameFormat.test(fName)) {
      errFName.innerHTML = "First Name can only contain letters";
      return;
    }
    if (lName == "") {
      errLName.innerHTML = "Last Name is required";
      return;
    } else if (!nameFormat.test(lName)) {
      errLName.innerHTML= "Last Name can only contain letters";
      return;
    }
    if (oName != "") {
      if (!nameFormat.test(oName)) {
        errOName.innerHTML= "Other Name can only contain letters";
        return;
      }
    }
    authGroup.setAttribute('class', 'hidden');
    contactGroup.removeAttribute('class');
    nameGroup.setAttribute('class', 'hidden');
    btnPrev.removeAttribute('disabled');
    btnNext.innerHTML = 'Next';
    btnNext.setAttribute('type', 'button');
    return;
    
  } else if (!contactGroup.getAttribute('class')) {
    if (phone == "") {
      errPhone.innerHTML = "Phone number is required";
      return;
    } else if (!RegExp(/^([0]{1}|[234]{3})([7-9]{1})([0|1]{1})([0|1|2|3|4|5|6|7|8|9]{1})([\d]{7})$/).test(phone)) {
      errPhone.innerHTML = "Invalid Nigerian mobile number";
      return;
    }
    
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == "") {
      errEmail.innerHTML = "Email is required";
      return;
    } else if (!emailRegEx.test(email)) {
      errEmail.innerHTML = "Invalid email format";
      return;
    }

    if (passport == "") {
      errPassport.innerHTML = "Passport is required";
      return;
    } else if (!passport.match(/\.jpg$/) && !passport.match(/\.JPG$/) && !passport.match(/\.png$/) && !passport.match(/\.PNG$/)) {
      errPassport.innerHTML = ".jpg or .png extension required";
      return;
    }

    authGroup.removeAttribute('class');
    contactGroup.setAttribute('class', 'hidden');
    nameGroup.setAttribute('class', 'hidden');
    btnPrev.removeAttribute('disabled');
    btnNext.innerHTML = 'Sign Up';
    btnNext.setAttribute('type', 'submit');
    return;

  }

  return;
}

function newParty() {
  const modal = document.getElementById('modalAddParty');
  if (modal) {
    modal.style.display = 'block';
  }
}

function newOffice() {
  const modal = document.getElementById('modalAddOffice');
  if (modal) {
    modal.style.display = 'block';
  }
}

function editParty() {
  const modal = document.getElementById('modalEditParty');
  if (modal) {
    modal.style.display = 'block';
  }
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
