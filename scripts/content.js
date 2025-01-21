window.onload = () => {
    console.log("Window loaded!");

    // Create the autofill button
    const button = document.createElement("button");
    button.textContent = "autofill";

    // Button click handler
    button.onclick = () => {
        console.log("Button clicked!");
        const allInputs = document.querySelectorAll('input');
        allInputs.forEach(input => {
            console.log(`${input.name || input.id} = ${input.value}`);
        });
    };

    // Apply styles to position the button
    button.style.position = "fixed";
    button.style.top = "10px";
    button.style.left = "10px";
    button.style.zIndex = "1000";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.style.cursor = "pointer";

    button.onclick = () => {

        chrome.storage.local.get('formData', function (result) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }


            var formData = result.formData;

            if (!formData) {
                alert('No form data found');
                return;
            }

            // get a list of all inputs 
            const allInputs = document.querySelectorAll('input');

            // traverse all inputs
            allInputs.forEach(input => {
                // check input type
                switch (input.type) {
                    case 'text':
                        // check input placeholder value
                        const iPlaceholder = input.placeholder.toLowerCase().trim();
                        const ilabel = input.getAttribute('aria-label') ? input.getAttribute('aria-label').toLowerCase().trim() : '';
                        const iAutoId = input.getAttribute('data-automation-id') ? input.getAttribute('data-automation-id').toLowerCase().trim() : '';

                        if (iPlaceholder.includes('first') || iPlaceholder.includes('given') || ilabel.includes('first') || ilabel.includes('given') || iAutoId.includes('first') || iAutoId.includes('given')) {
                            input.value = formData.firstName;
                        }

                        if (iPlaceholder.includes('last') || iPlaceholder.includes('family') || ilabel.includes('last') || ilabel.includes('family') || iAutoId.includes('last') || iAutoId.includes('family')) {
                            input.value = formData.lastName;
                        }

                        if (iPlaceholder.includes('city') || ilabel.includes('city') || iAutoId.includes('city')) {
                            input.value = formData['address-city'];
                        }

                        if (iPlaceholder.includes('post') || iPlaceholder.includes('zip') || iPlaceholder.includes('postal') || iPlaceholder.includes('pin') || iPlaceholder.includes('code') || ilabel.includes('post') || ilabel.includes('zip') || ilabel.includes('postal') || ilabel.includes('pin') || ilabel.includes('code') || iAutoId.includes('post') || iAutoId.includes('zip') || iAutoId.includes('postal') || iAutoId.includes('pin') || iAutoId.includes('code')) {
                            input.value = formData["address-zip"];
                        }

                        if (iPlaceholder.includes('email') || iPlaceholder.includes('email address') || ilabel.includes('email') || ilabel.includes('email address')) {
                            input.value = formData.email;
                        }

                        if (iPlaceholder.includes('address') || ilabel.includes('address') || iAutoId.includes('address')) {
                            // line 1 and line 2
                            if (iPlaceholder.includes('1') || iPlaceholder.includes('one') || ilabel.includes('1') || ilabel.includes('one') || iAutoId.includes('1') || iAutoId.includes('one')) {
                                input.value = formData["address"];
                            }

                            if (iPlaceholder.includes('2') || iPlaceholder.includes('two') || ilabel.includes('2') || ilabel.includes('two') || iAutoId.includes('2') || iAutoId.includes('two')) {
                                input.value = formData["address-line2"];
                            }
                        }

                        if (iPlaceholder.includes('phone') || ilabel.includes('phone') || iAutoId.includes('phone')) {
                            if (iPlaceholder.includes('extension') || ilabel.includes('extension') || iAutoId.includes('extension')) {
                                // do nothing for now.
                            }
                            else {
                                input.value = formData.phone;
                            }
                        }

                        // trigger input event
                        const event = new Event('input', { bubbles: true });
                        input.dispatchEvent(event);

                        break;
                    case 'tel':
                        input.value = formData.phone;
                        break;
                    case 'email':
                        input.value = formData.email;
                        break;
                    case 'select':
                        const iid = input.id.toLowerCase().trim();
                        const aPlaceholder = input.getAttribute('aria-placeholder') ? input.getAttribute('aria-placeholder').toLowerCase().trim() : '';
                        const iaid = input.getAttribute('data-automation-id') ? input.getAttribute('data-automation-id').toLowerCase().trim() : '';

                        // if(iid.includes('state') || aPlaceholder.includes('state') || iaid.includes('state') || iid.includes('region') || aPlaceholder.includes('region') || iaid.includes('region')) {
                        //     input.value = formData["address-state"];
                        // }

                        // select phone options
                        if (iid.includes('phone') || aPlaceholder.includes('phone') || iaid.includes('phone') || iid.includes('device') || aPlaceholder.includes('device') || iaid.includes('device')) {
                           
                            Array.from(input.options).forEach(option => {
                                if (option.value === 'mobile') {
                                    input.value = option.value;
                                }
                            });
                        }
                        break;
                    default:
                        break;
                }
            });
        });
    };

    // Append the button to the body
    document.body.appendChild(button);
};
