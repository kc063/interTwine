import {Passage, StoriesState, Story, UpdatePassageAction} from "../../stories.types";
import {Thunk} from "react-hook-thunk-reducer";


/**
 * function to run when passage is SELECTED.
 * @param story
 * @param passage
 * @param exclusive
 */
export async function onSelectPassage(story: Story,
    passage: Passage): Promise<any> {
  //function here to "buffer"/"wait" while backend call happens
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
            //passage.user = thisUserID;
            passage.claimed = true;
            return (dispatch: (arg0: { type: string; passageId: string; props: Passage; storyId: string; }) => void) => {
              dispatch({
                type: 'updatePassage',
                passageId: passage.id,
                props: responseObject.data,
                storyId: story.id
              });
            }
          }
          else{
            console.log("Error: response was success, but data was malformed passage.")
          }
        }
        else if (isSelectClaimedResponse(responseObject)) {
          if(isPassage(responseObject.data)) {
            console.log(responseObject.data);
            return (dispatch: (arg0: { type: string; passageId: string; props: Passage; storyId: string; }) => void) => {
              dispatch({
                type: 'updatePassage',
                passageId: passage.id,
                props: responseObject.data,
                storyId: story.id
              });
            }
          }
          else{
            console.log("Error: response was claimed, but data was malformed passage.")
          }
        }
        else if (isSelectDeleteResponse(responseObject)) {
          console.log(responseObject.result);
          return (dispatch: (arg0: { type: string; passageId: string; storyId: string; }) => void) => {
            dispatch({
              type: 'deletePassage',
              passageId: passage.id,
              storyId: story.id
            });
          }
        }
        else {
          console.log("Error: bad response type.");
        }})
  //logic for this:
  //1: backend call
  //2: wait for returned data from backend call
  //3: IF returned object gives go-ahead, return true (can select)
  //4: ELSE update the object, either because it has been deleted
  //write delete clause
  //   or claimed...
  //write claim clause
  return true;
}

/**
 * function to run when passage is DESELECTED.
 * @param story
 * @param passage
 * @param exclusive
 */
export function onDeselectPassage(story: Story,
                                passage: Passage): any{
  //does this set correctly
  passage.claimed = false;
  passage.user = "";
  console.log(JSON.stringify(passage));
  //appropriate backend call
  fetch("http://localhost:3232/passages?id=" + JSON.stringify(passage),
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
        if (isSelectSuccessResponse(responseObject)) {
          //all good!
        }
        else {
          console.log("Handle error for ");
        }})

}

/**
 * function to run when CREATING A NEW PASSAGE
 * @param story
 * @param passage
 */
export function onCreatePassage(passage: Passage, storyId: string){

}

/**
 * function to run when DELETING the existing passage
 * @param story
 * @param passage
 * @param exclusive
 */
export function onDeletePassage(storyId: string, passageId: string){

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

