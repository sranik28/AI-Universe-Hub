let count = 6;
const allDataLoad = async () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    const toolsData = data.data.tools;
    console.log(toolsData)
    const tools = toolsData.slice(0,count);
    const cardDetails = document.getElementById('card-details')
    tools.forEach(tool =>{
        cardDetails.innerHTML+=`
        <div class="card w-96 mx-5 bg-base-100 shadow-xl">
                    <figure><img src="${tool.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">Features</h2>
                      <ol class="list-[number]">
                        <li>${tool.features[0]}</li>
                        <li>${tool.features[1]}</li>
                        <li>${tool.features[2]}</li>
                      </ol> 
                      <div>
                        <h1 class="text-xl font-semibold mt-11">${tool.name}</h1> 
                      <p class="my-3">${tool.published_in}</p>                     
                      </div>
                    </div>
                  </div>
        `
    })
        
}
allDataLoad()