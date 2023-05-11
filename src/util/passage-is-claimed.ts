import {Passage} from '../store/stories';

/**
 * Returns whether a passage is considered empty, e.g. whether the user has put
 * any content into it.
 */
export function passageIsClaimed(passage: Passage, user: String) {
  return (
      passage.user !== "" && passage.user !== user);
}
