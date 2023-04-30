import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {IconArrowRight, IconArrowBarToRight} from '@tabler/icons';
import {ButtonBar} from '../container/button-bar';
import {Card, CardContent, CardProps} from '../container/card';
import {IconButton} from '../control/icon-button';
import './welcome-card.css';

export interface WelcomeCardProps extends CardProps {
	image?: React.ReactNode;
	nextLabel: string;
	onNext: () => void;
	onSkip: () => void;
	showSkip: boolean;
	title: string;
	loginLabel: string | undefined;
	onLogin: () => void;
	showLogin: boolean;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = props => {
	const {
		children,
		image,
		nextLabel,
		onNext,
		onSkip,
		showSkip,
		title,
		showLogin,
		loginLabel,
		onLogin,
		...otherProps
	} = props;
	const {t} = useTranslation();

	return (
		<div className="welcome-card">
			<Card {...otherProps}>
				<div className="welcome-card-image">{image}</div>
				<CardContent>
					<h2>{title}</h2>
					{children}
				</CardContent>
				<ButtonBar>
					<IconButton
						icon={<IconArrowRight />}
						variant="primary"
						onClick={onNext}
						label={nextLabel}
					/>
					{showSkip && (
						<IconButton
							icon={<IconArrowBarToRight />}
							label={t('common.skip')}
							onClick={onSkip}
						/>
					)}
					{showLogin && (
						<IconButton
							icon={<IconArrowBarToRight />}
							label={t('common.login')}
							onClick={onLogin}
						/>
					)}
				</ButtonBar>
			</Card>
		</div>
	);
};
