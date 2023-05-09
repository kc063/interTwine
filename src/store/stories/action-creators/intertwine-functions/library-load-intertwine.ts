import {
  StoriesAction,
  StoriesDispatch,
  StoriesState,
  Story,
} from "../../stories.types";
import {Thunk} from "react-hook-thunk-reducer";

/**
 * Getting the stored data from the backend.
 * @param userId: userId to search for
 * @param dispatch: dispatch updates the stories.
 */
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
              //console.log(responseObject.data[i].passages);
              stories.push(responseObject.data[i]);
            }
            //console.log("interior" + stories);
            //actual dispatch.
            return dispatch(d => {d({type:'init', state: stories})});
          }
          else {
            console.log("Handle error for story load:");
            console.log(responseObject);
            //just throws the error, and spits out the state load below, unoverwritten.
          }
        })
  }
  //clears everything before fetch.
 return dispatch => {dispatch({type:'init',state: []})};
}

/**
 * successful story load response interface!
 */
export interface successStoryLoadResponse{
  result: string;
  data: Story[];
}

/**
 * narrower for successful story load response.
 * @param rjson
 */
function issuccessStoryLoadResponse(rjson: any): rjson is successStoryLoadResponse{
  if(!('result' in rjson)) return false;
  if(!('data' in rjson)) return false;
  return true;
}