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

});