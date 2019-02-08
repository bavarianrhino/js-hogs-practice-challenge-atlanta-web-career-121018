

console.log('%c Welcome to The Hog Show!', 'color: firebrick')
document.addEventListener('DOMContentLoaded', setupPage)

    function setupPage() {
        iteratingHogs()
        addHogFormHandler()
        console.log('%c Successfully ran Page Set-Up', 'color: green')
    }

    function fetchHogs(){
        const URL = "http://localhost:3000/hogs"
        return fetch(URL)
        .catch(error => console.log('%c Error Caught when fetching hogs from DataBase', 'color: firebrick'))
        .then(res => res.json())
        .then(res => res)
    }

    function iteratingHogs(){
        fetchHogs().then(function (hog) {
            hog.forEach(makeHog)
            console.log('%c Successfully Iterated & Rendered Hogs', 'color: green')
            console.log('%c Below is the array of Hogs!', 'color: orange')
            console.log(hog)
        })
    }

    // function makeHog(hog) {
    //     let form = document.querySelector('#dog-form'))
    //     let row = dogView(dog)
    //     table.appendChild(row)
    // }

    function makeHog(hog){
        let container = document.querySelector('#hog-container')

        let div = document.createElement('div')
        div.className = 'hog-card'
        div.id = hog.id
        container.appendChild(div)

        let heading = document.createElement('h1')
        heading.textContent = hog.name
        div.appendChild(heading)

        let specialPara = document.createElement('p')
        specialPara.textContent = 'Hog Specialty ' + hog.specialty
        div.appendChild(specialPara)

        let metalPara = document.createElement('metalPara')
        metalPara.textContent = 'Higest Metal: ' + hog['highest medal achieved']
        div.appendChild(metalPara)

        let span = document.createElement('p')
        span.textContent = 'Hog is Greased? :'
        div.appendChild(span)

            let greaseBox = document.createElement('input')
            greaseBox.type = 'checkbox'
                if (hog.greased) {
                    greaseBox.checked = true;
                }
            greaseBox.id = hog.id
            greaseBox.addEventListener('change', function() {changeGreaseBox(hog)})
            span.appendChild(greaseBox)

        let image = document.createElement('img')
        image.src = hog.image;
        div.appendChild(image)

        let weightPara = document.createElement('p')
        weightPara.textContent = 'Weight Ratio: ' + hog['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']
        div.appendChild(weightPara)

        let button = document.createElement('button')
        button.textContent = 'Delete Hog'
        button.id = hog.id
        button.addEventListener('click', () => deleteHog(hog))
        div.appendChild(button)

        return div;
    }

    function addHogFormHandler() {
        let form = document.querySelector('#hog-form')
        form.addEventListener('submit', addNewHog)
        console.log("%c Added Form Handler", 'color: green')
    }

    function addNewHog() {
        event.preventDefault()

        let name = event.target.name.value
        let specialty = event.target.specialty.value
        let medal = event.target.medal.value
        let weight = event.target.weight.value
        let image = event.target.img.value
        let greased = event.target.greased.checked

        createHog(name, specialty, medal, weight, image, greased).then(makeHog)
        event.target.reset();
        console.log("%c Successfully Created a Hog!", 'color: green')
    }

    function createHog(name, specialty, medal, weight, image, greased) {
        const url = 'http://localhost:3000/hogs'
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: name,
                specialty: specialty,
                ['highest medal achieved']: medal,
                ['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']: weight,
                image: image,
                greased: greased
            })
        }).catch(error => console.log('%c Error Caught when Creating hog in DataBase', 'color: firebrick'))
        .then(res => res.json())
    }


    function deleteHog(hog){
        // the event.target = button
        // the parentElemenet = container
        // the parentElemet= hogCard

        let container = document.querySelector('#hog-container')
        let removeHogCard = event.target.parentElement
        container.removeChild(removeHogCard)

        let hogID = hog.id
        removeDataBaseHog(hogID)
        .then(console.log("%c Successfully Deleted Hog From HTML & DataBase", 'color: green'))
    }

    function removeDataBaseHog(hogID) {
        const url = `http://localhost:3000/hogs/${hogID}`
        return fetch(url,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        }).catch(error => console.log('%c Error Caught when deleting hog from DataBase', 'color: firebrick'))
    }

    function changeGreaseBox(hog){
        let newGreaseBoxValue = event.target.checked
        let id = event.target.id
        patchGreaseHogBox(id, newGreaseBoxValue).then(console.log("%c Successfully Patched Greased Hog in DataBase", 'color: green'))
    }

    function patchGreaseHogBox(id, newGreaseBoxValue) {
        const url = `http://localhost:3000/hogs/${id}`
        return fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                greased: newGreaseBoxValue
            })
        }).catch(error => console.log('%c Error Caught when Updating hog from DataBase', 'color: firebrick'))
    }
