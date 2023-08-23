import Axios from "axios";
import { baseUrl } from "./baseUrl";
import { legal } from "./productionStenoData/legal";
import { commonPhrases } from "../util/productionStenoData/commonPhrases";

/**
 * (CURRENTLY NOT IN USE) Posts entire list of terms to an Admin-created List
 **/
function saveNewListTerms(title, excelData) {
  for (let i = 0; i < excelData.length; i++)
    Axios.post(`${baseUrl}/admin-update-list`, {
      listTitle: title,
      newListTerms: excelData[i],
    })
      .then((res, err) => {})
      .catch((err) => console.log(err));
}

/**
 * (CURRENTLY NOT IN USE) Posts a new list and a new list object
 **/
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

/**
 * (CURRENTLY NOT IN USE) The 'Extract' button run command to post a new admin-created list
 **/
export function runCommand() {
  saveNewList("Common Phrases");
  saveNewListTerms("Common Phrases", commonPhrases);
}
