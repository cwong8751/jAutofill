// add more button
document.getElementById('addMoreWorkButton').addEventListener('click', function() {

    // renders the add more work form
    const workFormContainer = document.getElementById('workExperienceContainer');
    const workSectionContainer = document.querySelector('.workSectionContainer');
    const newContainer = workFormContainer.cloneNode(true);

    // clear inputs
    const inputs = newContainer.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else if(input.tagName === 'SELECT'){
            input.selectedIndex = 0;
        }
         else {
            input.value = '';
        }
    });

    // clone
    newContainer.querySelector('.removeWorkButton').style.display = 'inline';
    workSectionContainer.appendChild(newContainer);
});

document.querySelector('.workSectionContainer').addEventListener('click', function(event){
    if(event.target.classList.contains('removeWorkButton')){
        event.target.parentNode.remove();
    }
})


// save button
document.getElementById('saveButton').addEventListener('click', function() {
    // Object to store all the data
    const formData = {};

    // Helper function to get values from inputs, selects, and textareas
    function getFormValues(selector, key) {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 1) { // Handle single elements
            const element = elements[0];
            if (element.type === 'checkbox') {
                formData[key] = element.checked;
            } else {
                formData[key] = element.value;
            }
        } else if (elements.length > 1) { // Handle multiple elements with the same name (e.g., address lines)
          formData[key] = [];
          elements.forEach(element => {
            formData[key].push(element.value);
          });
        }
    }

    // Personal Info
    getFormValues('#firstName', 'firstName');
    getFormValues('#lastName', 'lastName');
    getFormValues('#preferredName', 'preferredName');
    getFormValues('#gender', 'gender');
    getFormValues('#dob', 'dob');
    getFormValues('#address', 'address');
    getFormValues('#address-line2', 'address-line2');
    getFormValues('#address-city', 'address-city');
    getFormValues('#address-zip', 'address-zip');
    getFormValues('#address-country', 'address-country');
    getFormValues('#phone', 'phone');
    getFormValues('#email', 'email');

    // Account Info
    getFormValues('#username', 'username');
    getFormValues('#password', 'password');

    // Education
    getFormValues('#schoolName', 'schoolName');
    getFormValues('#levelOfEducation', 'levelOfEducation');
    getFormValues('#major', 'major');
    getFormValues('#minor', 'minor');
    getFormValues('#fromMonth', 'educationFromMonth'); // Renamed keys for clarity
    getFormValues('#fromYear', 'educationFromYear');
    getFormValues('#toMonth', 'educationToMonth');
    getFormValues('#toYear', 'educationToYear');

    // Work Experience (Handles multiple entries)
    formData.workExperiences = [];
    document.querySelectorAll('.workSectionContainer > div').forEach(workSection => {
        const workData = {};
        workData.jobTitle = workSection.querySelector('#jobTitle').value;
        workData.company = workSection.querySelector('#company').value;
        workData.location = workSection.querySelector('#location').value;
        workData.fromMonth = workSection.querySelector('#fromMonth').value;
        workData.fromYear = workSection.querySelector('#fromYear').value;
        workData.toMonth = workSection.querySelector('#toMonth').value;
        workData.toYear = workSection.querySelector('#toYear').value;
        workData.currentJob = workSection.querySelector('#currentJob').checked;
        workData.description = workSection.querySelector('#description').value;
        formData.workExperiences.push(workData);
    });

    // Citizenship and Visa
    getFormValues('input[name="eligible"]:checked', 'eligible');
    getFormValues('input[name="sponsor"]:checked', 'sponsor');
    getFormValues('#visa-description', 'visaDescription');

    // EEOC Questions
    getFormValues('#gender', 'eeocGender');
    getFormValues('#race', 'eeocRace');
    getFormValues('#veteran', 'eeocVeteran');
    getFormValues('#disability', 'eeocDisability');

    // Now you have all the data in the formData object
    console.log(formData);

    // save it to chrome extension sandbox storage
    chrome.storage.local.set({ 'formData': formData }, function() {
        console.log('Data saved:', formData);
    });
});


// onchange for the citizen choice
// if is us citizen, then hide visa question section
// else show the visa question section 
document.querySelectorAll('input[name="citizen"]').forEach(radio => {
  radio.addEventListener('change', function() {
    if (this.checked) { // Check if the *current* radio button is checked
      if (this.value === "yes") {
        document.getElementById('visaWorkQuestionsContainer').style.display = 'none';
      } else if (this.value === "no") {
        document.getElementById('visaWorkQuestionsContainer').style.display = 'block';
      }
    }
  });
});