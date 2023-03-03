let count = 6;
// modal

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
  // console.log(toolsData)
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
  if(toolsData.length === 0) {
    seeMoreBtn.classList.add("hidden");
}
  seeMoreBtn.onclick = () => {
    count = toolsData.length;
    allDataLoad();
    seeMoreBtn.classList.add("hidden")
}
    
    spinner(false)
}

allDataLoad()