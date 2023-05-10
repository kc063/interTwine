import {IconMarquee} from '@tabler/icons';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {IconButton} from '../../../../components/control/icon-button';
import {
	selectAllPassages,
	Story,
	useStoriesContext
} from '../../../../store/stories';
import {useAuth0} from "@auth0/auth0-react";

export interface SelectAllPassagesButtonProps {
	story: Story;
}

export const SelectAllPassagesButton: React.FC<SelectAllPassagesButtonProps> = props => {
	const {story} = props;
	const {dispatch} = useStoriesContext();
	const {user} = useAuth0();
	const {sub} = user!;
	const {t} = useTranslation();

	return (
		<IconButton
			icon={<IconMarquee />}
			label={t('common.selectAll')}
			onClick={() => dispatch(selectAllPassages(story, sub!))}
		/>
	);
};
