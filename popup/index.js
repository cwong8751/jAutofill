// add more button
document.getElementById('addMoreWorkButton').addEventListener('click', function () {
    // Target the container where new sections will be added
    const workSectionContainer = document.querySelector('.workSectionContainer');

    // Create the new work section div
    const newWorkSection = document.createElement('div');
    newWorkSection.classList.add('workSection'); // Optional: add a class for styling

    // Job Title
    const jobTitleLabel = document.createElement('label');
    jobTitleLabel.setAttribute('for', 'jobTitle');
    jobTitleLabel.textContent = 'Job Title:';
    
    const jobTitleInput = document.createElement('input');
    jobTitleInput.type = 'text';
    jobTitleInput.name = 'jobTitle';
    jobTitleInput.id = 'jobTitle';

    // Company/Organization
    const companyLabel = document.createElement('label');
    companyLabel.setAttribute('for', 'company');
    companyLabel.textContent = 'Company/Organization:';
    const companyInput = document.createElement('input');
    companyInput.type = 'text';
    companyInput.name = 'company';
    companyInput.id = 'company';

    // Location
    const locationLabel = document.createElement('label');
    locationLabel.setAttribute('for', 'location');
    locationLabel.textContent = 'Location:';
    const locationInput = document.createElement('input');
    locationInput.type = 'text';
    locationInput.name = 'location';
    locationInput.id = 'location';

    // From Date (Month and Year)
    const fromLabel = document.createElement('label');
    fromLabel.textContent = 'From:';
    const fromMonthSelect = document.createElement('select');
    fromMonthSelect.name = 'fromMonth';
    fromMonthSelect.id = 'fromMonth';
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = String(index + 1).padStart(2, '0');
        option.textContent = month;
        fromMonthSelect.appendChild(option);
    });
    const fromYearInput = document.createElement('input');
    fromYearInput.type = 'number';
    fromYearInput.name = 'fromYear';
    fromYearInput.id = 'fromYear';
    fromYearInput.min = 1900;
    fromYearInput.max = 2100;
    fromYearInput.value = '2024';

    // To Date (Month and Year)
    const toLabel = document.createElement('label');
    toLabel.textContent = 'To:';
    const toMonthSelect = document.createElement('select');
    toMonthSelect.name = 'toMonth';
    toMonthSelect.id = 'toMonth';
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = String(index + 1).padStart(2, '0');
        option.textContent = month;
        toMonthSelect.appendChild(option);
    });
    const toYearInput = document.createElement('input');
    toYearInput.type = 'number';
    toYearInput.name = 'toYear';
    toYearInput.id = 'toYear';
    toYearInput.min = 1900;
    toYearInput.max = 2100;
    toYearInput.value = '2024';

    // Current Job Checkbox
    const currentJobInput = document.createElement('input');
    currentJobInput.type = 'checkbox';
    currentJobInput.name = 'currentJob';
    currentJobInput.id = 'currentJob';
    const currentJobLabel = document.createElement('label');
    currentJobLabel.setAttribute('for', 'currentJob');
    currentJobLabel.textContent = 'I currently work here';

    // Description
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Description:';
    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.name = 'description';
    descriptionTextarea.id = 'description';
    descriptionTextarea.rows = 4;
    descriptionTextarea.cols = 50;

    // Append all elements to the new work section
    newWorkSection.appendChild(jobTitleLabel);
    newWorkSection.appendChild(jobTitleInput);
    newWorkSection.appendChild(document.createElement('br'));

    newWorkSection.appendChild(companyLabel);
    newWorkSection.appendChild(companyInput);
    newWorkSection.appendChild(document.createElement('br'));

    newWorkSection.appendChild(locationLabel);
    newWorkSection.appendChild(locationInput);
    newWorkSection.appendChild(document.createElement('br'));

    newWorkSection.appendChild(fromLabel);
    newWorkSection.appendChild(fromMonthSelect);
    newWorkSection.appendChild(fromYearInput);
    newWorkSection.appendChild(document.createElement('br'));

    newWorkSection.appendChild(toLabel);
    newWorkSection.appendChild(toMonthSelect);
    newWorkSection.appendChild(toYearInput);
    newWorkSection.appendChild(document.createElement('br'));

    newWorkSection.appendChild(currentJobInput);
    newWorkSection.appendChild(currentJobLabel);
    newWorkSection.appendChild(document.createElement('br'));

    newWorkSection.appendChild(descriptionLabel);
    newWorkSection.appendChild(descriptionTextarea);
    newWorkSection.appendChild(document.createElement('br'));

    // Add a remove button for the new work section
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Work Section';
    removeButton.type = 'button';
    removeButton.classList.add('removeWorkButton');
    removeButton.addEventListener('click', function () {
        newWorkSection.remove();
    });
    newWorkSection.appendChild(removeButton);

    // Append the new work section to the work section container
    workSectionContainer.appendChild(newWorkSection);
});


