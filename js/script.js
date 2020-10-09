const name = document.querySelector('#name')
const otherJobRole = document.querySelector('option[value="other"]')
const jobRoleSelect = document.querySelector('#title')
const otherTitleInput = document.querySelector('#other-title')

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
        if(selection === 'Select Theme') {
           
        }
    })
}
    

tShirtInfo()