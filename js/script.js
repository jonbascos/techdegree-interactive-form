const name = document.querySelector('#name')
const otherJobRole = document.querySelector('option[value="other"]')
const jobRoleSelect = document.querySelector('#title')
const otherTitleInput = document.querySelector('#other-title')
// const p = document.createElement('p')
let totalActivityCost = 0
let activitiesChosen = []
let paymentType = 'credit card'

// Set initial focus to the Name field on page load
name.focus() 

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
let activitiesLegend = document.querySelector('.activities legend')
const activitiesErrorMessageP = document.createElement('p')
activitiesErrorMessageP.innerHTML = `<span style='color: red;'>Please choose at least one Activity!</span>`
activitiesErrorMessageP.className = 'activitiesValidationError'
activitiesErrorMessageP.style.display = 'none'
activitiesLegend.appendChild(activitiesErrorMessageP)

// Credit Card Validation Error Message
let paymentInfoLegend = document.querySelector('#payment').previousElementSibling.previousElementSibling
const paymentInfoErrorMessageP = document.createElement('p')
paymentInfoErrorMessageP.innerHTML = `<span style='color: red;'>Please confirm that your credit card number, zip code, and/or CVV is correct.</span>`
paymentInfoErrorMessageP.className = 'creditcardValidationError'
paymentInfoErrorMessageP.style.display = 'none'
paymentInfoLegend.appendChild(paymentInfoErrorMessageP)



// Initially hide the 'Other' job role
otherTitleInput.hidden=true

// Only display the "other-title" input if 'Other' is selected in "Job Role"
jobRoleSelect.addEventListener('change', (e) => {
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
    const designMenu = document.querySelector('#design') // design dropdown
    const colorMenu = document.querySelector('#color')// color dropdown
    const option = document.createElement('option')
    
    // Create default 'Please choose a T-shirt theme' option in color dropdown if a T-shirt theme isn't chosen.
    option.defaultSelected = true
    option.text = 'Please choose a T-shirt theme'
    colorMenu.appendChild(option)
    colorMenu.disabled = true

    // Listens for any changes to the Design dropdown menu
    designMenu.addEventListener('change', (e) => {
        const selection = e.target.value
        let lastColorOption = colorMenu.options.length - 1
        if(selection !== 'Select Theme'){
            colorMenu.disabled = false
        } else {
            colorMenu[lastColorOption].selected = true
            colorMenu.disabled = true
        }

        // T-shirt Color choices
        if(selection === 'heart js') {
            for(let i = 0; i < colorMenu.length; i++) {
                if(colorMenu.options[i].text.includes('Puns')) {
                    colorMenu.options[i].hidden = true
                }
                if(colorMenu.options[i].text.includes('♥')) {
                    colorMenu.options[i].hidden = false
                    colorMenu[3].defaultSelected = true
                }
            }
        } 

        if(selection === 'js puns') {
            for(let i = 0; i < colorMenu.length; i++) {
                if(colorMenu.options[i].text.includes('♥')) {
                    colorMenu.options[i].hidden = true
                } else if(colorMenu.options[i].text.includes('Puns')) {
                    colorMenu.options[i].hidden = false
                    colorMenu[0].defaultSelected = true
                }
        }
    }
    })
}
    
tShirtInfo()

/* 
    This function will keep track of all activities.  If there are other workshops that happen at the same time as the workshop you chose, those workshops will not be available to choose.  It will also keep track of the cost of all of the activities you want to participate in.
*/
const activities = () => {
    const activities = document.querySelector('.activities')
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
        }else if(!click.checked) {

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
        console.log(activitiesChosen)
        console.log(click)
    })
}
activities()

// This function will handle the UI for the payment info.  It will show you only the information that is needed for that specific payment type.
const paymentInfo = () => {
    const payment = document.querySelector('#payment')
    const paymentMethods = document.querySelectorAll('#payment option')
    const paypalPayment = document.querySelector('#paypal')
    const bitcoinPayment = document.querySelector('#bitcoin')
    const creditcardPayment = document.querySelector('#credit-card')
    paymentMethods[0].hidden = true
    paymentMethods[1].defaultSelected = true
    paypalPayment.hidden = true
    bitcoinPayment.hidden = true

    payment.addEventListener('change', (e) => {
        let method = e.target.value
        if(method === 'credit card') {
            creditcardPayment.hidden = false
            paypalPayment.hidden = true
            bitcoinPayment.hidden = true
            paymentType = 'credit card'
        } else if(method === 'paypal') {
            paypalPayment.hidden = false
            creditcardPayment.hidden = true;
            bitcoinPayment.hidden = true
            paymentType = 'paypal'
        } else {
            bitcoinPayment.hidden = false
            creditcardPayment.hidden = true
            paypalPayment.hidden = true
            paymentType = 'bitcoin'
        }
    })
    
}

paymentInfo()

// Validation functions

const nameValidation = (name) => {
    let regex = /^\D* \D*$/i
    return regex.test(name)
}

const emailValidation = (email) => {
    let regex = /^[^@]+@[^@.]+\.[a-z]+$/i
    return regex.test(email)
}

const activitiesValidation = () => {    
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

const creditcardValidation = (cardNumber) => {
    let regex = /^\d{4}[ -]?\d{4}[ =]?\d{4}[ -]?\d{4}$/
    return regex.test(cardNumber)
}

const cvvValidation = (cvv) => {
    let regex = /^\d{3}$/
    return regex.test(cvv)
}

const validateFields = () => {

    // Stores the results of the Validation Tests
    let nameValidationResults = nameValidation(name.value)
    let emailValidationResults = emailValidation(document.querySelector('#mail').value)
    let activitiesValidationResults = activitiesValidation()
    let creditcardValidationResults = creditcardValidation(document.querySelector('#cc-num').value)
    let cvvValidationResults = cvvValidation(document.querySelector('#cvv').value)

    // Displays Name Validation Error if needed
    if(!nameValidationResults) {
        document.querySelector('.nameValidationError').style.display = 'block'
    }  else {
        document.querySelector('.nameValidationError').style.display = 'none'
    }

    // Displays Email Validation Error if needed
    if(!emailValidationResults) {
        document.querySelector('.emailValidationError').style.display = 'block'
    } else {
        document.querySelector('.emailValidationError').style.display = 'none'
    }

    // Displays Activities Validation Error if needed
    if(!activitiesValidationResults) {
        document.querySelector('.activitiesValidationError').style.display = 'block' 
    } else {
        document.querySelector('.activitiesValidationError').style.display = 'none'
    }

    // Displays Credit Card Validation Error if needed
    const payment = document.querySelector('#payment option').value
    if(paymentType === 'credit card') {
        if(!creditcardValidationResults || !cvvValidationResults) {
            document.querySelector('.creditcardValidationError').style.display = 'block'
        } else {
            document.querySelector('.creditcardValidationError').style.display = 'none'
        }
    }
    
    // console.log('creditcardValidationResults: ', creditcardValidationResults)
    // console.log('cvvValidationResults: ', cvvValidationResults)
}

// Submit form

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    validateFields()
})

console.log(document.querySelector('#payment option'))