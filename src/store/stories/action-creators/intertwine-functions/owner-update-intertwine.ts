/**
 * an assembly of functions for owner-specific updates (deleting the story, changing title, etc.)
 */

import {Story} from "../../stories.types";
import {isSuccessResponse} from "./passage-select-intertwine-options";

/** functions necessary:
 * find and replace (generally figure out how to handle find and replace)
 * rename
 * details (update story type)
 * passage tags
 * javascript
 * stylesheet
 */

export function ownerUpdateFunction(story: Story){
  console.log(JSON.stringify(story));
  fetch("http://localhost:3232/stories/" + story.id,
      {
        method: 'PUT',
        body: JSON.stringify(story),
        headers: {
          'Content-Type': 'application/json',
        },
      }
  )
  .then((response: Response) => response.json())
  .then(
      (responseObject: any) => {
        if (isSuccessResponse(responseObject)) {
        }
        else {
          console.log("Handle error for story update.");
          console.log(responseObject);
        }})

}