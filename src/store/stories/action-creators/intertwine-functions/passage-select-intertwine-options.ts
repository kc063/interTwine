import {Passage, StoriesState, Story, UpdatePassageAction} from "../../stories.types";
import {Thunk} from "react-hook-thunk-reducer";
import {useAuth0} from "@auth0/auth0-react";
import {updatePassage} from "../update-passage";
import {useUndoableStoriesContext} from "../../../undoable-stories";
import {deletePassage} from "../delete-passage";


const {dispatch} = useUndoableStoriesContext();


/**
 * function to run when passage is SELECTED.
 * @param story
 * @param passage
 * @param exclusive
 */
export async function onSelectPassage(story: Story,
    passage: Passage){
  fetch("http://localhost:3232/passages?id=" + passage.id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
  )
  .then((response: Response) => response.json())
  .then(
      (responseObject: any) => {
        if (isSelectSuccessResponse(responseObject)) {
          if (isPassage(responseObject.data)) {
            console.log(responseObject.data);
            const {user} = useAuth0();
            // @ts-ignore
            const {sub} = user;
            passage.user = sub;
            passage.claimed = true;
            dispatch(updatePassage(story, passage, responseObject.data));
          }
          else{
            console.log("Error: response was success, but data was malformed passage.")
          }
        }
        else if (isSelectClaimedResponse(responseObject)) {
          if(isPassage(responseObject.data)) {
            console.log(responseObject.data);
            dispatch(updatePassage(story, passage, responseObject.data));
          }
          else{
            console.log("Error: response was claimed, but data was malformed passage.")
          }
        }
        else if (isSelectDeleteResponse(responseObject)) {
          console.log(responseObject.result);
          dispatch(deletePassage(story, passage));
        }
        else {
          console.log("Error: bad response type for selection.");
          console.log(responseObject);
        }})
}

/**
 * function to run when passage is DESELECTED.
 * @param story
 * @param passage
 * @param exclusive
 */
export function onDeselectPassage(story: Story,
                                passage: Passage){
  passage.claimed = false;
  passage.user = "";
  console.log(JSON.stringify(passage));
  fetch("http://localhost:3232/passages/" + passage.id,
      {
        method: 'PUT',
        body: JSON.stringify(passage),
        headers: {
          'Content-Type': 'application/json',
        },
      }
  )
  .then((response: Response) => response.json())
  .then(
      (responseObject: any) => {
        if (isSuccessResponse(responseObject)) {
          //all good!
        }
        else {
          console.log("Handle error for deselection/update.");
          console.log(responseObject);
        }})
}

/**
 * function to run when CREATING A NEW PASSAGE
 * @param story
 * @param passage
 */
export function onCreatePassage(passage: Passage){
  console.log(JSON.stringify(passage));
  //appropriate backend call
  fetch("http://localhost:3232/passages",
      {
        method: 'POST',
        body: JSON.stringify(passage),
        headers: {
          'Content-Type': 'application/json',
        },
      }
  )
  .then((response: Response) => response.json())
  .then(
      (responseObject: any) => {
        if (isSuccessResponse(responseObject)) {
          //all good!
        }
        else {
          console.log("Handle error for creation.");
          console.log(responseObject);
        }})
}

/**
 * function to run when DELETING the existing passage
 * @param story
 * @param passage
 * @param exclusive
 */
export function onDeletePassage(passageId: string){
  //appropriate backend call
  fetch("http://localhost:3232/passages/" + passageId,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }
  )
  .then((response: Response) => response.json())
  .then(
      (responseObject: any) => {
        if (isSuccessResponse(responseObject)) {
        }
        else {
          console.log("Handle error for deletion:");
          console.log(responseObject);
        }})
}

//*** NARROWERS ***/

/**
 * Returns  if select success response is selectful and successful.
 * @param rjson the json to check
 * @returns whether the format is that of a successful response
 */
function isSelectSuccessResponse(rjson: any): rjson is selectSuccessResponse {
  if (!("result" in rjson)) return false;
  if (rjson["result"] === "success") {
    if (!("data" in rjson)) return false;
  } else {
    return false;
  }
  return true;
}

/**
 * Returns if select response is claimed.
 * @param rjson the json to check
 * @returns whether the format is that of a claim response.
 */
function isSelectClaimedResponse(rjson: any): rjson is selectClaimedResponse {
  if (!("result" in rjson)) return false;
  if (rjson["result"] === "error_claimed") {
    if (!("data" in rjson)) return false;
    }
  else {
      return false;
  }
  return true;
}

/**
 * Returns if select response is claimed.
 * @param rjson the json to check
 * @returns whether the format is that of a claim response.
 */
function isSelectDeleteResponse(rjson: any): rjson is selectDeleteResponse {
  if (!("result" in rjson)) return false;
  if (rjson["result"] === "error_datasource") {
    return true;
  }
  return false;
}

export function isSuccessResponse(rjson: any): rjson is successResponse{
  if (!("result" in rjson)) return false;
  if (rjson["result"] === "success") {
    return true;
  }
  return false;
}


/**
 * passage narrower :|
 */
/**
 * Returns whether rjson matches the json format of the expected redlining
 * server success response.
 *
 * @param rjson the json to check
 * @returns whether the format is that of a successful response
 */
function isPassage(rjson: any): rjson is Passage {
  if (!("height" in rjson)) return false;
  if (!("highlighted" in rjson)) return false;
  if (!("id" in rjson)) return false;
  if (!("left" in rjson)) return false;
  if (!("name" in rjson)) return false;
  if (!("selected" in rjson)) return false;
  if (!("story" in rjson)) return false;
  if (!("tags" in rjson)) return false;
  if (!("text" in rjson)) return false;
  if (!("top" in rjson)) return false;
  if (!("width" in rjson)) return false;
  if (!("claimed" in rjson)) return false;
  if (!("user" in rjson)) return false;
  return true;
}

/**
 * interface for having pins
 */
interface selectSuccessResponse{
  result: string;
  data: Passage;
}

interface selectClaimedResponse{
  result: string;
  data: Passage;
}

interface selectDeleteResponse{
  result: string;
}

export interface successResponse{
  result: string;
}


