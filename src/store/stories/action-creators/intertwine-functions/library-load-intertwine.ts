import {
	StoriesAction,
	StoriesDispatch,
	StoriesState,
	Story
} from '../../stories.types';
import {Thunk} from 'react-hook-thunk-reducer';
import {isStory} from './passage-select-intertwine-options';
import {tokenError} from '@auth0/auth0-react/dist/utils';

/**
 * Getting the stored data from the backend.
 * @param userId: userId to search for
 * @param dispatch: dispatch updates the stories.
 */
export async function getStore(
	userId: string | undefined,
	dispatch: StoriesDispatch
): Promise<Thunk<StoriesState, StoriesAction>> {
	console.log(userId);
	if (userId) {
		fetch('http://localhost:1320/libraryload/' + userId, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response: Response) => response.json())
			.then((responseObject: any) => {
				let stories: Story[] = [];
				if (issuccessStoryLoadResponse(responseObject)) {
					let newData: Story[] = [];
					for (const str of responseObject.data) {
						console.log('string received: ' + str);
						const obj: any = JSON.parse(str);
						if (isStory(obj)) {
							newData.push(obj);
						}
					}
					for (let i = 0; i < newData.length; i++) {
						stories.push(newData[i]);
					}
					//console.log("interior" + stories);
					//actual dispatch.
					return dispatch(d => {
						d({type: 'init', state: stories});
					});
				} else {
					console.log('Handle error for story load:');
					console.log(responseObject);
					//just throws the error, and spits out the state load below, unoverwritten.
				}
			});
	}
	console.log('cringe if true');
	return Promise.reject('No update possible.');
}

/**
 * successful story load response interface!
 */
export interface successStoryLoadResponse {
	result: string;
	data: string[];
}

/**
 * narrower for successful story load response.
 * @param rjson
 */
function issuccessStoryLoadResponse(
	rjson: any
): rjson is successStoryLoadResponse {
	if (!('result' in rjson)) return false;
	if (!('data' in rjson)) return false;
	return true;
}
