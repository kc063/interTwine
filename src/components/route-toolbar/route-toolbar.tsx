import {IconHelp, IconUserCircle} from '@tabler/icons';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {IconButton} from '../control/icon-button';
import {BackButton} from './back-button';
import './route-toolbar.css';
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';
import {useState} from 'react';

export interface RouteToolbarProps {
	helpUrl?: string;
	pinnedControls?: React.ReactNode;
	tabs: Record<string, React.ReactNode>;
}

export const RouteToolbar: React.FC<RouteToolbarProps> = props => {
	const {helpUrl = 'https://twinery.org/2guide', pinnedControls, tabs} = props;
	const {t} = useTranslation();
	const {logout} = useAuth0();

	return (
		<div className="route-toolbar">
			<Tabs selectedTabClassName="selected">
				<div className="route-toolbar-top">
					<BackButton />
					<TabList className="route-toolbar-tablist">
						{Object.keys(tabs).map(tabName => (
							<Tab className="route-toolbar-tab" key={tabName}>
								{tabName}
							</Tab>
						))}
					</TabList>
					<div className="route-toolbar-pinned-controls">
						{/* <Tab className="route-toolbar-tab" key={'profile'}>
							Profile
						</Tab> */}
						{pinnedControls}
						<IconButton
							icon={<IconHelp />}
							label={t('common.help')}
							onClick={() => window.open(helpUrl, '_blank')}
						/>
						<IconButton
							icon={<IconUserCircle />}
							label={t('Log Out')}
							onClick={() => logout()}
						/>
					</div>
				</div>
				<div>
					{Object.entries(tabs).map(([tabName, tabContent]) => (
						<TabPanel key={tabName}>{tabContent}</TabPanel>
					))}
				</div>
			</Tabs>
		</div>
	);
};
