const name = document.querySelector('#name')
const otherJobRole = document.querySelector('option[value="other"]')
const jobRoleSelect = document.querySelector('#title')
const otherTitleInput = document.querySelector('#other-title')
const designMenu = document.querySelector('#design')
const colorMenu = document.querySelector('#color')

// Set initial focus to the Name field on page load
name.focus()

// Initially hide the 'Other' job role
otherTitleInput.hidden=true

// Only display the "other-title" input if 'Other' is selected in "Job Role"
jobRoleSelect.addEventListener('change', (e) => {
    let jobRole = e.target.value
    if(jobRole === 'other') {
        otherTitleInput.hidden=false
    } else{
        otherTitleInput.hidden=true
    }
})

// If no T-Shirt theme is selected, no colors should be displayed in colors menu.  Color field should say 'Please select a T-shirt theme'

designMenu.addEventListener('change', (e) => {
    let designMenuValue = e.target.value
   
})

console.log(designMenu)
console.log(colorMenu)
