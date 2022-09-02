const fullName = document.getElementById('name')
const fullNameError = document.getElementById('name-error')
const email = document.getElementById('email')
const emailError = document.getElementById('email-error')
const employeeNumber = document.getElementById('employeeNumber')
const employeeNumberError = document.getElementById('employee-error')
const joinDate = document.getElementById('date')
const joinDateError = document.getElementById('date-error')
const jobRank = document.getElementById('jobRank')
const jobRankError = document.getElementById('rank-error')
const jobTitle = document.getElementById('jobTitle')
const otherTitle = document.getElementById('otherRoleField');

const handleSubmit = () => {
    let myForm = document.getElementById("form");
    let formData = new FormData(myForm);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => console.log("Form successfully submitted"))
};

function validate() {
    
    var dateCheck = dateValidation()
    var fullNameCheck = nameValidation()
    var emailCheck = emailValidation()
    var employeeNumberCheck = employeeValidation()
    var jobRankCheck = jobRankValidation()

    if(fullNameCheck 
        && emailCheck 
        && employeeNumberCheck 
        && dateCheck
        && jobRankCheck
        ) {
        handleSubmit();
        window.location.href=`../results.html?name=${fullName.value}&email=${email.value}&employeeNumber=${employeeNumber.value}&date=${date.value}&jobRank=${jobRank.value}&jobTitle=${jobTitle.value}`
        return true;
    } else {
        return false;
    }
}

function emailValidation() {
    var pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    var valid = pattern.test(email.value)

    if(valid && email.value.trim().length > 0) {
        emailError.style.display = 'none'
    } else{
        email.setCustomValidity(" ") //Removes the standard alert
        emailError.style.display = 'block'
    }

    return (valid && email.value.trim().length > 0)
};

function nameValidation() {
    var pattern = /\d/;
    var valid = !pattern.test(fullName.value)

    if(valid && fullName.value.trim().length > 0 && fullName.value.split(" ").length >= 2) {
        fullNameError.style.display = 'none'
    } else{
        fullName.setCustomValidity(" ") //Removes the standard alert
        fullNameError.style.display = 'block'
    }

    return (valid && fullName.value.trim().length > 0)
};

function employeeValidation() {
    var patternFormat = /^(E[-]).*[0-9]{9}/;
    var patternDigits = /[^0-9]/g

    var checkPattern = patternFormat.test(employeeNumber.value)
    var countOfDash = employeeNumber.value.split("-").length - 1
    var countOfNumber = employeeNumber.value.replace(patternDigits, '').length
    var totalLength = employeeNumber.value.length == 11

    if ( checkPattern && totalLength && countOfNumber == 9 && countOfDash == 1) {
        var valid = true
        employeeNumberError.style.display = 'none'
    } else {
        var valid = false
        employeeNumber.setCustomValidity(" ") //Removes the standard alert
        employeeNumberError.style.display = 'block'
    }

    return valid
};

function dateValidation() {

    const currentYear = new Date().getFullYear();

    year = joinDate.value.split("-")[0];
    yearCheck = (year.length == 4 && year <= currentYear);
    month = joinDate.value.split("-")[1];
    monthCheck = (month <= 12);
    day = joinDate.value.split("-")[2];
    dayCheck = (day <= 31);

    if (yearCheck && monthCheck && dayCheck) {
        var valid = true
        joinDateError.style.display = 'none'
    } else {
        var valid = false
        joinDate.setCustomValidity(" ") //Removes the standard alert
        joinDateError.style.display = 'block'
    }

    return valid
};

function jobRankValidation() {
    if (!jobRank.value.length == 0) {
        var valid = true
        jobRankError.style.display = 'none'
    } else {
        var valid = false
        jobRankError.style.display = 'block'
    }

    return valid
};

jobTitle.addEventListener('click', () => {
    if(jobTitle.value == "Other") {
        otherTitle.style.display = "block";
    }
})