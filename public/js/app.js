console.log("here")



const addressForm = document.querySelector('form')
const latitudeInput = document.getElementById('latitude')
const longtitudeInpupt = document.getElementById('longtitude')
const p1 = document.getElementById('p1')
const p2 = document.getElementById('p2')
addressForm.addEventListener('submit',(e)=>{
    p1.innerText = '';
    p2.innerText = '';
    e.preventDefault();
    const url = "//localhost:3000/weather?latitude="+latitudeInput.value+"&longtitude="+longtitudeInpupt.value
    p1.innerText = "Loading";
    fetch(url).then((response)=>{
    response.json().then(({error,precipProbability,temperature}={})=>{
        if(error){
            p1.innerText=error;
        }else{
            p1.innerText=precipProbability;
            p2.innerText=temperature;
        }
       
    })
})

})