document.querySelector('.workSectionContainer').addEventListener('click', function (event) {
    if (event.target.classList.contains('removeWorkButton')) {
        event.target.parentNode.remove();
    }
})


// save button
document.getElementById('saveButton').addEventListener('click', function () {
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
                formData[key] = element.value.trim();
            }
        } else if (elements.length > 1) { // Handle multiple elements with the same name (e.g., address lines)
            formData[key] = [];
            elements.forEach(element => {
                formData[key].push(element.value.trim());
            });
        }
    }

    // Function to check if any required field is empty
    function isFieldEmpty(value) {
        return value === '' || value === null || value === undefined;
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
    getFormValues('#fromMonthEdu', 'educationFromMonth');
    getFormValues('#fromYearEdu', 'educationFromYear');
    getFormValues('#toMonthEdu', 'educationToMonth');
    getFormValues('#toYearEdu', 'educationToYear');

    // Work Experience (Handles multiple entries)
    formData.workExperiences = [];
    document.querySelectorAll('.workSectionContainer > div').forEach(workSection => {
        const workData = {};
        workData.jobTitle = workSection.querySelector('#jobTitle').value.trim();
        workData.company = workSection.querySelector('#company').value.trim();
        workData.location = workSection.querySelector('#location').value.trim();
        workData.fromMonth = workSection.querySelector('#fromMonth').value.trim();
        workData.fromYear = workSection.querySelector('#fromYear').value.trim();
        workData.toMonth = workSection.querySelector('#toMonth').value.trim();
        workData.toYear = workSection.querySelector('#toYear').value.trim();
        workData.currentJob = workSection.querySelector('#currentJob').checked;
        workData.description = workSection.querySelector('#description').value.trim();

        // Check if any required field in work experience is empty
        if (isFieldEmpty(workData.jobTitle) || isFieldEmpty(workData.company) || isFieldEmpty(workData.location) || isFieldEmpty(workData.fromMonth) || isFieldEmpty(workData.fromYear)) {
            alert('Please fill in all fields for your work experience.');
            return;
        }

        formData.workExperiences.push(workData);
    });

    // Citizenship and Visa
    getFormValues('input[name="citizen"]:checked', 'citizen');
    getFormValues('input[name="eligible"]:checked', 'eligible');
    getFormValues('input[name="sponsor"]:checked', 'sponsor');
    getFormValues('#visa-description', 'visaDescription');

    // EEOC Questions
    getFormValues('#eeocgender', 'eeocGender');
    getFormValues('#eeocrace', 'eeocRace');
    getFormValues('#eeocveteran', 'eeocVeteran');
    getFormValues('#eeocdisability', 'eeocDisability');

    // Validation: Check if any required field is empty
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            if (isFieldEmpty(formData[key]) && key !== 'workExperiences') {
                alert(`Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                return; // Exit the function if validation fails
            }
        }
    }

    // If validation passed, save the data
    alert(JSON.stringify(formData, null, 2));

    // Save to Chrome extension sandbox storage
    chrome.storage.local.set({ 'formData': formData }, function (result) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            alert('An error occurred while saving the data. Please try again.');
        } else {
            console.log('Data saved:', formData);
            alert('Your data has been saved successfully!');
        }
    });
});



// onchange for the citizen choice
// if is us citizen, then hide visa question section
// else show the visa question section 
document.querySelectorAll('input[name="citizen"]').forEach(radio => {
    radio.addEventListener('change', function () {
        if (this.checked) { // Check if the *current* radio button is checked
            if (this.value === "yes") {
                document.getElementById('visaWorkQuestionsContainer').style.display = 'none';
            } else if (this.value === "no") {
                document.getElementById('visaWorkQuestionsContainer').style.display = 'block';
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('../assets/countries.json') // Or an API endpoint
        .then(response => response.json())
        .then(countries => {
            const select = document.getElementById('address-country');
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.code; // Use country codes (e.g., US, CA)
                option.text = country.name;
                select.appendChild(option);
            });
        });
});

document.getElementById('debugButton').addEventListener('click', function () {
    function getRandomValue(type) {
        const randomText = Math.random().toString(36).substring(2, 15);
        const randomNumber = Math.floor(Math.random() * 100);
        const randomDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0];
        const randomBoolean = Math.random() < 0.5;

        switch (type) {
            case 'text':
            case 'textarea':
                return randomText;
            case 'number':
                return randomNumber;
            case 'date':
                return randomDate;
            case 'checkbox':
            case 'radio':
                return randomBoolean;
            case 'select-one':
                return 1; // Assuming the first option is valid
            default:
                return randomText;
        }
    }

    document.querySelectorAll('input, select, textarea').forEach(element => {
        if (element.type === 'checkbox' || element.type === 'radio') {
            element.checked = getRandomValue(element.type);
        } else if (element.tagName === 'SELECT') {
            element.selectedIndex = getRandomValue('select-one');
        } else {
            element.value = getRandomValue(element.type);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get the stored form data from chrome's storage
    chrome.storage.local.get('formData', function (result) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
        }

        const formData = result.formData;

        if (!formData) {
            alert('No form data found');
            return;
        }

        // Populate the personal info fields
        if (formData.firstName) document.getElementById('firstName').value = formData.firstName;
        if (formData.lastName) document.getElementById('lastName').value = formData.lastName;
        if (formData.preferredName) document.getElementById('preferredName').value = formData.preferredName;
        if (formData.gender) document.getElementById('gender').value = formData.gender;
        if (formData.dob) document.getElementById('dob').value = formData.dob;
        if (formData.address) document.getElementById('address').value = formData.address;
        if (formData['address-line2']) document.getElementById('address-line2').value = formData['address-line2'];
        if (formData['address-city']) document.getElementById('address-city').value = formData['address-city'];
        if (formData['address-zip']) document.getElementById('address-zip').value = formData['address-zip'];
        if (formData['address-country']) document.getElementById('address-country').value = formData['address-country'];
        if (formData.phone) document.getElementById('phone').value = formData.phone;
        if (formData.email) document.getElementById('email').value = formData.email;

        if (formData.username) document.getElementById('username').value = formData.username;
        if (formData.password) document.getElementById('password').value = formData.password;

        if (formData.schoolName) document.getElementById('schoolName').value = formData.schoolName;
        if (formData.levelOfEducation) document.getElementById('levelOfEducation').value = formData.levelOfEducation;
        if (formData.major) document.getElementById('major').value = formData.major;
        if (formData.minor) document.getElementById('minor').value = formData.minor;
        if (formData.educationFromMonth) document.getElementById('fromMonthEdu').value = formData.educationFromMonth;
        if (formData.educationFromYear) document.getElementById('fromYearEdu').value = formData.educationFromYear;
        if (formData.educationToMonth) document.getElementById('toMonthEdu').value = formData.educationToMonth;
        if (formData.educationToYear) document.getElementById('toYearEdu').value = formData.educationToYear;

        // Populate the work experience fields
        if (formData.workExperiences) {
            formData.workExperiences.forEach((work, index) => {
                const workSection = document.querySelector('.workSectionContainer');
                const workExperienceDiv = document.createElement('div');

                workExperienceDiv.innerHTML = `
                    <label for="jobTitle">Job Title:</label><br>
                    <input type="text" id="jobTitle" name="jobTitle" value="${work.jobTitle}"><br><br>

                    <label for="company">Company/Organization:</label><br>
                    <input type="text" id="company" name="company" value="${work.company}"><br><br>

                    <label for="location">Location:</label><br>
                    <input type="text" id="location" name="location" value="${work.location}"><br><br>

                    <label>From:</label><br>
                    <select id="fromMonth" name="fromMonth">
                        <option value="01" ${work.fromMonth === '01' ? 'selected' : ''}>January</option>
                        <option value="02" ${work.fromMonth === '02' ? 'selected' : ''}>February</option>
                        <option value="03" ${work.fromMonth === '03' ? 'selected' : ''}>March</option>
                        <option value="04" ${work.fromMonth === '04' ? 'selected' : ''}>April</option>
                        <option value="05" ${work.fromMonth === '05' ? 'selected' : ''}>May</option>
                        <option value="06" ${work.fromMonth === '06' ? 'selected' : ''}>June</option>
                        <option value="07" ${work.fromMonth === '07' ? 'selected' : ''}>July</option>
                        <option value="08" ${work.fromMonth === '08' ? 'selected' : ''}>August</option>
                        <option value="09" ${work.fromMonth === '09' ? 'selected' : ''}>September</option>
                        <option value="10" ${work.fromMonth === '10' ? 'selected' : ''}>October</option>
                        <option value="11" ${work.fromMonth === '11' ? 'selected' : ''}>November</option>
                        <option value="12" ${work.fromMonth === '12' ? 'selected' : ''}>December</option>
                    </select>
                    <input type="number" id="fromYear" name="fromYear" value="${work.fromYear}" min="1900" max="2100"><br><br>

                    <label>To:</label><br>
                    <select id="toMonth" name="toMonth">
                        <option value="01" ${work.toMonth === '01' ? 'selected' : ''}>January</option>
                        <option value="02" ${work.toMonth === '02' ? 'selected' : ''}>February</option>
                        <option value="03" ${work.toMonth === '03' ? 'selected' : ''}>March</option>
                        <option value="04" ${work.toMonth === '04' ? 'selected' : ''}>April</option>
                        <option value="05" ${work.toMonth === '05' ? 'selected' : ''}>May</option>
                        <option value="06" ${work.toMonth === '06' ? 'selected' : ''}>June</option>
                        <option value="07" ${work.toMonth === '07' ? 'selected' : ''}>July</option>
                        <option value="08" ${work.toMonth === '08' ? 'selected' : ''}>August</option>
                        <option value="09" ${work.toMonth === '09' ? 'selected' : ''}>September</option>
                        <option value="10" ${work.toMonth === '10' ? 'selected' : ''}>October</option>
                        <option value="11" ${work.toMonth === '11' ? 'selected' : ''}>November</option>
                        <option value="12" ${work.toMonth === '12' ? 'selected' : ''}>December</option>
                        <option value="present" ${work.toMonth === 'present' ? 'selected' : ''}>Present</option>
                    </select>
                    <input type="number" id="toYear" name="toYear" value="${work.toYear}" min="1900" max="2100"><br><br>

                    <input type="checkbox" id="currentJob" name="currentJob" ${work.currentJob ? 'checked' : ''}>
                    <label for="currentJob">I currently work here</label><br><br>

                    <label for="description">Description:</label><br>
                    <textarea id="description" name="description" rows="4" cols="50">${work.description}</textarea><br><br>
                    <button class="removeWorkButton" style="display:inline;">Remove</button><br><br>
                `;

                workSection.appendChild(workExperienceDiv);
            });
        }

        // Citizenship and Visa info
        if (formData.citizen) document.querySelector(`input[name="citizen"][value="${formData.citizen}"]`).checked = true;
        if (formData.eligible) document.querySelector(`input[name="eligible"][value="${formData.eligible}"]`).checked = true;
        if (formData.sponsor) document.querySelector(`input[name="sponsor"][value="${formData.sponsor}"]`).checked = true;
        if (formData.visaDescription) document.getElementById('visa-description').value = formData.visaDescription;

        // EEOC Questions
        if (formData.eeocGender) document.getElementById('eeocgender').value = formData.eeocGender;
        if (formData.eeocRace) document.getElementById('eeocrace').value = formData.eeocRace;
        if (formData.eeocVeteran) document.getElementById('eeocveteran').value = formData.eeocVeteran;
        if (formData.eeocDisability) document.getElementById('eeocdisability').value = formData.eeocDisability;
    });
});


document.getElementById('showStorage').addEventListener('click', function () {
    chrome.storage.local.get('formData', function (result) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
        }

        alert(JSON.stringify(result.formData, null, 2));

        navigator.clipboard.writeText(JSON.stringify(result.formData, null, 2))
            .then(() => {
                alert('Data copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy data: ', err);
                alert('Failed to copy data to clipboard.');
            });
    });
});