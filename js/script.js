const otherJobRole = document.querySelector('option[value="other"]')
const otherTitleInput = document.querySelector('#other-title')
let activitiesLegend = document.querySelector('.activities legend')
let paymentInfoLegend = document.querySelector('#payment').previousElementSibling.previousElementSibling
const creditCardNumberInput = document.querySelector('#cc-num')
const creditCardCVVInput = document.querySelector('#cvv')
const creditCardZipcodeInput = document.querySelector('#zip')
const designMenu = document.querySelector('#design') // design dropdown
const colorDiv = document.querySelector('#shirt-colors')
const colorChoices = document.querySelector('#color')// color choices 
const activities = document.querySelector('.activities')
const payment = document.querySelector('#payment')
const paymentMethods = document.querySelectorAll('#payment option')
const paypalPayment = document.querySelector('#paypal')
const bitcoinPayment = document.querySelector('#bitcoin')
const creditcardPayment = document.querySelector('#credit-card')
let totalActivityCost = 0
let activitiesChosen = []

// Set initial focus to the Name field on page load
document.querySelector('#name').focus() 

// Name Validation Error Message
const nameErrorP = document.createElement('p')
const nameErrorMessage = `<span style='color: red;'>Please Enter a Name</span>`
nameErrorP.innerHTML = nameErrorMessage
nameErrorP.className = 'nameValidationError'
nameErrorP.style.display = 'none'
document.querySelector('form label[for="name"]').appendChild(nameErrorP)

// Email Validation Error Message
const emailErrorP = document.createElement('p')
const emailErrorMessage = `<span style='color: red;'>Please Enter a valid Email Address</span>`
emailErrorP.innerHTML = emailErrorMessage
emailErrorP.className = 'emailValidationError'
emailErrorP.style.display = 'none'
document.querySelector('form label[for="mail"]').appendChild(emailErrorP)

// Activities Validation Error Message
const activitiesErrorMessageP = document.createElement('p')
activitiesErrorMessageP.innerHTML = `<span style='color: red;'>Please choose at least one Activity!</span>`
activitiesErrorMessageP.className = 'activitiesValidationError'
activitiesErrorMessageP.style.display = 'none'
activitiesLegend.appendChild(activitiesErrorMessageP)

// Credit Card Validation Error Message
const paymentInfoErrorMessageP = document.createElement('p')
paymentInfoErrorMessageP.innerHTML = `<span style='color: red;'>Please confirm that your credit card number, zip code, and/or CVV is correct.</span>`
paymentInfoErrorMessageP.className = 'creditcardValidationError'
paymentInfoErrorMessageP.style.display = 'none'
paymentInfoLegend.appendChild(paymentInfoErrorMessageP)

const creditCardNumberInputP = document.createElement('p')
creditCardNumberInputP.className = 'creditCardNumberInputP'
creditCardNumberInputP.innerHTML = `<span style='color: red; font-size:11pt;'>Please enter a valid credit card number (10-14 digits) </span>`
creditCardNumberInput.previousElementSibling.appendChild(creditCardNumberInputP)

const cvvNumberInputP = document.createElement('p')
cvvNumberInputP.className = 'cvvNumberInputP'
cvvNumberInputP.innerHTML = `<span style='color: red; font-size:11pt;'>Please enter a valid 3 digit CVV </span>`
creditCardCVVInput.previousElementSibling.appendChild(cvvNumberInputP)

const zipCodeInputP = document.createElement('p')
zipCodeInputP.className = 'zipCodeInputP'
zipCodeInputP.innerHTML = `<span style='color: red; font-size:11pt;'>Please enter a valid 5 digit zipcode </span>`
creditCardZipcodeInput.previousElementSibling.appendChild(zipCodeInputP)

// Initially hide the 'Other' job role
otherTitleInput.hidden=true

// Only display the "other-title" input if 'Other' is selected in "Job Role"
document.querySelector('#title').addEventListener('change', (e) => {
    let jobRole = e.target.value
    if(jobRole === 'other') {
        otherTitleInput.hidden=false
    } 
    else{
        otherTitleInput.hidden=true
    }
})

// Function that controls what is being shown in the T-shirt info section.
const tShirtInfo = () => {
    
    const option = document.createElement('option')    
    // Create default 'Please choose a T-shirt theme' option in color dropdown if a T-shirt theme isn't chosen.
    option.defaultSelected = true
    option.text = 'Please choose a T-shirt theme'
    colorChoices.appendChild(option)
    colorChoices.disabled = true
    colorDiv.style.display = 'none'

    // Listens for any changes to the Design dropdown menu
    designMenu.addEventListener('change', (e) => {
       let selected = (e.target.value)
       if(selected == 'Select Theme') {
           colorDiv.style.display = 'none'
       }
       
       if(selected == 'js puns') {
        colorDiv.style.display = 'block'
        colorChoices.disabled = false
           for(let i = 0; i < colorChoices.length; i++) {
               if(colorChoices[i].text.includes('I')) {
                   colorChoices[i].hidden = true
               }
               else {
                   colorChoices[i].hidden = false
                   colorChoices[3].removeAttribute('selected')
                   colorChoices[0].defaultSelected = true
               }
           }
       }

       if(selected == 'heart js') {
        colorDiv.style.display = 'block'
        colorChoices.disabled = false
        for(let i = 0; i < colorChoices.length; i++) {
            if(colorChoices[i].text.includes('Puns')) {
                colorChoices[i].hidden = true
            }
            else {
                colorChoices[i].hidden = false
                colorChoices[0].removeAttribute('selected')
                colorChoices[3].defaultSelected = true
            }
        }
    }
    })
}  
tShirtInfo()

