let count = 6;
// modal
const accuracyContainer = document.getElementById("accuracy-container")
function accuracyTagRemover () {
    document.getElementById("accuracy").remove();
    return "";
}
function accuracyTagAdder (score) {
    accuracyContainer.innerHTML = `<p class=" bg-[#EB5757] text-white p-2 rounded-md font-bold" id="accuracy">${score}</p>`;
}
// modal data load function load 
const showModal = async (id) => {    
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const modal = data.data;
    document.getElementById("my-modal-3").checked = true;
    document.getElementById("modal-img").src = `${modal.image_link[0]}`;
    document.getElementById("modal-description").innerText = `${modal.description}`;
    document.getElementById("modal-input").innerText = `${modal.input_output_examples ? modal.input_output_examples[0].input : "Can you give any example?"}`;
    document.getElementById("modal-output").innerText =`${modal.input_output_examples ? modal.input_output_examples[0].output: "No! Not Yet! Take a break" }`;
    `${modal.accuracy.score ?  accuracyTagAdder(modal.accuracy.score * 100 + "% accuracy") : accuracyTagRemover()}`;
    document.getElementById("price1").innerText = `${modal.pricing ? modal.pricing[0].price : "Free of cost"} Basic`;
    document.getElementById("price2").innerText =`${modal.pricing ? modal.pricing[1].price : "Free of cost"} Pro`;
    document.getElementById("price3").innerText = `${modal.pricing ? modal.pricing[2].price : "Free of cost"} Enterprise`;
    const features = document.getElementById("features");
    const integrations = document.getElementById("integrations");
    features.innerHTML = "";
    integrations.innerHTML = "";
    const featuresList = modal.features ? featureAdder(modal.features): featureAdder("");
    function featureAdder(featuresLists) { 
        try{
            for(let feature in featuresLists) {
                features.innerHTML += `<li class="py-1">${featuresLists[feature].feature_name}</li>`
            }
        } catch (err) {
            features.innerHTML = "No data found";
        }       
    }
    const integrationsList = modal.integrations ? integrationsAdder(modal.integrations) : integrationsAdder("");

    function integrationsAdder (integrationsLists) {
        try {
            integrationsLists.forEach(integration => {
                integrations.innerHTML += `<li class="py-1">${integration}</li>`
            })
        } catch(err) {
            integrations.innerText = "No data found";
        }        
    }    
}

// spinner

const spinner = (isLoading) => {
  if(isLoading){
    document.getElementById('spinner').classList.remove('hidden');
  }
  else{
    document.getElementById('spinner').classList.add('hidden');
  }
}


const showData =  (tools) => {
  const cardDetails = document.getElementById('card-details');
  cardDetails.innerHTML = '';
    tools.forEach(tool => {
        cardDetails.innerHTML += `
        <div class="card w-96 mx-5 bg-base-100 shadow-xl">
                    <figure><img src="${tool.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">Features</h2>
                      <ol class="list-[number]">
                        <li>${tool.features[0] ? tool.features[0] : "Not Available"}</li>
                        <li>${tool.features[1] ? tool.features[1] : "Not Available"}</li>
                        <li>${tool.features[2] ? tool.features[2] : "Not Available"}</li>
                      </ol> 
                      <div class= "flex justify-between items-center">
                        <div>
                        <h1 class="text-xl font-semibold mt-11">${tool.name}</h1> 
                        <p class="my-3"><i class="fa-solid fa-calendar-days"></i> ${tool.published_in ? tool.published_in : "Not Available"}</p> 
                      </div>
                      <div>
                        <button onclick="showModal('${tool.id}')"> <i class="fa-solid fa-arrow-right"></i>
                        </button> 
                      </div>                                        
                      </div>                     
                    </div>                   
                  </div>                  
        `
    })
}

const allDataLoad = async () => {
  spinner(true)
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  const toolsData = data.data.tools;
  const tools = toolsData.slice(0, count);
  const sortByDate = () => {
    tools.sort(function(a, b){        
        return new Date(a.published_in) - new Date(b.published_in);
    });
}

// sortBtn click event

const sortBtn = document.getElementById("sort-date-btn");
sortBtn.addEventListener("click",  () => {
    sortByDate();
    showData(tools);
})
showData(tools);

  // see more
  const seeMoreBtn = document.getElementById('see-more-btn');
  seeMoreBtn.onclick = () => {
    count = toolsData.length;
    allDataLoad();
    seeMoreBtn.classList.add("hidden")
}
    
    spinner(false)
}
allDataLoad()