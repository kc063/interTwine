import {Passage, Story} from "../../stories.types";


/**
 * function to run when passage is SELECTED.
 * @param story
 * @param passage
 * @param exclusive
 */
export async function onSelectPassage(story: Story,
    passage: Passage,
    exclusive: boolean): Promise<boolean> {
  //appropriate backend call
  fetch("http://localhost:3232/passages?id=" + passage.id)
  .then((response: Response) => response.json())
  .then(
      (responseObject: any) => {
        if (isSelectSuccessResponse(responseObject)) {
          if(isPassage(responseObject.data)){
            console.log(responseObject.data);
            //TODO: UPDATE PASSAGE!
          }
          else{
            console.log("Error: response was success, but data was malformed passage.")
          }
        }
        else if (isSelectClaimedResponse(responseObject)) {
          if(isPassage(responseObject.data)){
            console.log(responseObject.data);
            //TODO: UPDATE PASSAGE!
          }
          else{
            console.log("Error: response was claimed, but data was malformed passage.")
          }
        }
        else if (isSelectDeleteResponse(responseObject)) {
          console.log(responseObject.result);
          //TODO: DELETE PASSAGE!
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
                                passage: Passage,
                                exclusive: boolean){

}

/**
 * function to run when CREATING A NEW PASSAGE
 * @param story
 * @param passage
 * @param exclusive
 */
export function onNewPassage(story: Story, passage: Passage, exclusive: boolean){

}

/**
 * function to run when DELETING the existing passage
 * @param story
 * @param passage
 * @param exclusive
 */
export function onDeletePassage(story: Story, passage: Passage, exclusive: boolean){

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

