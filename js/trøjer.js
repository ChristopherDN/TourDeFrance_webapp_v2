gulTrøje = "http://localhost:8181/cykelrytter/orden";
prikketTrøje = "http://localhost:8181/cykelrytter/bjerg";
grønTrøje = "http://localhost:8181/cykelrytter/spurt";
hvidTrøje = "http://localhost:8181/cykelrytter/ungdom";


let cykelTabel = document.getElementById("trøje-tabel");

function fetchData(url) {
  return fetch(url).then(res => res.json());
}


async function opretRytterTabel() {
  const rytterData = await fetchData(prikketTrøje);
  const spurtData = await fetchData(grønTrøje);
  const ungdomData = await fetchData(hvidTrøje);
  const gulData = await fetchData(gulTrøje);


  cykelTabel.innerHTML += `<tr>
    <th scope="col">Trøje</th>
    <th scope="col">Hold</th>
    <th scope="col">Cykelrytter</th>
    <th scope="col">Nationalitet</th>
    <th scope="col">Alder</th>
    <th scope="col">Samlet tid</th>
    <th scope="col">Bjergpoint</th>
    <th scope="col">Spurtpoint</th>
  </tr>`

  await fetchData(gulTrøje);
  for (let i = 0; i < 1; i++) {
    let splitTid = gulData[i].samlettid;
    splitTid = splitTid.toString();
    let tid = splitTid.slice(0, 2) + " timer " + splitTid.slice(2, 4) + " minuter " + splitTid.slice(0, 2) + " sekunder ";
    cykelTabel.innerHTML += `
    <tbody>
    <tr>
       <td>Den Gule trøje</td>
       <td>${gulData[0].cykelhold.teamnavn}</td>
       <td>${gulData[0].navn}</td>
       <td>${gulData[0].nationalitet}</td>
       <td>${gulData[0].alder}</td>
       <td>${tid}</td>
       <td>${gulData[0].bjergpoint}</td>
       <td>${gulData[0].spurtpoint}</td>
    </tr>
    </tbody>
    `;
  }

  await fetchData(prikketTrøje);
  for (let i = 0; i < 1; i++) {
    let splitTid = rytterData[i].samlettid;
    splitTid = splitTid.toString();
    let tid = splitTid.slice(0, 2) + " timer " + splitTid.slice(2, 4) + " minuter " + splitTid.slice(4, 6) + " sekunder ";
    cykelTabel.innerHTML += `
    <tbody>
    <tr>
      <td>Den Prikkede Trøje</td>
      <td>${rytterData[0].cykelhold.teamnavn}</td>
      <td>${rytterData[0].navn}</td>
      <td>${rytterData[0].nationalitet}</td>
      <td>${rytterData[0].alder}</td>
      <td>${tid}</td>
      <td>${rytterData[0].bjergpoint}</td>
      <td>${rytterData[0].spurtpoint}</td>
    </tr>
    </tbody>
    `;
  }

  await fetchData(grønTrøje);
  for (let i = 0; i < 1; i++) {
    let splitTid = spurtData[i].samlettid;
    splitTid = splitTid.toString();
    let tid = splitTid.slice(0, 2) + " timer " + splitTid.slice(2, 4) + " minuter " + splitTid.slice(0, 2) + " sekunder ";
    cykelTabel.innerHTML += `
    <tbody>
    <tr>
      <td>Den Grønne Trøje</td>
      <td>${spurtData[0].cykelhold.teamnavn}</td>
      <td>${spurtData[0].navn}</td>
      <td>${spurtData[0].nationalitet}</td>
      <td>${spurtData[0].alder}</td>
      <td>${tid}</td>
      <td>${spurtData[0].bjergpoint}</td>
      <td>${spurtData[0].spurtpoint}</td>
    </tr>
    </tbody>
    `;
  }


  await fetchData(hvidTrøje);
  for (let i = 0; i < 1; i++) {
    let splitTid = ungdomData[i].samlettid;
    splitTid = splitTid.toString();
    let tid = splitTid.slice(0, 2) + " timer " + splitTid.slice(2, 4) + " minuter " + splitTid.slice(0, 2) + " sekunder ";
    cykelTabel.innerHTML += `
    <tbody>
    <tr>
       <td>Den Hvide trøje</td>
       <td>${ungdomData[0].cykelhold.teamnavn}</td>
       <td>${ungdomData[0].navn}</td>
       <td>${ungdomData[0].nationalitet}</td>
       <td>${ungdomData[0].alder}</td>
       <td>${tid}</td>
       <td>${ungdomData[0].bjergpoint}</td>
       <td>${ungdomData[0].spurtpoint}</td>
    </tr>
    </tbody>
    `;
  }

}

window.addEventListener("load",async() =>{
  await opretRytterTabel();
})