/* 
    This function will keep track of all activities.  If there are other workshops that happen at the same time as the workshop you chose, those workshops will not be available to choose.  It will also keep track of the cost of all of the activities you want to participate in.
*/
const registerActivities = () => {
    const p = document.createElement('p')
    p.innerHTML = `<h3>Total activity cost: $0</h3>`
    activities.appendChild(p)
    

    activities.addEventListener('change', (e) => {
        let click = e.target
        let cost = parseInt(click.getAttribute('data-cost'))
        let dayTime = click.getAttribute('data-day-and-time')
        let activitiesLabel = activities.getElementsByTagName('label')
        const activitiesInputs = activities.getElementsByTagName('input')
        
        // Keep track of total activity costs
        if(click.checked) {
            activitiesChosen.push(click.name)
            totalActivityCost += cost
            p.innerHTML = `<h3>Total activity cost: $${totalActivityCost}</h3>`
        }else {
            totalActivityCost -= cost
            p.innerHTML = `<h3>Total activity cost: $${totalActivityCost}</h3>`
        }
        
        // Keep track of what activities conflict with chosen activity
        for(let i = 0; i < activitiesInputs.length; i++) {

            if(dayTime === activitiesInputs[i].getAttribute('data-day-and-time') && click !== activitiesInputs[i]) {
                if(click.checked) {
                    activitiesInputs[i].disabled = true
                    // Places a line through activities that overlap  
                    activitiesLabel[i].style.textDecoration = 'line-through'
                    activitiesLabel[i].style.textDecorationColor = 'red'
                } else{
                    activitiesInputs[i].disabled = false
                    // Removes line through activities if they were overlaping, but not anymore
                    activitiesLabel[i].style.textDecoration = 'none'
                }
            }
        }
    })
}
registerActivities()

// This function will handle the UI for the payment info.  It will show you only the information that is needed for that specific payment type.
const paymentInfo = () => {
    paymentMethods[0].hidden = true
    paymentMethods[1].defaultSelected = true
    paypalPayment.hidden = true
    bitcoinPayment.hidden = true
    document.querySelector('.creditCardNumberInputP').style.display = 'none' 
    document.querySelector('.cvvNumberInputP').style.display = 'none' 
    document.querySelector('.creditcardValidationError').style.display = 'none' 
    document.querySelector('.zipCodeInputP').style.display = 'none'

    payment.addEventListener('change', (e) => {
        let method = e.target.value
        creditcardPayment.hidden = false
        paypalPayment.hidden = true
        bitcoinPayment.hidden = true
        if(method === 'paypal') {
            paymentMethods[1].removeAttribute('selected')
            paypalPayment.hidden = false
            creditcardPayment.hidden = true;
            bitcoinPayment.hidden = true
            document.querySelector('.creditcardValidationError').style.display = 'none' 
           
        } else if(method === 'bitcoin') {
            paymentMethods[1].removeAttribute('selected')
            bitcoinPayment.hidden = false
            creditcardPayment.hidden = true
            paypalPayment.hidden = true
            document.querySelector('.creditcardValidationError').style.display = 'none' 
        } else if(method === 'credit card') {
            paymentMethods[1].defaultSelected = true
            paypalPayment.hidden = true
            creditcardPayment.hidden = false;
            bitcoinPayment.hidden = true
        }
    })
}
paymentInfo()

// Validation functions

const isNameValid = (name) => {
    let regex = /^\D* \D*$/i
    return regex.test(name)
}

const isEmailValid = (email) => {
    let regex = /^[^@]+@[^@.]+\.[a-z]+$/i
    return regex.test(email)
}

const isActivitiesValid = () => {    
    const activitiesInputsValidation = document.querySelectorAll('.activities input')
    let numOfActivitiesChosen = 0
    for(let i = 0; i < activitiesInputsValidation.length; i++){
        if(activitiesInputsValidation[i].checked){
            numOfActivitiesChosen++
        }
    }
    if(numOfActivitiesChosen === 0){
        return false
    } else {
        return true
    }
}

const isCreditCardValid = (cardNumber) => {
    let regex = /^\d{4}[ -]?\d{4}[ =]?\d{4}[ -]?\d{4}$/
    return regex.test(cardNumber)
}

