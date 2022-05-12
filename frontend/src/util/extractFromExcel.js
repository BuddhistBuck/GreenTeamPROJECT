import Axios from "axios";
import { baseUrl } from "./baseUrl";
import { legal } from "./productionStenoData/legal";

function saveNewListTerms(title, excelData) {
  for (let i = 0; i < excelData.length; i++)
    Axios.post(`${baseUrl}/admin-update-list`, {
      listTitle: title,
      newListTerms: excelData[i],
    })
      .then((res, err) => {})
      .catch((err) => console.log(err));
}

function saveNewList(newList) {
  const requestOne = Axios.post(`${baseUrl}/admin-list-object-create`, {
    name: newList,
  }).then((res) => {
    if (res) {
    }
  });

  const requestTwo = Axios.post(`${baseUrl}/admin-list-create`, {
    listTitle: newList,
  }).then((res) => {
    if (res) {
    } else {
    }
  });

  if (newList) {
    Axios.all([requestOne, requestTwo])
      .then(
        Axios.spread((...res) => {
          const responseOne = res[0];
          const responseTwo = res[1];
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }
}

export function runCommand() {
  saveNewList("Short Phrases");
  saveNewListTerms("Short Phrases", legal);
}
