/**
 * 
 * @author: Eneh, James 
 */
const base_url = 'https://politico-ng.herokuapp.com/api/v1/';
// Fetch parties endpoint call................................................
const fetchParties = () => {

  const result = new Promise((resolve, reject) => {
    
    const url = `${base_url}parties`;
      const fetchData = { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-access-token": sessionStorage.getItem('token') || ''
        }
      };

      fetch(url, fetchData)
      .then((resp) => resp.json(), (error) => {
        console.log(resp);
        console.error(error);
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          resolve(res);
        } else if (res.status === 401) {
          window.location.replace('signin.html');
        } else {
          console.log(res);
          resolve(res);
        }
      }, (error) => {
        console.error(error);
        reject(error)
      })
      .catch ((error) => {
        console.error(error);
        reject(error)
      });
  });

  return result;
};

// Fetch voted candidates endpoint call................................................
const fetchVotedCandidates = () => {

  const result = new Promise((resolve, reject) => {
    
    const url = `${base_url}votes/candidates`;
      const fetchData = { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-access-token": sessionStorage.getItem('token') || ''
        }
      };

      fetch(url, fetchData)
      .then((resp) => resp.json(), (error) => {
        console.log(resp);
        console.error(error);
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          resolve(res);
        } else if (res.status === 401) {
          window.location.replace('signin.html');
        } else {
          console.log(res);
          resolve(res);
        }
      }, (error) => {
        console.error(error);
        reject(error)
      })
      .catch ((error) => {
        console.error(error);
        reject(error)
      });
  });

  return result;
};
// Fetch petitions endpoint call................................................
const fetchPetitions = () => {

  const result = new Promise((resolve, reject) => {
    
    const url = `${base_url}petitions`;
      const fetchData = { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-access-token": sessionStorage.getItem('token') || ''
        }
      };

      fetch(url, fetchData)
      .then((resp) => resp.json(), (error) => {
        console.log(resp);
        console.error(error);
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          resolve(res);
        } else if (res.status === 401) {
          window.location.replace('signin.html');
        } else {
          console.log(res);
          resolve(res);
        }
      }, (error) => {
        console.error(error);
        reject(error)
      })
      .catch ((error) => {
        console.error(error);
        reject(error)
      });
  });

  return result;
};
// Request OTP endpoint call................................................
const getResetOtp = (email) => {

  const result = new Promise((resolve, reject) => {
    
    const url = `${base_url}auth/reset`;
    const payload = {
      email: email
    };
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
    })
    .then((res) => {
      console.log(res);
      resolve(res);
      
    }, (error) => {
      console.error(error);
      reject(error)
    })
    .catch ((error) => {
      console.error(error);
      reject(error)
    });
  });

  return result;
};
// Render Party List...................................................................
const renderPartyList = (list) => {
  const partyContainer = document.getElementById('partyContainer');
  const contestParty = document.getElementById('contestParty');

  if (partyContainer) {
    contestParty.innerHTML = '';
    const txtOption = document.createTextNode(`Choose Party`);
    const option = document.createElement('option');
    option.setAttribute('value', ``);
    option.appendChild(txtOption);
    contestParty.appendChild(option);
    partyContainer.innerHTML = '';
    if (list && list.length <= 0) {
      const bold = document.createElement('b');
      const txt = document.createTextNode('No Political Party found.');
      bold.appendChild(txt);
      const td = document.createElement('td');
      td.appendChild(bold);
      const tr = document.createElement('tr');
      tr.appendChild(td);
      partyContainer.innerHTML.appendChild(tr);
      return;
    }
    
    if (list) {
      list.forEach(item => {
        const img = document.createElement('img');
        img.setAttribute('class', 'avatar');
        img.setAttribute('src', item['logoUrl']);
        const tdLogo = document.createElement('td');
        tdLogo.setAttribute('data-label', 'Logo');
        tdLogo.appendChild(img);

        const tdName = document.createElement('td');
        tdName.setAttribute('data-label', 'Name');
        const txtName = document.createTextNode(item['name']);
        tdName.appendChild(txtName);

        const tdAddress = document.createElement('td');
        tdAddress.setAttribute('data-label', 'Address');
        const txtAddress = document.createTextNode(item['hqAddress']);
        tdAddress.appendChild(txtAddress);

        const btnEdit = document.createElement('button');
        btnEdit.setAttribute('class', 'btn edit');
        btnEdit.setAttribute('onclick', `editParty('${item['id']}', '${item['name']}');`);
        const txtEdit = document.createTextNode('Edit');
        btnEdit.appendChild(txtEdit);

        const btnDel = document.createElement('button');
        btnDel.setAttribute('class', 'btn del');
        btnDel.setAttribute('id', `btnRemove${item['id']}`);
        btnDel.setAttribute('onclick', `removeParty('${item['id']}');`);
        const txtDel = document.createTextNode('Remove');
        btnDel.appendChild(txtDel);

        const tdActions = document.createElement('td');
        tdActions.setAttribute('data-label', 'Actions');
        if (typeof(Storage) !== 'undefined' && sessionStorage.getItem('isAdmin') !== 'false') {
          tdActions.appendChild(btnEdit);
          tdActions.appendChild(btnDel);
        }

        const tr = document.createElement('tr');
        tr.appendChild(tdLogo);
        tr.appendChild(tdName);
        tr.appendChild(tdAddress);
        tr.appendChild(tdActions);

        // Party select box
        const txtOption = document.createTextNode(`${item['name']}`);
        const option = document.createElement('option');
        option.setAttribute('value', `${item['id']}`);
        option.appendChild(txtOption);

        partyContainer.appendChild(tr);
        contestParty.appendChild(option);
      });
    }
  }
  return;
};

// Render Petitions List...................................................................
const renderPetitionsList = (list) => {
  const container = document.getElementById('petitionsContainer');

  if (container) {
    container.innerHTML = '';
    if (list && list.length <= 0) {
      const bold = document.createElement('b');
      const txt = document.createTextNode('No Petition found.');
      bold.appendChild(txt);
      const td = document.createElement('td');
      td.appendChild(bold);
      const tr = document.createElement('tr');
      tr.appendChild(td);
      container.innerHTML.appendChild(tr);
      return;
    }
    
    if (list) {
      list.forEach(item => {
        const tdOffice = document.createElement('td');
        tdOffice.setAttribute('data-label', 'Office');
        const txtOffice = document.createTextNode(item['officeName']);
        tdOffice.appendChild(txtOffice);

        const img = document.createElement('img');
        img.setAttribute('class', 'avatar');
        img.setAttribute('src', item['logoUrl']);
        img.setAttribute('title', item['partyName']);
        const tdLogo = document.createElement('td');
        tdLogo.setAttribute('data-label', 'Party');
        tdLogo.appendChild(img);

        const tdName = document.createElement('td');
        tdName.setAttribute('data-label', 'Candidate');
        const txtName = document.createTextNode(`${item['lastName']}, ${item['firstName']}`);
        tdName.appendChild(txtName);

        const btnRead = document.createElement('button');
        btnRead.setAttribute('class', 'btn relax');
        btnRead.setAttribute('onclick', `openModal('text', '${item['text']}');`);
        const txtRead = document.createTextNode('Read');
        btnRead.appendChild(txtRead);
        const tdBody = document.createElement('td');
        tdBody.setAttribute('data-label', 'Body');
        tdBody.appendChild(btnRead);

        const btnView = document.createElement('button');
        btnView.setAttribute('class', 'btn relax');
        btnView.setAttribute('onclick', `openModal('media', '${item['evidence'].join('$$')}');`);
        const txtView = document.createTextNode('View');
        btnView.appendChild(txtView);
        const tdEvidence = document.createElement('td');
        tdEvidence.setAttribute('data-label', 'Evidence');
        tdEvidence.appendChild(btnView);

        const tr = document.createElement('tr');
        tr.appendChild(tdOffice);
        tr.appendChild(tdLogo);
        tr.appendChild(tdName);
        tr.appendChild(tdBody);
        tr.appendChild(tdEvidence);

        container.appendChild(tr);
      });
    }
  }
  return;
};

