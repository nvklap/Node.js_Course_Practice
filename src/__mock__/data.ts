export const genresMockData = [
	{
		_id: '65310ca08e15343a2c0e91b8',
		name: 'mystery',
	},
	{
		_id: '65311110c5418262955852b0',
		name: 'comedy',
	},
	{
		_id: '65311b93a97b85c3e73118d4',
		name: 'drama',
	},
	{
		_id: '6531435b72e9cddfdae9697e',
		name: 'romance',
	},
	{
		_id: '6532509bb81c59abd554d45a',
		name: 'noir',
	},
	{
		_id: '653250a6b81c59abd554d45d',
		name: 'horror',
	},
	{
		_id: '653250b1b81c59abd554d460',
		name: 'thriller',
	},
	{
		_id: '653250c0b81c59abd554d463',
		name: 'crime',
	},
	{
		_id: '653250c0b81c59abd224d463',
		name: 'vampire',
	},
];

export const moviesMockData = [
	{
		_id: '65325333d5dd96472bc2cbdf',
		title: 'Mr. & Mrs. Smith',
		description:
			'A couple who have been married for three years are shocked to learn that their marriage is not legally valid',
		release_date: '1941-04-12',
		genre: ['65311110c5418262955852b0', '6531435b72e9cddfdae9697e'],
	},
	{
		_id: '65325345d5dd96472bc2cbe1',
		title: 'Rebecca',
		description:
			"A self-conscious woman juggles adjusting to her new role as an aristocrat's wife and avoiding being intimidated by his first wife's spectral presence.",
		release_date: '1940-04-12',
		genre: [
			'65311b93a97b85c3e73118d4',
			'65310ca08e15343a2c0e91b8',
			'6532509bb81c59abd554d45a',
		],
	},
	{
		_id: '65325352d5dd96472bc2cbe3',
		title: 'Psycho',
		description:
			"A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run and checks into a remote motel run by a young man under the domination of his mother.",
		release_date: '1960-09-08',
		genre: [
			'653250a6b81c59abd554d45d',
			'65310ca08e15343a2c0e91b8',
			'653250b1b81c59abd554d460',
		],
	},
	{
		_id: '6532535cd5dd96472bc2cbe5',
		title: 'The Birds',
		description:
			'A wealthy San Francisco socialite pursues a potential boyfriend to a small Northern California town that slowly takes a turn for the bizarre when birds of all kinds suddenly begin to attack...',
		release_date: '1963-03-29',
		genre: [
			'653250a6b81c59abd554d45d',
			'65311b93a97b85c3e73118d4',
			'65310ca08e15343a2c0e91b8',
		],
	},
	{
		_id: '65325367d5dd96472bc2cbe7',
		title: 'Vertigo',
		description:
			'A former San Francisco police detective juggles wrestling with his personal demons and becoming obsessed with the hauntingly beautiful woman he has been hired to trail, who may be deeply disturbed.',
		release_date: '1963-05-09',
		genre: [
			'6531435b72e9cddfdae9697e',
			'653250b1b81c59abd554d460',
			'65310ca08e15343a2c0e91b8',
		],
	},
	{
		_id: '65325371d5dd96472bc2cbe9',
		title: 'Dial M for Murder',
		description:
			'A former tennis star arranges the murder of his adulterous wife',
		release_date: '1954-05-29',
		genre: ['653250c0b81c59abd554d463', '653250b1b81c59abd554d460'],
	},
];
