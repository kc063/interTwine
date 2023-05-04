import {
  IconPlayerPlay,
  IconTool,
  IconX,
  IconUserPlus,
  IconReload
} from '@tabler/icons';
import * as React from 'react';
import {useTranslation} from 'react-i18next/';
import {ButtonBar} from '../components/container/button-bar';
import {CardContent} from '../components/container/card';
import {CardButton} from '../components/control/card-button';
import {IconButton} from '../components/control/icon-button';
import {Story, useStoriesContext} from '../store/stories';
import {refreshStory} from "../store/stories/action-creators/intertwine-functions";
export interface CollabActionsProps {
  story: Story;
}

export const CollabActions: React.FC<CollabActionsProps> = ({story}) => {
  const [playError, setPlayError] = React.useState<Error>();
  const [testError, setTestError] = React.useState<Error>();
  const {stories, dispatch} = useStoriesContext();
  const {t} = useTranslation();

  function resetErrors() {
    setPlayError(undefined);
    setTestError(undefined);
  }

  function handleEditors(){
    console.log("Editor popup here...");
  }

  function handleRefresh(){
    refreshStory(story, stories, dispatch);
    console.log("Refresh page...");
  }

  return (
      <ButtonBar>
        <CardButton
            ariaLabel={testError?.message ?? ''}
            disabled={!story}
            icon={<IconUserPlus />}
            label="View Editors"
            onChangeOpen={() => setTestError(undefined)}
            onClick={handleEditors}
            open={!!testError}
        >
          <CardContent>
            <p>{testError?.message}</p>
            <IconButton
                icon={<IconX />}
                label="View Editors"
                onClick={() => setTestError(undefined)}
                variant="primary"
            />
          </CardContent>
        </CardButton>
        <CardButton
            ariaLabel={playError?.message ?? ''}
            disabled={!story}
            icon={<IconReload />}
            label="Refresh"
            onChangeOpen={() => setPlayError(undefined)}
            onClick={handleRefresh}
            open={!!playError}
        >
          <CardContent>
            <p>{playError?.message}</p>
            <IconButton
                icon={<IconX />}
                label={t('common.close')}
                onClick={() => setPlayError(undefined)}
                variant="primary"
            />
          </CardContent>
        </CardButton>
      </ButtonBar>
  );
};
