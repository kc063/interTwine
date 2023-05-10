const mockPassage1 = {
	height: 100,
	highlighted: false,
	left: 350,
	name: 'beginning',
	selected: true,
	tags: [],
	text: '[[middle]]',
	top: 225,
	width: 100,
	claimed: false,
	user: '',
	id: '7dbb4b66-0cfb-4b53-b193-c75e148700ca',
	story: '2e538e5c-9a32-40ef-9ae2-7e99c7515603'
};
const mockPassage2 = {
	height: 100,
	highlighted: false,
	left: 600,
	name: 'middle',
	selected: true,
	tags: [],
	text: '[[end]]',
	top: 300,
	width: 100,
	claimed: false,
	user: '',
	id: '845a8d49-b2af-48bb-974c-72bd2d7ff4b1',
	story: '2e538e5c-9a32-40ef-9ae2-7e99c7515603'
};
const mockPassage3 = {
	height: 100,
	highlighted: false,
	left: 525,
	name: 'end',
	selected: true,
	tags: [],
	text: '[[beginning]]',
	top: 150,
	width: 100,
	claimed: false,
	user: '',
	id: 'd3c7d563-d768-4414-8d3f-c4bf861d8ca3',
	story: '2e538e5c-9a32-40ef-9ae2-7e99c7515603'
};

const mockStory1 = {
	id: 'a925d682-1884-4747-880f-1a1798d15ed7',
	ifid: '758D94F4-189D-483C-A984-D718C23ED137',
	lastUpdate: '2023-05-02T21:10:42.402Z',
	passages: [],
	name: 'bonk',
	script: '',
	selected: false,
	snapToGrid: true,
	startPassage: '',
	storyFormat: 'Harlowe',
	storyFormatVersion: '3.3.5',
	stylesheet: '',
	tags: [],
	tagColors: {},
	zoom: 1,
	owner: '',
	editors: []
};
const mockStory2 = {
	id: '2e538e5c-9a32-40ef-9ae2-7e99c7515603',
	ifid: 'ED135DB0-CEC1-46DF-9A4A-E8141486BEC1',
	lastUpdate: '2023-05-02T21:13:55.416Z',
	passages: [
		{
			height: 100,
			highlighted: false,
			left: 350,
			name: 'beginning',
			selected: false,
			tags: [],
			text: '[[middle]]',
			top: 225,
			width: 100,
			claimed: false,
			user: '',
			id: '7dbb4b66-0cfb-4b53-b193-c75e148700ca',
			story: '2e538e5c-9a32-40ef-9ae2-7e99c7515603'
		},
		{
			height: 100,
			highlighted: false,
			left: 525,
			name: 'end',
			selected: false,
			tags: [],
			text: '[[beginning]]',
			top: 150,
			width: 100,
			claimed: false,
			user: '',
			id: 'd3c7d563-d768-4414-8d3f-c4bf861d8ca3',
			story: '2e538e5c-9a32-40ef-9ae2-7e99c7515603'
		},
		{
			height: 100,
			highlighted: false,
			left: 600,
			name: 'middle',
			selected: false,
			tags: [],
			text: '[[end]]',
			top: 300,
			width: 100,
			claimed: false,
			user: '',
			id: '845a8d49-b2af-48bb-974c-72bd2d7ff4b1',
			story: '2e538e5c-9a32-40ef-9ae2-7e99c7515603'
		}
	],
	name: 'mockstory',
	script: 'kjlk;jkjjlj',
	selected: false,
	snapToGrid: true,
	startPassage: '7dbb4b66-0cfb-4b53-b193-c75e148700ca',
	storyFormat: 'Harlowe',
	storyFormatVersion: '3.3.5',
	stylesheet: '',
	tags: [],
	tagColors: {},
	zoom: 1,
	owner: '',
	editors: []
};

const library = {mockStory1, mockStory2};
const mockStory3 = {
	id: 'a925d682-1884-4747-880f-1a1798d15ed7',
	ifid: '758D94F4-189D-483C-A984-D718C23ED137',
	lastUpdate: '2023-05-02T21:10:42.402Z',
	passages: [],
	name: 'bonk',
	script: '',
	selected: false,
	snapToGrid: true,
	startPassage: '',
	storyFormat: 'Harlowe',
	storyFormatVersion: '3.3.5',
	stylesheet: '',
	tags: [],
	tagColors: {},
	zoom: 1,
	owner: '',
	editors: ['jc@example.com']
};

export {
	mockPassage1,
	mockPassage2,
	mockPassage3,
	mockStory1,
	mockStory2,
	mockStory3,
	library
};
