import {
  Passage,
  StoriesAction,
  StoriesDispatch,
  StoriesState,
  Story,
  TagColors
} from "../../stories.types";
import {passageDefaults, storyDefaults} from "../../defaults";
import {ownerUpdateFunction} from "./owner-update-intertwine";
import {isSuccessResponse} from "./passage-select-intertwine-options";
import {isPassage} from "./passage-select-intertwine-options";
import {Thunk} from "react-hook-thunk-reducer";
import {Dispatch} from "react";


export async function getStore(userId: string | undefined, dispatch: StoriesDispatch): Promise<Thunk<StoriesState,StoriesAction>>{
  console.log(userId);
  if(userId){
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
            for (let i = 0; i < responseObject.data.length; i++) {
              console.log(responseObject.data[i].passages);
              stories.push(responseObject.data[i]);
            }
            console.log("interior" + stories);
            dispatch(d => {d({type:'init', state: stories})});
          }
          else {
            console.log("Handle error for creation.");
            console.log(responseObject);
            return stories;
          }
        })
  }
 return dispatch => {dispatch({type:'init',state: [{"id":"2e538e5c-9a32-40ef-9ae2-7e99c7515603","ifid":"ED135DB0-CEC1-46DF-9A4A-E8141486BEC1","lastUpdate":new Date(),"passages":[{"height":100,"highlighted":false,"left":350,"name":"beginning","selected":false,"tags":[],"text":"[[middle]]","top":225,"width":100,"claimed":false,"user":"","id":"7dbb4b66-0cfb-4b53-b193-c75e148700ca","story":"2e538e5c-9a32-40ef-9ae2-7e99c7515603"},{"height":100,"highlighted":false,"left":525,"name":"end","selected":false,"tags":[],"text":"[[beginning]]","top":150,"width":100,"claimed":false,"user":"","id":"d3c7d563-d768-4414-8d3f-c4bf861d8ca3","story":"2e538e5c-9a32-40ef-9ae2-7e99c7515603"},{"height":100,"highlighted":false,"left":600,"name":"middle","selected":false,"tags":[],"text":"[[end]]","top":300,"width":100,"claimed":false,"user":"","id":"845a8d49-b2af-48bb-974c-72bd2d7ff4b1","story":"2e538e5c-9a32-40ef-9ae2-7e99c7515603"}],"name":"mockstory","script":"kjlk;jkjjlj","selected":false,"snapToGrid":true,"startPassage":"7dbb4b66-0cfb-4b53-b193-c75e148700ca","storyFormat":"Harlowe","storyFormatVersion":"3.3.5","stylesheet":"","tags":[],"tagColors":{},"zoom":1,"owner":"","editors":[]}
       ]})};
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