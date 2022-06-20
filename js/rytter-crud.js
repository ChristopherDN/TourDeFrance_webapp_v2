restApi = "http://localhost:8181/cykelrytter";

let cykelTabel = document.getElementById("cykel-crud-tabel");

function fetchData(url) {
  return fetch(url).then(res => res.json());
}




async function opretRytterTabel() {
  const rytterData = await fetchData(restApi);


  cykelTabel.innerHTML += `<tr>
    <th scope="col">#</th>
    <th scope="col">Hold</th>
    <th scope="col">Cykelrytter</th>
    <th scope="col">Alder</th>
    <th scope="col">Nationalitet</th>
    <th scope="col">Samlet tid</th>
    <th scope="col">Bjergpoint</th>
    <th scope="col">Spurtpoint</th>
    <th scope="col">Ændringer</th>
  </tr>`

  const loop = await fetchData(restApi);
  for (let i = 0; i < loop.length; i++) {
    let splitTid = rytterData[i].samlettid;
    splitTid = splitTid.toString();
    let tid = splitTid.slice(0, 2) + " timer " + splitTid.slice(2, 4) + " min " + splitTid.slice(4, 6) + " sek ";
    cykelTabel.innerHTML += `
    <tbody>
    <tr>
      <td>${rytterData[i].cykelrytterId}</td>
      <td>${rytterData[i].cykelhold.teamnavn}</td>
      <td>${rytterData[i].navn}</td>
      <td>${rytterData[i].alder}</td>
      <td>${rytterData[i].nationalitet}</td>
      <td>${tid}</td>
      <td>${rytterData[i].bjergpoint}</td>
      <td>${rytterData[i].spurtpoint}</td>
      <td><div>
        <button type="button" onclick="redigerCykelrytter(${rytterData[i].cykelrytterId})" class="btn btn-light">&#128394;</button>
        <button type="button" onclick="reloadSlet(${rytterData[i].cykelrytterId})" class="btn btn-light">&#128465;</button>
        </div></td>
    </tr>
        </tbody>
    `;
  }
}


document.getElementById("opret-rytter").addEventListener("click", ()=>{
  new bootstrap.Modal(document.getElementById("opretModal")).show();

})


document.getElementById("opret-rytter-modal").addEventListener("click", async()=>{
  let cykelrytter = {
    "navn": document.getElementById("opretNavn").value,
    "nationalitet": document.getElementById("opretNationalitet").value,
    "alder": document.getElementById("opretAlder").value,
    "samlettid": document.getElementById("opretSamlettid").value,
    "bjergpoint": document.getElementById("opretBjergpoint").value,
    "spurtpoint": document.getElementById("opretSpurtpoint").value,
    "teamId": document.getElementById("opretTeamId").value
  }
  await opret(cykelrytter)
  location.reload()

  }
)



async function reloadSlet(id){
  await slet(id);
  location.reload()
}

window.addEventListener("load",async() =>{
  await opretRytterTabel();
})

   document.getElementById("rediger-rytter").addEventListener("click", async()=> {
    let cykelrytter = {
      "navn": document.getElementById("navn").value,
      "nationalitet": document.getElementById("nationalitet").value,
      "alder": document.getElementById("alder").value,
      "samlettid": document.getElementById("samlettid").value,
      "bjergpoint": document.getElementById("bjergpoint").value,
      "spurtpoint": document.getElementById("spurtpoint").value,
      "teamId": document.getElementById("teamId").value
    }
    let id = document.getElementById("rytterId").value
    await rediger(id, cykelrytter)
     location.reload();
  })

  function slet(id) {
  return fetch("http://localhost:8181/cykelrytter/" + id, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  });
}


async function redigerCykelrytter(id){
new bootstrap.Modal(document.getElementById("exampleModal")).show();
document.getElementById("rytterId").value = id;
let cykelrytter = await getRytter(id)
  document.getElementById("navn").value = cykelrytter.navn
  document.getElementById("alder").value = cykelrytter.alder
  document.getElementById("nationalitet").value = cykelrytter.nationalitet
  document.getElementById("samlettid").value = cykelrytter.samlettid
  document.getElementById("bjergpoint").value = cykelrytter.bjergpoint
  document.getElementById("spurtpoint").value = cykelrytter.spurtpoint
  document.getElementById("teamId").value = cykelrytter.cykelhold.teamId
}


async function rediger(id, cykelrytter) {
  return fetch("http://localhost:8181/" + cykelrytter.teamId + "/cykelrytter/" + id, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    }, body: JSON.stringify(cykelrytter)
  });
}

async function opret(cykelrytter) {
  return fetch("http://localhost:8181/" + cykelrytter.teamId + "/cykelrytter/",{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }, body: JSON.stringify(cykelrytter)
  });
}


async function getRytter(id) {
  return (await fetch("http://localhost:8181/cykelrytter/" + id, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })).json();
}






