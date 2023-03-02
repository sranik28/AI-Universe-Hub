let count = 6;
// modal
const showModal = async (id)=> {
  const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  document.getElementById("my-modal-3").checked  = true;
}

const allDataLoad = async () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    const toolsData = data.data.tools;
    console.log(toolsData)
    const tools = toolsData.slice(0, count);
    const cardDetails = document.getElementById('card-details')
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


allDataLoad()