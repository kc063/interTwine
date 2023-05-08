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

export const ViewEditors: React.FC<DialogComponentProps> = props => {
	// const {dispatch} = usePrefsContext();
	const [newEditor, setNewEditor] = React.useState('');
	const [allEditors, setAllEditors] = React.useState(
		props.story?.editors !== undefined ? props.story?.editors : []
	);
	const {user} = useAuth0();
	// const {t} = useTranslation();
	const onShare = () => {
		// props.story?.editors.push(newEditor);
		if (newEditor !== '' && newEditor !== ' ') {
			// str;
			setAllEditors([...(allEditors ?? []), newEditor]);
			console.log('Added ' + newEditor + ' to the story.');
			setNewEditor('');
		}
	};

	React.useEffect(() => {
		console.log(typeof allEditors);
		console.log(typeof props.story?.editors);
		Object.assign(allEditors, props.story?.editors);
		console.log(allEditors);
		// @ts-ignore
		await ownerUpdateFunction(props.story);
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
