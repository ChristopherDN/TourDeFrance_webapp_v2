restApi = "http://localhost:8181/cykelhold";


let cykelholdTabel = document.getElementById("cykelhold-tabel");

function fetchData(url) {
  return fetch(url).then(res => res.json());
}

window.addEventListener("load",async() =>{
  await opretTabel();
})

async function opretTabel() {
  const data = await fetchData(restApi);
  const loop = await fetchData(restApi);
  for (let i = 0; i < loop.length; i++) {

    cykelholdTabel.innerHTML += `

    <tr>
      <th scope="col">#</th>
      <th scope="col">Hold</th>
      <th scope="col">Cykelrytter</th>
      <th scope="col">Placering</th>
    </tr>

    <tbody>
    <tr>
      <th scope="row">1</th>
      <td>${data[i].teamnavn}</td>
    </tbody>
    `;
  }
}




