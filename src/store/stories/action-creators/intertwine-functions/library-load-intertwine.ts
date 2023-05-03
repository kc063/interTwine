import {Passage, Story} from "../../stories.types";
import {passageDefaults, storyDefaults} from "../../defaults";
import {ownerUpdateFunction} from "./owner-update-intertwine";
import {isSuccessResponse} from "./passage-select-intertwine-options";
import {isPassage} from "./passage-select-intertwine-options";

export function libload(){

}

export function fakelibload(userId: string): Story[]{
  fetch("http://localhost:3232/libraryload/" + userId,
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
        let stories: Story[] = [];
        if ((issuccessStoryLoadResponse(responseObject))) {
          for (let i = 0; i < responseObject.data.length; i++){
            stories.push(responseObject.data[i]);
          }
          return stories;
        }
        else {
          console.log("Handle error for creation.");
          console.log(responseObject);
          return [];
        }})
  return [];
}



export interface successStoryLoadResponse{
  result: string;
  data: Story[];
}

function issuccessStoryLoadResponse(rjson: any): rjson is successStoryLoadResponse{
  if(!('result' in rjson)) return false;
  if(!('data' in rjson)) return false;
  return true;
}

function isStory(rjson: any): rjson is Story{
  if (!('ifid' in rjson)) return false;
  if (!('id' in rjson)) return false;
  if (!('lastUpdate' in rjson)) return false;
  if (!('name' in rjson)) return false;
  if (!('passages' in rjson)) return false;
  if (!('script' in rjson)) return false;
  if (!('selected' in rjson)) return false;
  if (!('snapToGrid' in rjson)) return false;
  if (!('startPassage' in rjson)) return false;
  if (!('storyFormat' in rjson)) return false;
  if (!('storyFormatVersion' in rjson)) return false;
  if (!('stylesheet' in rjson)) return false;
  if (!('tags' in rjson)) return false;
  if (!('tagColors' in rjson)) return false;
  if (!('zoom' in rjson)) return false;
  if (!('owner' in rjson)) return false;
  if (!('editors' in rjson)) return false;
  return true;
}