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
    } else{
        otherTitleInput.hidden=true
    }
})

const tShirtInfo = () => {
    const designMenu = document.querySelector('#design') // design dropdown
    const colorMenu = document.querySelector('#color') // color dropdown
    const option = document.createElement('option')
    option.textContent = 'Please choose a T-shirt design'
    colorMenu.appendChild(option)

    if(designMenu.value === 'Select Theme') {
        for(let i = 0; i < colorMenu.length; i++ ) {
            if(colorMenu[i].value !== 'Please choose a T-shirt design') {
                colorMenu[i].remove()
            }
        }
    }
}

tShirtInfo()