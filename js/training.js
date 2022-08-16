

let params = new URLSearchParams(location.search);

nameValue = params.get('name')
emailValue = params.get('email')
employeeNumberValue = params.get('employeeNumber')
dateValue = params.get('date')
jobRankValue = params.get('jobRank');
jobTitleValue = params.get('jobTitle');

document.getElementById("welcome-name").innerHTML = `Welcome To EY ${nameValue}`
document.getElementById("training-text-rank").innerHTML = `The training below has been selected specifically for ${jobRankValue}s at EY. Please complete <span class="training-required">ALL</span> the onboarding at EY.`
document.getElementById("training-text-role").innerHTML = `The training below has been selected specifically for ${jobTitleValue}s at EY. These are optional to complete. However, are recommended in order to understand your role.`

document.getElementById("name").setAttribute('value', nameValue);
document.getElementById("email").setAttribute('value', emailValue);
document.getElementById("employeeNumber").setAttribute('value', employeeNumberValue);
document.getElementById("date").setAttribute('value', dateValue);
document.getElementById("jobRank").value = jobRankValue;
document.getElementById("jobTitle").value = jobTitleValue;

var jsonData = fetch("../training.json")
.then(results => results.json())
.then(response => {

    //Get required training
    Object.keys(response.jobRank[`${jobRankValue}`]).forEach(function(key, index){
        
        var courseDiv = document.createElement('div');
        if(courseDiv.style.animation){
            courseDiv.style.animation = '';
        } else {
            courseDiv.style.display = `block`
            courseDiv.style.animation = `courseItemFade 3s ease forwards ${index /7}s`;
        }
        courseDiv.className = "course-title";
        courseDiv.id = `course-title-${key}`;
        document.getElementById("rank_data").appendChild(courseDiv);

        var courseTitle = document.createElement('h3');
        courseTitle.innerHTML = response.jobRank[`${jobRankValue}`][key].name;
        document.getElementById(`course-title-${key}`).appendChild(courseTitle);

        var courseDescription = document.createElement('p');
        courseDescription.innerHTML = response.jobRank[`${jobRankValue}`][key].description;
        document.getElementById(`course-title-${key}`).appendChild(courseDescription);
        
        var courseLinkSpan = document.createElement('span');
        courseLinkSpan.className = "course-link";
        courseLinkSpan.id = "course-link-span"
        courseLinkSpan.innerHTML = `<a style="color:blue;" target="_blank" href="${response.jobRank[`${jobRankValue}`][key].link}">Start Training</a>`
        document.getElementById(`course-title-${key}`).appendChild(courseLinkSpan);
        })
    }
)

if (!!jobTitleValue && jobTitleValue!="Other") {

    var jobTitleElement = document.getElementById('training-optional')
    jobTitleElement.style.display = 'block'

    var jsonData = fetch("../training.json")
    .then(results => results.json())
    .then(response => {

    //Get required training
    Object.keys(response.jobTitle[`${jobTitleValue}`]).forEach(function(key, index){
        
        var courseDiv = document.createElement('div');
        if(courseDiv.style.animation){
            courseDiv.style.animation = '';
        } else {
            courseDiv.style.animation = `courseItemFade 3s ease forwards ${index /7}s`;
        }
        courseDiv.className = "course-title";
        courseDiv.id = `course-title-optional-${key}`;
        document.getElementById("role_data").appendChild(courseDiv);

        var courseTitle = document.createElement('h3');
        courseTitle.innerHTML = response.jobTitle[`${jobTitleValue}`][key].name;
        document.getElementById(`course-title-optional-${key}`).appendChild(courseTitle);

        var courseDescription = document.createElement('p');
        courseDescription.innerHTML = response.jobTitle[`${jobTitleValue}`][key].description;
        document.getElementById(`course-title-optional-${key}`).appendChild(courseDescription);
        
        var courseLinkSpan = document.createElement('span');
        courseLinkSpan.className = "course-link";
        courseLinkSpan.id = "course-link-span"
        courseLinkSpan.innerHTML = `<a style="color:blue;" target="_blank" href="${response.jobTitle[`${jobTitleValue}`][key].link}">Start Training</a>`
        document.getElementById(`course-title-optional-${key}`).appendChild(courseLinkSpan);
        })
    })
}




