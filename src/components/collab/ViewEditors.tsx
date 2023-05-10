import {IconShare, IconX, IconCrown, IconPencil} from '@tabler/icons';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {ButtonBar} from '../../components/container/button-bar';
import {CardContent} from '../../components/container/card';
import {DialogCard} from '../../components/container/dialog-card';
import {IconButton} from '../../components/control/icon-button';
import {IconLink} from '../../components/control/icon-link';
import {setPref, usePrefsContext} from '../../store/prefs';
import {DialogComponentProps} from '../../dialogs';
import {Story} from '../../store/stories';
import {useStoriesContext} from '../../store/stories';
import {useAuth0} from '@auth0/auth0-react';
import {ownerUpdateFunction} from '../../store/stories/action-creators/intertwine-functions';
import {mockStory1} from '../../store/stories/action-creators/intertwine-functions/mocks';
import {remove} from 'lodash';

export const ViewEditors: React.FC<DialogComponentProps> = props => {
	// const {dispatch} = usePrefsContext();
	const [newEditor, setNewEditor] = React.useState('');
	const [allEditors, setAllEditors] = React.useState(
		props.story?.editors !== undefined ? props.story?.editors : []
	);
	const [removeEditor, setRemoveEditor] = React.useState('');
	/* isAddEditor: boolean that's set when there's an addition to the list of editors
	 * to ensure that the API request within the useeffect that
	 * runs on any change to allEditors is invoked only when there's
	 * an addition to the list of editors
	 */
	const [isAddEditor, setIsAddEditor] = React.useState(false);
	const {user} = useAuth0();
	// const {t} = useTranslation();
	const onShare = () => {
		if (newEditor !== '' && newEditor !== ' ') {
			// str;
			setIsAddEditor(true);
			setAllEditors([...(allEditors ?? []), newEditor]);
			console.log('Added ' + newEditor + ' to the story.');
			setNewEditor('');
		}
	};

	// const onClose = () => {
	// 	console.log('remove editor');
	// 	// setIsAddEditor(true);
	// 	setAllEditors(allEditors.filter((editor) => editor !== ))
	// };

	React.useEffect(() => {
		if (removeEditor !== '' && removeEditor !== ' ') {
			setAllEditors(allEditors.filter(editor => editor !== removeEditor));
			console.log('Removed ' + removeEditor + ' from the story.');
		}
	}, [removeEditor]);

	React.useEffect(() => {
		if (isAddEditor) {
			props.story!.editors = allEditors;
			console.log(props.story);
			ownerUpdateFunction(props.story!);
		}
	}, [allEditors]);

	return (
		<DialogCard
			{...props}
			story={props.story}
			className="app-donation-dialog"
			fixedSize
			headerLabel={'Share ' + props.story?.name}
		>
			<p>&emsp;People with Access</p>
			<div className="scroll">
				<IconButton
					icon={<IconCrown />}
					label={user?.email ?? ''}
					onClick={() => window.open('mailto: ' + user?.email)}
				/>
				{allEditors?.map(editor => (
					<ul className="no-bullets">
						<li key={editor}>
							<IconButton icon={<IconPencil />} label={editor} />
							<IconButton
								icon={<IconX />}
								iconOnly
								label={'Remove editor'}
								onClick={() => {
									setRemoveEditor(editor);
								}}
								tooltipPosition="bottom"
							/>
						</li>
					</ul>
				))}
			</div>

			<CardContent>
				<div>
					<input
						placeholder="Add editor email"
						onChange={e => {
							setNewEditor(e.target.value);
						}}
						value={newEditor}
						className="emailbox"
					></input>
				</div>
			</CardContent>
			<ButtonBar>
				<IconButton icon={<IconShare />} label={'Share'} onClick={onShare} />
				<IconButton icon={<IconX />} label={'Cancel'} onClick={props.onClose} />
			</ButtonBar>
		</DialogCard>
	);
};
