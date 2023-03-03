const resp = document.querySelector("#resp")

async function obtenerTodos(){
  const response = await fetch('/lista');
  const data = await response.json();  
  for (let valor of data){
    let dif=parseFloat(valor.pib_2020)-parseFloat(valor.pib_2019)
    resp.innerHTML+=`
      <tr>
        <td>${valor.nombre}</td>
        <td>${valor.pib_2019}</td>
        <td>${valor.pib_2020}</td>
        <td>${dif}</td>
      </tr>
    `
  }
  
}

document.querySelector("#x").addEventListener("click",async()=>{
    await obtenerTodos()
})