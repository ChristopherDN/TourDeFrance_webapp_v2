restApi = "http://localhost:8181/cykelrytter/orden";


let cykelTabel = document.getElementById("placering-tabel");

function fetchData(url) {
  return fetch(url).then(res => res.json());
}


async function opretRytterTabel() {
  const rytterData = await fetchData(restApi);


  cykelTabel.innerHTML += `<tr>
    <th scope="col">Placering</th>
    <th scope="col">Hold</th>
    <th scope="col">Cykelrytter</th>
    <th scope="col">Alder</th>
    <th scope="col">Nationalitet</th>
    <th scope="col">Samlet tid</th>
    <th scope="col">Bjergpoint</th>
    <th scope="col">Spurtpoint</th>
  </tr>`

  const loop = await fetchData(restApi);
  for (let i = 0; i < loop.length; i++) {
    let splitTid = rytterData[i].samlettid;
    splitTid = splitTid.toString();
    let tid = splitTid.slice(0, 2) + " timer " + splitTid.slice(2, 4) + " minuter " + splitTid.slice(0, 2) + " sekunder ";
    cykelTabel.innerHTML += `

    <tbody>
    <tr>
      <td>${[i+1]}</td>
      <td>${rytterData[i].cykelhold.teamnavn}</td>
      <td>${rytterData[i].navn}</td>
      <td>${rytterData[i].alder}</td>
      <td>${rytterData[i].nationalitet}</td>
      <td>${tid}</td>
      <td>${rytterData[i].bjergpoint}</td>
      <td>${rytterData[i].spurtpoint}</td>
    </tr>
    </tbody>
    `;
  }
}

window.addEventListener("load",async() =>{
  await opretRytterTabel();
})