const isZipcodeValid = (zipcode) => {
    let regex = /^\d{5}$/
    return regex.test(zipcode)
}

const isCVVValid = (cvv) => {
    let regex = /^\d{3}$/
    return regex.test(cvv)
}

const validateFields = () => {
    let ccNumber = document.querySelector('#cc-num').value
    let zipcode = document.querySelector('#zip').value
    let cvv = document.querySelector('#cvv').value

    // Displays Name Validation Error if needed
    isNameValid(document.querySelector('#name'). value) ? document.querySelector('.nameValidationError').style.display = 'none' : document.querySelector('.nameValidationError').style.display = 'inherit'

    // Displays Email Validation Error if needed
    isEmailValid(document.querySelector('#mail').value) ? document.querySelector('.emailValidationError').style.display = 'none' : document.querySelector('.emailValidationError').style.display = 'inherit'

    // Displays Activities Validation Error if needed
    isActivitiesValid() ? document.querySelector('.activitiesValidationError').style.display = 'none' : document.querySelector('.activitiesValidationError').style.display = 'inherit' 

    // Displays Credit Card Validation Error if needed
    if(document.querySelectorAll('#payment option')[1].selected) {
    isCreditCardValid(ccNumber) && isCVVValid(cvv) && isZipcodeValid(zipcode) ? document.querySelector('.creditcardValidationError').style.display = 'none' : document.querySelector('.creditcardValidationError').style.display = 'inherit'
    }
}

    // Validates Name as the user types
    document.querySelector('#name').addEventListener('input', e => {
        let nameValue = document.querySelector('#name').value
        let nameValid = isNameValid(e.target.value)
        nameValid ? document.querySelector('.nameValidationError').style.display = 'none' : document.querySelector('.nameValidationError').style.display = 'inherit'
        
        nameValue.length === 0 ? document.querySelector('.nameValidationError').style.display = 'none' : null
})

    // Validates Email as the user types
    document.querySelector('#mail').addEventListener('input', e => {
        let emailValue = document.querySelector('#mail').value
        let emailValid = isEmailValid(e.target.value)
        emailValid ? document.querySelector('.emailValidationError').style.display = 'none' : document.querySelector('.emailValidationError').style.display = 'inherit'
        
        emailValue.length === 0 ? document.querySelector('.emailValidationError').style.display = 'none' : null
})

    // Validates Credit Card Number as the user types
    document.querySelector('#cc-num').addEventListener('input', (e) => {
        let ccNumberValue = document.querySelector('#cc-num').value
        let ccNumberInput = e.target.value
        
        isCreditCardValid(ccNumberInput) ? document.querySelector('.creditCardNumberInputP').style.display = 'none' : document.querySelector('.creditCardNumberInputP').style.display = 'block'

        ccNumberValue.length === 0 ? document.querySelector('.creditCardNumberInputP').style.display = 'none' : null
 })

 // Validates the CVV as the user types
 document.querySelector('#cvv').addEventListener('input', (e) => {
     let cvvValue = document.querySelector('#cvv').value
     let cvvInput = e.target.value

      isCVVValid(cvvInput) ? document.querySelector('.cvvNumberInputP').style.display = 'none' : document.querySelector('.cvvNumberInputP').style.display = 'block'

      cvvValue.length === 0 ? document.querySelector('.cvvNumberInputP').style.display = 'none' : null
  })

  // Validates the ZipCode as the user types
document.querySelector('#zip').addEventListener('input', (e) => {
    let zipcodeValue = document.querySelector('#zip').value
    let zipcodeInput = e.target.value

    isZipcodeValid(zipcodeInput) ? document.querySelector('.zipCodeInputP').style.display = 'none' : document.querySelector('.zipCodeInputP').style.display = 'block'

    zipcodeValue.length === 0 ? document.querySelector('.zipCodeInputP').style.display = 'none' : null
})
    

// Submit form - Form will refresh to a default form if submit was successful.  Otherwise, it will show error messages

document.querySelector('form').addEventListener('submit', (e) => {
    const name = document.querySelector('#name').value
    const email = document.querySelector('#mail').value
    const ccNumber = document.querySelector('#cc-num').value
    const zipcode = document.querySelector('#zip').value
    const cvv = document.querySelector('#cvv').value

    // Will run if the payment method was Credit Card
    if(document.querySelectorAll('#payment option')[1].selected) {
        if(isNameValid(name) && isEmailValid(email) && isActivitiesValid() && isCreditCardValid(ccNumber) && isZipcodeValid(zipcode) && isCVVValid(cvv)) {
            validateFields()
        } else {
            validateFields()
            e.preventDefault()
        }
    // Will run for payment methods other than Credit Card
    } else {
        if(isNameValid(name) && isEmailValid(email) && isActivitiesValid())  {
            validateFields()
        } else {
            validateFields()
            e.preventDefault()
        }
    }
})