// Render Candidate List...................................................................
const renderCandidateList = (list) => {
  const candidateContainer = document.getElementById('candidateContainer');

  if (candidateContainer) {
    candidateContainer.innerHTML = '';

    if (list) {
      list.forEach(item => {
        const img = document.createElement('img');
        img.setAttribute('class', 'avatar');
        img.setAttribute('src', item['logoUrl']);
        const tdLogo = document.createElement('td');
        tdLogo.setAttribute('data-label', 'Logo');
        tdLogo.setAttribute('title', `${item['partyName']}`);
        tdLogo.appendChild(img);

        const tdName = document.createElement('td');
        tdName.setAttribute('data-label', 'Candidate');
        const txtName = document.createTextNode(`${item['firstName']}, ${item['lastName']}`);
        tdName.appendChild(txtName);

        const btnVote = document.createElement('button');
        btnVote.setAttribute('class', 'btn edit');
        btnVote.setAttribute('id', `btnVote${item['id']}`);
        btnVote.setAttribute('onclick', `vote('${item['id']}');`);
        const txtVote = document.createTextNode('Vote');
        btnVote.appendChild(txtVote);

        const tdActions = document.createElement('td');
        tdActions.setAttribute('data-label', '');
        tdActions.appendChild(btnVote);

        const tr = document.createElement('tr');
        tr.appendChild(tdLogo);
        tr.appendChild(tdName);
        tr.appendChild(tdActions);

        candidateContainer.appendChild(tr);
      });
    }
  }
  return;
};

// Render Vote Result List...................................................................
const renderVoteResultList = (list) => {
  const container = document.getElementById('resultContainer');

  if (container) {
    container.innerHTML = '';

    if (list) {
      list.forEach(item => {
        const img = document.createElement('img');
        img.setAttribute('class', 'avatar');
        img.setAttribute('src', item['logoUrl']);
        const tdLogo = document.createElement('td');
        tdLogo.setAttribute('data-label', 'Party Logo');
        tdLogo.setAttribute('title', `${item['partyName']}`);
        tdLogo.appendChild(img);

        const tdName = document.createElement('td');
        tdName.setAttribute('data-label', 'Candidate');
        const txtName = document.createTextNode(`${item['firstName']}, ${item['lastName']}`);
        tdName.appendChild(txtName);

        const tdVotes = document.createElement('td');
        tdVotes.setAttribute('data-label', 'Votes');
        const txtVotes = document.createTextNode(`${item['result']}`);
        tdVotes.appendChild(txtVotes);

        const tr = document.createElement('tr');
        tr.appendChild(tdLogo);
        tr.appendChild(tdName);
        tr.appendChild(tdVotes);

        container.appendChild(tr);
      });
    }
  }
  return;
};

