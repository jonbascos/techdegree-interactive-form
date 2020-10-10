const name = document.querySelector('#name')
const otherJobRole = document.querySelector('option[value="other"]')
const jobRoleSelect = document.querySelector('#title')
const otherTitleInput = document.querySelector('#other-title')
const p = document.createElement('p')
let totalActivityCost = 0

// console.log('working')

// Set initial focus to the Name field on page load
name.focus() 

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
    activities.appendChild(p)
    p.innerHTML = `<h3>Total activity cost: $0</h3>`

    activities.addEventListener('change', (e) => {
        let click = e.target
        let cost = parseInt(click.getAttribute('data-cost'))
        let dayTime = click.getAttribute('data-day-and-time')
        let activitiesLabel = activities.getElementsByTagName('label')
        const activitiesInputs = activities.getElementsByTagName('input')
        
        // Keep track of total activity costs
        if(click.checked) {
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
        } else if(method === 'paypal') {
            paypalPayment.hidden = false
            creditcardPayment.hidden = true;
            bitcoinPayment.hidden = true
        } else {
            bitcoinPayment.hidden = false
            creditcardPayment.hidden = true
            paypalPayment.hidden = true
        }
    })
    
}

paymentInfo()

// Validation functions