// Render voted candidates List...................................................................
const renderVotedCandidatesList = (list) => {
  const votedContainer = document.getElementById('votedContainer');

  if (votedContainer) {
    votedContainer.innerHTML = '';
    if (list && list.length <= 0) {
      const bold = document.createElement('b');
      const txt = document.createTextNode('No voted candidate found.');
      bold.appendChild(txt);
      const tr = document.createElement('tr');
      tr.appendChild(bold);
      votedContainer.appendChild(tr);
      return;
    }

    if (list) {
      list.forEach(item => {
        const img = document.createElement('img');
        img.setAttribute('class', 'avatar');
        img.setAttribute('src', item['logoUrl']);
        const tdLogo = document.createElement('td');
        tdLogo.setAttribute('data-label', 'Party Logo');
        tdLogo.setAttribute('title', `${item['partyName']}`);
        tdLogo.appendChild(img);

        const tdOffice = document.createElement('td');
        tdOffice.setAttribute('data-label', 'Office');
        const txtOffice = document.createTextNode(`${item['officeName']}`);
        tdOffice.appendChild(txtOffice);

        const tdName = document.createElement('td');
        tdName.setAttribute('data-label', 'Candidate');
        const txtName = document.createTextNode(`${item['firstName']}, ${item['lastName']}`);
        tdName.appendChild(txtName);

        const tr = document.createElement('tr');
        tr.appendChild(tdLogo);
        tr.appendChild(tdOffice);
        tr.appendChild(tdName);

        votedContainer.appendChild(tr);
      });
    }
  }
  return;
};
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
      
      // Access Control......................................................................
      const btnNewParty = document.getElementById('btnNewParty');
      const btnNewOffice = document.getElementById('btnNewOffice');
      if (btnNewParty || btnNewOffice) {
        const linkCandidate = document.getElementById('linkCandidate');
        const linkPetitions = document.getElementById('linkPetitionsList');
        if (typeof(Storage) !== 'undefined' && sessionStorage.getItem('isAdmin') === 'false') {
          linkPetitions.removeAttribute('class');
          linkPetitions.setAttribute('class', 'hidden');
          btnNewParty.removeAttribute('class');
          btnNewParty.setAttribute('class', 'hidden');
          btnNewOffice.removeAttribute('class');
          btnNewOffice.setAttribute('class', 'hidden');
          linkCandidate.removeAttribute('class');
          linkCandidate.setAttribute('class', 'hidden');
        }
      }

      // Render office List...................................................................
      const renderOfficeList = (list) => {
        const officeContainer = document.getElementById('officeContainer');
        const contestOffice = document.getElementById('contestOffice');
        const candidateOffice = document.getElementById('candidateOffice');
        const voteOffice = document.getElementById('voteOffice');
        const resultOffice = document.getElementById('resultOffice');
        const petitionOffice = document.getElementById('petitionOffice');

        if (officeContainer) {
          contestOffice.innerHTML = '';
          candidateOffice.innerHTML = '';
          voteOffice.innerHTML = '';
          resultOffice.innerHTML = '';
          petitionOffice.innerHTML = '';

          const txtOption = document.createTextNode(`Choose Office`);
          const option = document.createElement('option');
          option.setAttribute('value', ``);
          option.appendChild(txtOption);

          const txtOption1 = document.createTextNode(`Choose Office`);
          const option1 = document.createElement('option');
          option1.setAttribute('value', ``);
          option1.appendChild(txtOption1);

          const txtOption2 = document.createTextNode(`Choose Office`);
          const option2 = document.createElement('option');
          option2.setAttribute('value', ``);
          option2.appendChild(txtOption2);

          const txtOption3 = document.createTextNode(`Choose Office`);
          const option3 = document.createElement('option');
          option3.setAttribute('value', ``);
          option3.appendChild(txtOption3);

          const txtOption4 = document.createTextNode(`Choose Office`);
          const option4 = document.createElement('option');
          option4.setAttribute('value', ``);
          option4.appendChild(txtOption4);

          contestOffice.appendChild(option);
          candidateOffice.appendChild(option1);
          voteOffice.appendChild(option2);
          resultOffice.appendChild(option3);
          petitionOffice.appendChild(option4);
          
          officeContainer.innerHTML = '';
          if (list && list.length <= 0) {
            const bold = document.createElement('b');
            const txt = document.createTextNode('No Political Office found.');
            bold.appendChild(txt);
            const td = document.createElement('td');
            td.appendChild(bold);
            const tr = document.createElement('tr');
            tr.appendChild(td);
            officeContainer.appendChild(tr);
            return;
          }
          if (list) {
            list.forEach(item => {
              
              const tdType = document.createElement('td');
              tdType.setAttribute('data-label', 'Type');
              const txtType = document.createTextNode(item['type']);
              tdType.appendChild(txtType);

              const tdName = document.createElement('td');
              tdName.setAttribute('data-label', 'Name');
              const txtName = document.createTextNode(item['name']);
              tdName.appendChild(txtName);
    
              const tr = document.createElement('tr');
              tr.appendChild(tdType);
              tr.appendChild(tdName);

              // Office select box
              const txtOption = document.createTextNode(`${item['type']} - ${item['name']}`);
              const option = document.createElement('option');
              option.setAttribute('value', `${item['id']}`);
              option.appendChild(txtOption);

              const txtOption1 = document.createTextNode(`${item['type']} - ${item['name']}`);
              const option1 = document.createElement('option');
              option1.setAttribute('value', `${item['id']}`);
              option1.appendChild(txtOption1);

              const txtOption2 = document.createTextNode(`${item['type']} - ${item['name']}`);
              const option2 = document.createElement('option');
              option2.setAttribute('value', `${item['id']}`);
              option2.appendChild(txtOption2);

              const txtOption3 = document.createTextNode(`${item['type']} - ${item['name']}`);
              const option3 = document.createElement('option');
              option3.setAttribute('value', `${item['id']}`);
              option3.appendChild(txtOption3);

              const txtOption4 = document.createTextNode(`${item['type']} - ${item['name']}`);
              const option4 = document.createElement('option');
              option4.setAttribute('value', `${item['id']}`);
              option4.appendChild(txtOption4);
    
              officeContainer.appendChild(tr);
              contestOffice.appendChild(option);
              candidateOffice.appendChild(option1);
              voteOffice.appendChild(option2);
              resultOffice.appendChild(option3);
              petitionOffice.appendChild(option4);
            });
          }
        }
        return;
      };

      // Fetch offices endpoint call................................................
      const fetchOffices = () => {

        const result = new Promise((resolve, reject) => {
          
          const url = `${base_url}offices`;
            const fetchData = { 
              method: 'GET',
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-access-token": sessionStorage.getItem('token') || ''
              }
            };

            fetch(url, fetchData)
            .then((resp) => resp.json(), (error) => {
              console.log(resp);
              console.error(error);
            })
            .then((res) => {
              if (res.status === 200) {
                console.log(res);
                resolve(res);
              } else if (res.status === 401) {
                window.location.replace('signin.html');
              } else {
                console.log(res);
                resolve(res);
              }
            }, (error) => {
              console.error(error);
              reject(error)
            })
            .catch ((error) => {
              console.error(error);
              reject(error)
            });
        });

        return result;
      };

      // User display picture............................................................
      const displayPic = document.getElementById('dp');
      const displayName = document.getElementById('displayName');
      if (displayPic) {
        if (typeof(Storage) !== 'undefined' && sessionStorage.getItem('passportUrl')) {
          displayPic.removeAttribute('src');
          displayPic.setAttribute('src', sessionStorage.getItem('passportUrl'));
          displayName.innerHTML = sessionStorage.getItem('fullName').toUpperCase();

          const partiesList = fetchParties();
          partiesList.then((res) => {
            const list = res.data;
            renderPartyList(list);
          })
          .catch(error => { console.error(`Error: ${error}`) });

          const officesList = fetchOffices();
          officesList.then((res) => {
            const list = res.data;
            renderOfficeList(list);
          })
          .catch(error => { console.error(`Error: ${error}`) });

          const votedList = fetchVotedCandidates();
          votedList.then((res) => {
            const list = res.data;
            renderVotedCandidatesList(list);
          })
          .catch(error => { console.error(`Error: ${error}`) });

          if (sessionStorage.getItem('isAdmin') !== 'false') {
            const petitionList = fetchPetitions();
            petitionList.then((res) => {
              const list = res.data;
              renderPetitionsList(list);
            })
            .catch(error => { console.error(`Error: ${error}`) });
          }
        } else {
          window.location.replace('signin.html');
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
          
          const payload = {
            username: username,
            password: document.getElementById('password').value
          };

          const url = `${base_url}auth/login`;
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
            btnLogin.innerHTML = 'Sign Up';
            btnLogin.removeAttribute('disabled');
            alert('Something went wrong! Try again');
          })
          .then((res) => {
            //const res = JSON.parse(data);
            if (res.status === 200) {
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
              btnLogin.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Redirecting...';
              window.location.replace("dashboard.html");
            } else {
              console.log(res);
              btnLogin.innerHTML = 'Sign In';
              btnLogin.removeAttribute('disabled');
              alert(res.error);
            }
          }, (error) => {
            console.error(error);
            btnLogin.innerHTML = 'Sign In';
            btnLogin.removeAttribute('disabled');
            alert('Something went wrong! Try again');
          })
          .catch ((error) => {
            console.error(error);
            btnLogin.innerHTML = 'Sign In';
            btnLogin.removeAttribute('disabled');
            alert('Something went wrong, try again');
          });
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
            const payload = {
              email: email.value.trim(),
              otp: otp.value,
              password: password.value
            };
  
            const url = `${base_url}auth/reset`;
            console.log(payload);
            const fetchData = { 
              method: 'PATCH', 
              body: JSON.stringify(payload),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            };
  
            fetch(url, fetchData)
            .then((resp) => resp.json(), (error) => {
              console.log(resp);
              console.error(error);
              btnReset.innerHTML = 'Reset Password';
              btnReset.removeAttribute('disabled');
              alert('Something went wrong! Try again');
              return;
            })
            .then((res) => {

              if (res.status === 200) {
                console.log(res);
                btnReset.removeAttribute('disabled');
                btnReset.innerHTML ='<i id="resetSpin" class="lock"></i>&nbsp;Request OTP';
                alert('Successful');

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
                return;
              } else {
                console.log(res);
                btnReset.innerHTML = 'Reset Password';
                btnReset.removeAttribute('disabled');
                alert(res.error);
                return;
              }
            }, (error) => {
              console.error(error);
              btnReset.innerHTML = 'Reset Password';
              btnReset.removeAttribute('disabled');
              alert('Something went wrong! Try again');
              return;
            })
            .catch ((error) => {
              console.error(error);
              btnReset.innerHTML = 'Reset Password';
              btnReset.removeAttribute('disabled');
              alert('Something went wrong, try again');
              return;
            });
            
          } else {
            btnReset.innerHTML = '<i class="spinner spin"></i> Requesting OTP...';

            const getOtp = getResetOtp(email.value.trim());
            getOtp.then((res) => {
              if (res.status === 201 || res.status === 200) {
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
              } else {
                btnReset.removeAttribute('disabled');
                btnReset.innerHTML = 'Request OTP';
                alert(res.error);
                return;
              }
            }, (error) => {
              console.error(`Error: ${error}`);
              btnReset.removeAttribute('disabled');
              btnReset.innerHTML = 'Request OTP';
              alert('Unable to request OTP, try again!');
              return;
            })
            .catch(error => {
              console.error(`Error: ${error}`);
              btnReset.removeAttribute('disabled');
              btnReset.innerHTML = 'Request OTP';
              alert('Unable to request OTP, try again!');
              return;
            });
            
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
          if (!document.getElementById('resultList').getAttribute('class')) {
            document.getElementById('resultList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('petitionsList').getAttribute('class')) {
            document.getElementById('petitionsList').setAttribute('class', 'hidden');
          }
        
          if (document.getElementById('partyList').getAttribute('class')) {
            document.getElementById('partyList').removeAttribute('class');
          }

          if (linkOffices.getAttribute('class')) linkOffices.removeAttribute('class');
          if (linkProfile.getAttribute('class')) linkProfile.removeAttribute('class');
          if (linkPolls.getAttribute('class')) linkPolls.removeAttribute('class');
          if (linkResult.getAttribute('class')) linkResult.removeAttribute('class');
          if (linkPetitionsList.getAttribute('class') && sessionStorage.getItem('isAdmin') !== 'false') linkPetitionsList.removeAttribute('class');

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
          if (!document.getElementById('resultList').getAttribute('class')) {
            document.getElementById('resultList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('petitionsList').getAttribute('class')) {
            document.getElementById('petitionsList').setAttribute('class', 'hidden');
          }
        
          if (document.getElementById('officeList').getAttribute('class')) {
            document.getElementById('officeList').removeAttribute('class');
          }

          if (linkParties.getAttribute('class')) linkParties.removeAttribute('class');
          if (linkProfile.getAttribute('class')) linkProfile.removeAttribute('class');
          if (linkPolls.getAttribute('class')) linkPolls.removeAttribute('class');
          if (linkResult.getAttribute('class')) linkResult.removeAttribute('class');
          if (linkPetitionsList.getAttribute('class') && sessionStorage.getItem('isAdmin') !== 'false') linkPetitionsList.removeAttribute('class');

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
          if (!document.getElementById('resultList').getAttribute('class')) {
            document.getElementById('resultList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('petitionsList').getAttribute('class')) {
            document.getElementById('petitionsList').setAttribute('class', 'hidden');
          }
        
          if (document.getElementById('candidateList').getAttribute('class')) {
            document.getElementById('candidateList').removeAttribute('class');
          }

          if (linkOffices.getAttribute('class')) linkOffices.removeAttribute('class');
          if (linkProfile.getAttribute('class')) linkProfile.removeAttribute('class');
          if (linkParties.getAttribute('class')) linkParties.removeAttribute('class');
          if (linkResult.getAttribute('class')) linkResult.removeAttribute('class');
          if (linkPetitionsList.getAttribute('class') && sessionStorage.getItem('isAdmin') !== 'false') linkPetitionsList.removeAttribute('class');

          if (!linkPolls.getAttribute('class')) linkPolls.setAttribute('class', 'active');
        }
      }

      //Poll Result link click...
      const linkResult = document.getElementById('linkResult');
      if (linkResult) {
        linkResult.onclick = (e) => {
          if (!document.getElementById('partyList').getAttribute('class')) {
            document.getElementById('partyList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('officeList').getAttribute('class')) {
            document.getElementById('officeList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('votedCandidates').getAttribute('class')) {
            document.getElementById('votedCandidates').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('candidateList').getAttribute('class')) {
            document.getElementById('candidateList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('petitionsList').getAttribute('class')) {
            document.getElementById('petitionsList').setAttribute('class', 'hidden');
          }

          if (document.getElementById('resultList').getAttribute('class')) {
            document.getElementById('resultList').removeAttribute('class');
          }

          if (linkOffices.getAttribute('class')) linkOffices.removeAttribute('class');
          if (linkProfile.getAttribute('class')) linkProfile.removeAttribute('class');
          if (linkParties.getAttribute('class')) linkParties.removeAttribute('class');
          if (linkPolls.getAttribute('class')) linkPolls.removeAttribute('class');
          if (linkPetitionsList.getAttribute('class') && sessionStorage.getItem('isAdmin') !== 'false') linkPetitionsList.removeAttribute('class');

          if (!linkResult.getAttribute('class')) linkResult.setAttribute('class', 'active');
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
          if (!document.getElementById('resultList').getAttribute('class')) {
            document.getElementById('resultList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('petitionsList').getAttribute('class')) {
            document.getElementById('petitionsList').setAttribute('class', 'hidden');
          }
        
          if (document.getElementById('votedCandidates').getAttribute('class')) {
            document.getElementById('votedCandidates').removeAttribute('class');
          }

          if (linkOffices.getAttribute('class')) linkOffices.removeAttribute('class');
          if (linkParties.getAttribute('class')) linkParties.removeAttribute('class');
          if (linkPolls.getAttribute('class')) linkPolls.removeAttribute('class');
          if (linkResult.getAttribute('class')) linkResult.removeAttribute('class');
          if (linkPetitionsList.getAttribute('class') && sessionStorage.getItem('isAdmin') !== 'false') linkPetitionsList.removeAttribute('class');

          if (!linkProfile.getAttribute('class')) linkProfile.setAttribute('class', 'active');
        }
      }
      
      //Petitions List link click...
      const linkPetitionsList = document.getElementById('linkPetitionsList');
      if (linkPetitionsList) {
        linkPetitionsList.onclick = (e) => {
          if (!document.getElementById('partyList').getAttribute('class')) {
            document.getElementById('partyList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('officeList').getAttribute('class')) {
            document.getElementById('officeList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('candidateList').getAttribute('class')) {
            document.getElementById('candidateList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('resultList').getAttribute('class')) {
            document.getElementById('resultList').setAttribute('class', 'hidden');
          }
          if (!document.getElementById('votedCandidates').getAttribute('class')) {
            document.getElementById('votedCandidates').setAttribute('class', 'hidden');
          }
        
          if (document.getElementById('petitionsList').getAttribute('class')) {
            document.getElementById('petitionsList').removeAttribute('class');
          }

          if (linkOffices.getAttribute('class')) linkOffices.removeAttribute('class');
          if (linkParties.getAttribute('class')) linkParties.removeAttribute('class');
          if (linkPolls.getAttribute('class')) linkPolls.removeAttribute('class');
          if (linkResult.getAttribute('class')) linkResult.removeAttribute('class');
          if (linkProfile.getAttribute('class')) linkProfile.removeAttribute('class');

          if (!linkPetitionsList.getAttribute('class')) linkPetitionsList.setAttribute('class', 'active');
        }
      }

      //Register Candidate link click
      const linkCandidate = document.getElementById('linkCandidate');
      if (linkCandidate) {
        linkCandidate.onclick = (e) => {
          const modalCandidate = document.getElementById('modalCandidate');
          if (modalCandidate) {
            modalCandidate.style.display = 'block';
          }
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

      //Contest link click
      const linkPetition = document.getElementById('linkPetition');
      if (linkPetition) {
        linkPetition.onclick = (e) => {
          const modal = document.getElementById('modalPetition');
          if (modal) {
            modal.style.display = 'block';
          }
        }
      
      }
      
      //Resend OTP link click
      const resendOtp = document.getElementById('resend');
      if (resendOtp) {
        resendOtp.onclick = (e) => {
          resendOtp.innerHTML = 'Resending...'
          const email = document.getElementById('email');
          const getOtp = getResetOtp(email.value.trim());
            getOtp.then((res) => {
              if (res.status === 201 || res.status === 200) {
                resendOtp.innerHTML ='Resend OTP';
                alert('Success! Check your email for an OTP!');

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
                    const resetForm = document.getElementById('resetForm');
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
              } else {
                resendOtp.innerHTML ='Resend OTP';
                alert(res.error);
                return;
              }
            }, (error) => {
              console.error(`Error: ${error}`);
              resendOtp.innerHTML ='Resend OTP';
              alert('Unable to request OTP, try again!');
              return;
            })
            .catch(error => {
              console.error(`Error: ${error}`);
              resendOtp.innerHTML ='Resend OTP';
              alert('Unable to request OTP, try again!');
              return;
            });
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

          if (partyLogo.value.trim() === '') {
            errLogo.innerHTML = 'Party Logo file cannot be empty';
            return;
          } else if (!partyLogo.value.trim().match(/\.jpg$/) && !partyLogo.value.trim().match(/\.JPG$/) && !partyLogo.value.trim().match(/\.png$/) && !partyLogo.value.trim().match(/\.PNG$/)) {
            errLogo.innerHTML = ".jpg or .png extension required";
            return;
          }

          const btnAddParty = document.getElementById('btnAddParty');
          btnAddParty.innerHTML = '<i class="spinner spin"></i> Creating...';
          
          const uploadResult = uploadImage(partyLogo.files[0]);
          uploadResult.then((result) => {
            const imageUrl = result.secure_url;
            const payload = {
              name: partyName.value.trim(),
              hqAddress: partyAddress.value.trim(),
              logoUrl: imageUrl
            };

            const url = `${base_url}parties`;
            console.log(payload);
            const fetchData = { 
              method: 'POST', 
              body: JSON.stringify(payload),
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-access-token": sessionStorage.getItem('token')
              }
            };

            fetch(url, fetchData)
            .then((resp) => resp.json(), (error) => {
              console.log(resp);
              console.error(error);
              btnAddParty.innerHTML = 'Add Party';
              alert('Party cannot be added at this time! Try again');
            })
            .then((res) => {
              //const res = JSON.parse(data);
              if (res.status === 201) {
                console.log(res);
                partyName.value = '';
                partyAddress.value = '';
                delete partyLogo.files;
                partyLogo.value = '';
                btnAddParty.innerHTML ='Add Party';
                alert('Successful!');
                const partiesList = fetchParties();
                partiesList.then((res) => {
                  const list = res.data;
                  renderPartyList(list);
                })
                .catch(error => { console.error(`Error: ${error}`) });
              } else {
                console.log(res);
                btnAddParty.innerHTML = 'Add Party';
                alert(res.error);
              }
              //return data;
            }, (error) => {
              console.error(error);
              btnAddParty.innerHTML = 'Add Party';
              alert('Party cannot be added at this time! Try again');
            })
            .catch ((error) => {
              console.error(error);
              btnAddParty.innerHTML = 'Add Party';
              alert('Unable to add party, try again');
            });
          }, (error) => {
            console.error(`Error: ${error}`);
            btnAddParty.innerHTML = 'Add Party';
          }).catch(error => {console.error(`Error: ${error}`); btnAddParty.innerHTML = 'Add Party';});

        }
      }

      //Edit party form submission
      const editPartyForm = document.getElementById('editPartyForm');
      if(editPartyForm) {
        editPartyForm.onsubmit = (e) => {
          e.preventDefault();

          const partyName = document.getElementById('editPartyName');
          const partyId = document.getElementById('partyID');
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

          const url = `${base_url}parties/${partyId.value.trim()}/${partyName.value.trim()}`;
          const fetchData = { 
            method: 'PATCH', 
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "x-access-token": sessionStorage.getItem('token')
            }
          };

          fetch(url, fetchData)
          .then((resp) => resp.json(), (error) => {
            console.log(resp);
            console.error(error);
            btnEditParty.innerHTML = 'Edit Party';
            alert('Party cannot be edited at this time! Try again');
          })
          .then((res) => {
            //const res = JSON.parse(data);
            if (res.status === 200) {
              console.log(res);
              btnEditParty.innerHTML ='Edit Party';
              alert('Successful!');
              const partiesList = fetchParties();
              partiesList.then((res) => {
                const list = res.data;
                renderPartyList(list);
              })
              .catch(error => { console.error(`Error: ${error}`) });
            } else {
              console.log(res);
              btnEditParty.innerHTML = 'Edit Party';
              alert(res.error);
            }
            //return data;
          }, (error) => {
            console.error(error);
            btnEditParty.innerHTML = 'Edit Party';
            alert('Party cannot be edited at this time! Try again');
          })
          .catch ((error) => {
            console.error(error);
            btnEditParty.innerHTML = 'Edit Party';
            alert('Unable to edit party, try again');
          });

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
          
          const payload = {
            type: officeType.value.trim(),
            name: officeName.value.trim(),
          };

          const url = `${base_url}offices`;
          console.log(payload);
          const fetchData = { 
            method: 'POST', 
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "x-access-token": sessionStorage.getItem('token')
            }
          };

          fetch(url, fetchData)
          .then((resp) => resp.json(), (error) => {
            console.log(resp);
            console.error(error);
            btnAddOffice.innerHTML = 'Add Office';
            alert('Office cannot be added at this time! Try again');
          })
          .then((res) => {
            //const res = JSON.parse(data);
            if (res.status === 201) {
              console.log(res);
              officeType.selectedIndex = 0;
              officeName.value = '';
              btnAddOffice.innerHTML ='Add Office';
              alert('Successful!');
              const officesList = fetchOffices();
              officesList.then((res) => {
                const list = res.data;
                renderOfficeList(list);
              })
              .catch(error => { console.error(`Error: ${error}`) });
            } else {
              console.log(res);
              btnAddOffice.innerHTML = 'Add Office';
              alert(res.error);
            }
            //return data;
          }, (error) => {
            console.error(error);
            btnAddOffice.innerHTML = 'Add Office';
            alert('Office cannot be added at this time! Try again');
          })
          .catch ((error) => {
            console.error(error);
            btnAddOffice.innerHTML = 'Add Office';
            alert('Unable to add office, try again');
          });

        }
      }

      // On click Office select box (Voting)
      const voteOffice = document.getElementById('voteOffice');
      if (voteOffice) {
        voteOffice.onchange = (e) => {
          e.preventDefault();

          const candidateContainer = document.getElementById('candidateContainer');
          candidateContainer.innerHTML = '';
          const bold = document.createElement('b');
          const txt = document.createTextNode('Loading...');
          bold.appendChild(txt);
          const td = document.createElement('td');
          td.appendChild(bold);
          const tr = document.createElement('tr');
          tr.appendChild(td);
          candidateContainer.appendChild(tr);

          if (voteOffice.value.trim() !== '') {
            const url = `${base_url}offices/${voteOffice.value}/candidates`;
            const fetchData = { 
              method: 'GET',
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-access-token": sessionStorage.getItem('token')
              }
            };

            fetch(url, fetchData)
            .then((resp) => resp.json(), (error) => {
              console.log(resp);
              console.error(error);
              candidateContainer.innerHTML = '';
              alert('Candidates cannot be loaded at this time! Try again');
            })
            .then((res) => {
              //const res = JSON.parse(data);
              if (res.status === 200) {
                console.log(res);
                if (res.data.length > 0) {
                  candidateContainer.innerHTML ='';
                  renderCandidateList(res.data);
                } else {
                  candidateContainer.innerHTML ='<tr><td>No candidate found for the selected office</td></tr>';
                }
              } else {
                console.log(res);
                candidateContainer.innerHTML = '';
                alert(res.error);
              }
              //return data;
            }, (error) => {
              console.error(error);
              candidateContainer.innerHTML = '';
              alert('Candidates cannot be loaded at this time! Try again');
            })
            .catch ((error) => {
              console.error(error);
              candidateContainer.innerHTML = '';
              alert('Unable to load candidates, try again');
            });
          } else {
            candidateContainer.innerHTML = '';
          }
        }
      }

      // On change Office select box (Vote Results)
      const resultOffice = document.getElementById('resultOffice');
      if (resultOffice) {
        resultOffice.onchange = (e) => {
          e.preventDefault();

          const resultContainer = document.getElementById('resultContainer');
          resultContainer.innerHTML = '';
          const bold = document.createElement('b');
          const txt = document.createTextNode('Loading...');
          bold.appendChild(txt);
          const td = document.createElement('td');
          td.appendChild(bold);
          const tr = document.createElement('tr');
          tr.appendChild(td);
          resultContainer.appendChild(tr);

          if (resultOffice.value.trim() !== '') {
            const url = `${base_url}offices/${resultOffice.value}/result`;
            const fetchData = { 
              method: 'GET',
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-access-token": sessionStorage.getItem('token')
              }
            };

            fetch(url, fetchData)
            .then((resp) => resp.json(), (error) => {
              console.log(resp);
              console.error(error);
              resultContainer.innerHTML ='';
              alert('Result cannot be loaded at this time! Try again');
            })
            .then((res) => {
              //const res = JSON.parse(data);
              if (res.status === 200) {
                console.log(res);
                if (res.data.length > 0) {
                  resultContainer.innerHTML ='';
                  renderVoteResultList(res.data);
                } else {
                  resultContainer.innerHTML ='<tr><td>No result found for the selected office</td></tr>';
                }
              } else {
                console.log(res);
                resultContainer.innerHTML = '';
                alert(res.error);
              }
              //return data;
            }, (error) => {
              console.error(error);
              resultContainer.innerHTML = '';
              alert('Result cannot be loaded at this time! Try again');
            })
            .catch ((error) => {
              console.error(error);
              resultContainer.innerHTML = '';
              alert('Unable to load result, try again');
            });
          } else {
            resultContainer.innerHTML = '';
          }
        }
      }

      // On click Office select box
      const candidateOffice = document.getElementById('candidateOffice');
      if (candidateOffice) {
        candidateOffice.onchange = (e) => {
          e.preventDefault();

          const candidate = document.getElementById('candidateUser');
          candidate.innerHTML = '';
          const txtOption = document.createTextNode(`Choose Candidate`);
          const option = document.createElement('option');
          option.setAttribute('value', ``);
          option.appendChild(txtOption);
          candidate.appendChild(option);

          const infoCandidate = document.getElementById('info-candidateUser');
          infoCandidate.innerHTML = 'Loading...';

          if (candidateOffice.value.trim() !== '') {
            const url = `${base_url}offices/${candidateOffice.value}/interests`;
            const fetchData = { 
              method: 'GET',
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-access-token": sessionStorage.getItem('token')
              }
            };

            fetch(url, fetchData)
            .then((resp) => resp.json(), (error) => {
              console.log(resp);
              console.error(error);
              infoCandidate.innerHTML = '';
              alert('Candidates cannot be loaded at this time! Try again');
            })
            .then((res) => {
              //const res = JSON.parse(data);
              if (res.status === 200) {
                console.log(res);
                if (res.data.length > 0) {
                  const list = res.data;
                  list.forEach(item => {
                    // Office select box
                    let partyCode = '';
                    const splited = item['partyName'].split(' ');
                    while (splited.length) {
                      partyCode = `${partyCode}${splited.shift().charAt(0).toUpperCase()}`;
                    }
                    const txtOption = document.createTextNode(`${item['officeName']} - ${partyCode} - ${item['firstName']} ${item['lastName']}`);
                    const option = document.createElement('option');
                    option.setAttribute('value', `${item['id']}-${item['office']}-${item['party']}-${item['user']}`);
                    option.appendChild(txtOption);

                    candidate.appendChild(option);
                  });
                  infoCandidate.innerHTML ='';
                } else {
                  infoCandidate.innerHTML ='';
                  alert('No candidate found for the selected office');
                }
              } else {
                console.log(res);
                infoCandidate.innerHTML = '';
                alert(res.error);
              }
              //return data;
            }, (error) => {
              console.error(error);
              infoCandidate.innerHTML = '';
              alert('Candidates cannot be loaded at this time! Try again');
            })
            .catch ((error) => {
              console.error(error);
              infoCandidate.innerHTML = '';
              alert('Unable to load candidates, try again');
            });
          } else {
            infoCandidate.innerHTML = '';
          }
        }
      }
      //Register Candidate form submission
      const candidateForm = document.getElementById('candidateForm');
      if (candidateForm) {
        candidateForm.onsubmit = (e) => {
          e.preventDefault();

          const office = document.getElementById('candidateOffice');
          const candidate = document.getElementById('candidateUser');

          const errOffice = document.getElementById('error-candidateOffice');
          const errCandidate = document.getElementById('error-candidateUser');

          errOffice.innerHTML = '';
          errCandidate.innerHTML = '';

          if (String(office.value).trim() === '') {
            errOffice.innerHTML = 'Office type cannot be empty';
            return;
          }
          if (String(candidate.value).trim() === '') {
            errCandidate.innerHTML = 'Candidate cannot be empty';
            return;
          }
          const btnCandidate = document.getElementById('btnCandidate');
          btnCandidate.innerHTML = '<i class="spinner spin"></i> Registering...';
          const idGroup = candidate.value.split('-');
          const payload = {
            office: idGroup[1].trim(),
            party: idGroup[2].trim(),
          };

          const url = `${base_url}offices/${idGroup[3]}/register`;
          console.log(payload);
          const fetchData = { 
            method: 'POST', 
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "x-access-token": sessionStorage.getItem('token')
            }
          };

          fetch(url, fetchData)
          .then((resp) => resp.json(), (error) => {
            console.log(resp);
            console.error(error);
            btnCandidate.innerHTML = 'Register';
            alert('Candidate cannot be registered at this time! Try again');
          })
          .then((res) => {
            //const res = JSON.parse(data);
            if (res.status === 201) {
              console.log(res);
              office.selectedIndex = 0;
              candidate.selectedIndex = 0;
              alert('Successful')
              btnCandidate.innerHTML ='Register';
            } else {
              console.log(res);
              btnCandidate.innerHTML = 'Register';
              alert(res.error);
            }
            //return data;
          }, (error) => {
            console.error(error);
            btnCandidate.innerHTML = 'Register';
            alert('Candidate cannot be registered at this time! Try again');
          })
          .catch ((error) => {
            console.error(error);
            btnCandidate.innerHTML = 'Register';
            alert('Unable to register candidate, try again');
          });
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
          
          const payload = {
            office: office.value.trim(),
            party: party.value.trim(),
          };

          const url = `${base_url}offices/interests`;
          console.log(payload);
          const fetchData = { 
            method: 'POST', 
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "x-access-token": sessionStorage.getItem('token')
            }
          };

          fetch(url, fetchData)
          .then((resp) => resp.json(), (error) => {
            console.log(resp);
            console.error(error);
            btnContest.innerHTML = 'Contest';
            alert('Interest cannot be expressed at this time! Try again');
          })
          .then((res) => {
            //const res = JSON.parse(data);
            if (res.status === 201) {
              console.log(res);
              office.selectedIndex = 0;
              party.selectedIndex = 0;
              alert('Successful')
              btnContest.innerHTML ='Contest';
            } else {
              console.log(res);
              btnContest.innerHTML = 'Contest';
              alert(res.error);
            }
            //return data;
          }, (error) => {
            console.error(error);
            btnContest.innerHTML = 'Contest';
            alert('Interest cannot be expressed at this time! Try again');
          })
          .catch ((error) => {
            console.error(error);
            btnContest.innerHTML = 'Contest';
            alert('Unable to express interest, try again');
          });

        }
      }

      //Petition form submission
      const petitionForm = document.getElementById('petitionForm');
      if (petitionForm) {
        petitionForm.onsubmit = (e) => {
          e.preventDefault();

          const office = document.getElementById('petitionOffice');
          const text = document.getElementById('petitionText');
          const evidence = document.getElementById('petitionEvidence');

          const errOffice = document.getElementById('error-petitionOffice');
          const errText = document.getElementById('error-petitionText');
          const errEvidence = document.getElementById('error-petitionEvidence');

          errOffice.innerHTML = '';
          errText.innerHTML = '';
          errEvidence.innerHTML = '';

          if (String(office.value).trim() === '') {
            errOffice.innerHTML = 'Office type cannot be empty';
            return;
          }
          if (String(text.value).trim() === '') {
            errText.innerHTML = 'Body cannot be empty';
            return;
          }
          if (`files` in evidence) {
            if (evidence.files.length > 3) {
              delete evidence.files;
              evidence.value = '';
              errEvidence.innerHTML = 'Max files of 3 exceeded';
              return;
            }
            if (evidence.files.length <= 0) {
              errEvidence.innerHTML = 'Evidence is required';
              return;
            } else {
              for (let i = 0; i < evidence.files.length; i++) {
                if (!evidence.files[i].name.match(/\.jpg$/) && !evidence.files[i].name.match(/\.JPG$/) && !evidence.files[i].name.match(/\.jpeg$/) && !evidence.files[i].name.match(/\.JPEG$/) && !evidence.files[i].name.match(/\.png$/) && !evidence.files[i].name.match(/\.PNG$/) && !evidence.files[i].name.match(/\.mp4$/) && !evidence.files[i].name.match(/\.MP4$/)) {
                  delete evidence.files;
                  evidence.value = '';
                  errEvidence.innerHTML = ".jpg, .png or mp4 extension required";
                  return;
                }
                if (evidence.files[i].size > (15 * 1024 * 1024)) {
                  delete evidence.files;
                  evidence.value = '';
                  errEvidence.innerHTML = 'Max file size of 15MB exceeded';
                  return;
                }
              }
            }
          } else {
            errEvidence.innerHTML = 'Evidence is required';
            return;
          }

          const btnPetition = document.getElementById('btnPetition');
          btnPetition.innerHTML = '<i class="spinner spin"></i> Submitting...';

          const postPetition = (files) => {
            const payload = {
              office: office.value.trim(),
              text: text.value.trim(),
              evidence: files
            };

            const url = `${base_url}petitions`;
            console.log(payload);
            const fetchData = { 
              method: 'POST', 
              body: JSON.stringify(payload),
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-access-token": sessionStorage.getItem('token')
              }
            };

            fetch(url, fetchData)
            .then((resp) => resp.json(), (error) => {
              console.log(resp);
              console.error(error);
              btnPetition.innerHTML = 'Submit';
              alert('Petition cannot be submitted at this time! Try again');
            })
            .then((res) => {
              if (res.status === 201) {
                console.log(res);
                office.selectedIndex = 0;
                text.value = '';
                delete evidence.files;
                evidence.value = '';
                btnPetition.innerHTML ='Submit';
                alert('Successful!');
              } else {
                console.log(res);
                btnPetition.innerHTML = 'Submit';
                alert(res.error);
              }
              //return data;
            }, (error) => {
              console.error(error);
              btnPetition.innerHTML = 'Submit';
              alert('Petition cannot be submitted at this time! Try again');
            })
            .catch ((error) => {
              console.error(error);
              btnPetition.innerHTML = 'Submit';
              alert('Unable to submit petition, try again');
            });
          };

          const urls = [];
          for (let i = 0; i < evidence.files.length; i++) {
            const uploadResult = uploadImage(evidence.files[i]);
            uploadResult.then((result) => {
              urls.push(result.secure_url);
              if (urls.length === evidence.files.length) {
                postPetition(urls);
              }
            }, (error) => {
              console.error(`Error: ${error}`);
              btnPetition.innerHTML = 'Submit';
              alert(`Oops, Network error! Check your network and try again`);
              return;
            }).catch(error => {
              console.error(`Error: ${error}`);
              btnPetition.innerHTML = 'Submit';
              alert(`Oops, Network error! Check your network and try again`);
              return;
            });
          }
        }
      }

      // Modals....................................................
      const closeCandidate = document.getElementById('closeCandidate');
      if (closeCandidate) {
        closeCandidate.onclick = (e) => {
          const modal = document.getElementById('modalCandidate');
          modal.style.display = 'none';
        }
      
      }

      const closeContest = document.getElementById('closeContest');
      if (closeContest) {
        closeContest.onclick = (e) => {
          const modal = document.getElementById('modalContest');
          modal.style.display = 'none';
        }
      
      }

      const closePetition = document.getElementById('closePetition');
      if (closePetition) {
        closePetition.onclick = (e) => {
          const modal = document.getElementById('modalPetition');
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

      const closeOpenModal = document.getElementById('closeOpenModal');
      if (closeOpenModal) {
        closeOpenModal.onclick = (e) => {
          const modal = document.getElementById('modalOpenModal');
          modal.style.display = 'none';
        }
      
      }

      window.onclick = (e) => {

        const modalContest = document.getElementById('modalContest');
        const modalAddParty = document.getElementById('modalAddParty');
        const modalAddOffice = document.getElementById('modalAddOffice');
        const modalEditParty = document.getElementById('modalEditParty');
        const modalCandidate = document.getElementById('modalCandidate');
        const modalPetition = document.getElementById('modalPetition');
        const modalOpenModal = document.getElementById('modalOpenModal');

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
        else if (e.target === modalCandidate) {
          modalCandidate.style.display = "none";
        }
        else if (e.target === modalPetition) {
          modalPetition.style.display = "none";
        }
        else if (e.target === modalOpenModal) {
          modalOpenModal.style.display = "none";
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

function editParty(id, name) {
  const partyName = document.getElementById('editPartyName');
  const partyId = document.getElementById('partyID');
  partyName.value = name;
  partyId.value = id;

  const modal = document.getElementById('modalEditParty');
  if (modal) {
    modal.style.display = 'block';
  }
}

function removeParty(id) {
  if (confirm("Are you sure, you want to delete the party?\nClick 'OK' to continue")) {
    const btnRemove = document.getElementById(`btnRemove${id}`);
    btnRemove.innerHTML = 'Removing';

    const url = `${base_url}parties/${id.trim()}`;
    const fetchData = { 
      method: 'DELETE', 
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": sessionStorage.getItem('token')
      }
    };

    fetch(url, fetchData)
    .then((resp) => resp.json(), (error) => {
      console.log(resp);
      console.error(error);
      btnRemove.innerHTML = 'Remove';
      alert('Party cannot be removed at this time! Try again');
    })
    .then((res) => {
      //const res = JSON.parse(data);
      if (res.status === 200) {
        console.log(res);
        const partiesList = fetchParties();
        partiesList.then((res) => {
          const list = res.data;
          renderPartyList(list);
        })
        .catch(error => { console.error(`Error: ${error}`) });
      } else if (res.status === 500 || res.status === 508) {
        btnRemove.innerHTML = 'Remove';
        alert('Party is in use and cannot be deleted at this time');
      } else {
        console.log(res);
        btnRemove.innerHTML = 'Remove';
        alert(res.error);
      }
      //return data;
    }, (error) => {
      console.error(error);
      btnRemove.innerHTML = 'Remove';
      alert('Party cannot be removed at this time! Try again');
    })
    .catch ((error) => {
      console.error(error);
      btnRemove.innerHTML = 'Remove';
      alert('Unable to remove party, try again');
    });
  }
}

function vote(id) {
  if (confirm("Confirm you want to vote for the candidate!\nClick 'OK' to continue")) {
    const btnVote = document.getElementById(`btnVote${id}`);
    btnVote.innerHTML = 'Voting';

    const payload = {
      office: document.getElementById('voteOffice').value.trim(),
      candidate: id.trim(),
    }

    const url = `${base_url}votes`;
    const fetchData = { 
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": sessionStorage.getItem('token')
      }
    };

    fetch(url, fetchData)
    .then((resp) => resp.json(), (error) => {
      console.log(resp);
      console.error(error);
      btnVote.innerHTML = 'Vote';
      alert('Unable to vote at this time! Try again');
    })
    .then((res) => {
      //const res = JSON.parse(data);
      if (res.status === 201) {
        console.log(res);
        btnVote.innerHTML = 'Vote';
        alert('Successful');
        const votedList = fetchVotedCandidates();
        votedList.then((res) => {
          const list = res.data;
          renderVotedCandidatesList(list);
        })
        .catch(error => { console.error(`Error: ${error}`) });
      } else if (res.status === 500 || res.status === 508) {
        btnVote.innerHTML = 'Vote';
        alert('Unable to vote at this time, try again');
      } else {
        console.log(res);
        btnVote.innerHTML = 'Vote';
        alert(res.error);
      }
      //return data;
    }, (error) => {
      console.error(error);
      btnVote.innerHTML = 'Vote';
      alert('Unable to vote at this time! Try again');
    })
    .catch ((error) => {
      console.error(error);
      btnVote.innerHTML = 'Vote';
      alert('Unable to vote, try again');
    });
  }
}

function openModal(type, content) {
  const title = document.getElementById(`titleOpenModal`);
  const body = document.getElementById(`bodyOpenModal`);
  const modal = document.getElementById(`modalOpenModal`);
  if (type.toLowerCase() === `text`) {
    title.innerHTML = `Petition Text`;
    body.innerHTML = `${content}`;
    modal.style.display = `block`;
    return;
  } else {
    title.innerHTML = `Petition Evidence(s)`;
    body.innerHTML = ``;
    const files = content.split(`$$`);
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].match(/\.jpg$/) || files[i].match(/\.JPG$/) || files[i].match(/\.jpeg$/) || files[i].match(/\.JPEG$/) || files[i].match(/\.png$/) || files[i].match(/\.PNG$/)) {
          const img = document.createElement(`img`);
          img.setAttribute(`class`, `media-clip`);
          img.setAttribute(`src`, `${files[i]}`);
          body.appendChild(img);

        } else {
          const video = document.createElement(`video`);
          video.setAttribute(`class`, `media-clip`);
          video.setAttribute(`src`, `${files[i]}`);
          video.setAttribute(`autoplay`, `autoplay`);
          video.setAttribute(`controls`, `controls`);
          body.appendChild(video);
        }
      }
    }
    modal.style.display = `block`;
    return;
  }
}
