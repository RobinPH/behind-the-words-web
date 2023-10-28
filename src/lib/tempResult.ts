export const tempResult = {
	probability: 0.321,
	results: [
		{
			id: 'mispelled_words',
			metadata: {
				mispelled_words: [
					{ text: 'continously', suggestion: 'continuously', offset: 543 },
					{ text: 'innovates', suggestion: 'innovate', offset: 555 },
					{ text: ' ', suggestion: 'i', offset: 1432 }
				]
			},
			result: { mispelled_words: 0.00949367088607595, _word_count: 316 }
		},
		{ id: 'grammar_score', result: { grammar_score: 0.9863013698630136 } },
		{
			id: 'repetitive_words',
			metadata: {
				repetitive_words: [
					['the', 19],
					['in', 15],
					['of', 11],
					['a', 9],
					['we', 7],
					['education', 7],
					['that', 6],
					['for', 6],
					['us', 5],
					['globalization', 5],
					['to', 5],
					['it', 4],
					['not', 4],
					['will', 4],
					['as', 4],
					['and', 4],
					['are', 3],
					['new', 3],
					['their', 3],
					['have', 3],
					['countries', 3],
					['because', 3],
					['i', 3],
					['fact', 2],
					['world', 2],
					['was', 2],
					['ca', 2],
					["n't", 2],
					['people', 2],
					['students', 2],
					['technology', 2],
					['who', 2],
					['much', 2],
					['everyone', 2],
					['philippines', 2],
					['is', 2],
					['included', 2],
					['which', 2],
					['budget', 2],
					['so', 2],
					['developed', 2],
					['high-technology', 2],
					['purposes', 2],
					['here', 2],
					['being', 2],
					['left', 2],
					['behind', 2],
					['future', 2]
				]
			},
			result: { repetitive_words: 0.4726027397260274 }
		},
		{
			id: 'formality_score',
			metadata: {
				nouns: [
					'era',
					'globalization',
					'fact',
					'world',
					'globalization',
					'phenomenon',
					'people',
					'students',
					'effects',
					'globalization',
					'terms',
					'importance',
					'education',
					'education',
					'people',
					'goal',
					'lives',
					'gift',
					'doors',
					'world',
					'success',
					'technology',
					'students',
					'education',
					'way',
					'difficulties',
					'life',
					'journey',
					'student',
					'countries',
					'budget',
					'education',
					'others',
					'countries',
					'use',
					'high-technology',
					'education',
					'purposes',
					'countries',
					'evidences',
					'laboratory',
					'devices',
					'usage',
					'technology',
					'education',
					'purposes',
					'globalization',
					'today',
					'future',
					'summarizes',
					'nation',
					'attention',
					'budget',
					'education',
					'fact',
					'process',
					'innovation',
					'future',
					'kind',
					'globalization'
				],
				adjectives: [
					'Many',
					'new',
					'new',
					'Numerous',
					'new',
					'great',
					'fortunate',
					'challenging',
					'low',
					'high-technology',
					'electronic',
					'higher',
					'technological',
					'brighter'
				],
				prepositions: [
					'among',
					'in',
					'of',
					'in',
					'towards',
					'for',
					'of',
					'in',
					'of',
					'of',
					'through',
					'for',
					'of',
					'to',
					'into',
					'in',
					'in',
					'as',
					'to',
					'of',
					'for',
					'in',
					'of',
					'for',
					'in',
					'in',
					'as',
					'in',
					'in',
					'of',
					'in',
					'of',
					'in',
					'In',
					'in',
					'in',
					'of',
					'of',
					'for'
				],
				articles: [
					'the',
					'the',
					'a',
					'the',
					'the',
					'the',
					'The',
					'a',
					'a',
					'the',
					'an',
					'a',
					'a',
					'the',
					'the',
					'the',
					'the',
					'the',
					'the',
					'the',
					'the',
					'a',
					'the',
					'the',
					'a',
					'the',
					'the',
					'a',
					'a'
				],
				pronouns: [
					'us',
					'we',
					'It',
					'us',
					'we',
					'it',
					'us',
					'We',
					'all',
					'their',
					'they',
					'their',
					'that',
					'us',
					'who',
					'their',
					'everyone',
					'the',
					'what',
					'we',
					'which',
					'it',
					'who',
					'I',
					'I',
					'I',
					'it',
					'which',
					'me',
					'we',
					'we',
					'us',
					'we',
					'that',
					'everyone'
				],
				verbs: [
					'think',
					'moving',
					'call',
					'recognize',
					'know',
					'achieve',
					'set',
					'learning',
					'opens',
					'lead',
					'innovates',
					'grow',
					'have',
					'facing',
					'knows',
					'included',
					'called',
					'developing',
					'means',
					'develop',
					'allocated',
					'included',
					'developed',
					'acquiring',
					'left',
					'graduate',
					'planning',
					'work',
					'developed',
					'analyzes',
					'uses',
					'left',
					'affect',
					'give',
					'allocate',
					'deny',
					'have',
					'create',
					'works'
				],
				adverbs: [
					'then',
					'thus',
					'especially',
					'maybe',
					'soon',
					'continously',
					'enough',
					'much',
					'yet',
					'fully',
					'So',
					'here',
					'behind',
					'here',
					'abroad',
					'specifically',
					'behind',
					'much'
				],
				interjections: [],
				n_formal: 142,
				n_contextual: 92
			},
			result: { formality_score: 0.6068376068376068 }
		},
		{
			id: 'readability_score',
			result: {
				readability_score: {
					flesch_reading_ease: 44.88,
					flesch_kincaid_grade: 13.5,
					smog_index: 15.3,
					coleman_liau_index: 11.09,
					automated_readability_index: 15.0,
					dale_chall_readability_score: 8.39,
					difficult_words: 51,
					linsear_write_formula: 10.5,
					gunning_fog: 14.79
				}
			}
		},
		{
			id: 'metaphor_usage_score',
			metadata: {
				sentences: [
					{
						sentence:
							'Many among us think that we are in the era of globalization when in fact the world was moving towards globalization since then.',
						score: 0.20833333333333334
					},
					{
						sentence: "It's not new for us, thus we can't call it a new phenomenon.",
						score: 0.058823529411764705
					},
					{
						sentence:
							'Numerous people, especially us, the students maybe did not recognize the effects of globalization in terms of the importance of education.',
						score: 0.041666666666666664
					},
					{
						sentence:
							'We all know that through education, people will achieve their every goal they set for their lives.',
						score: 0.21052631578947367
					},
					{
						sentence:
							'The gift of learning opens new doors to a great world that will lead us soon into a success.',
						score: 0.15
					},
					{
						sentence:
							'But, as the technology continously innovates and grow, students who are not fortunate enough to have an education in a much challenging way will be facing difficulties in their life journey as a student.',
						score: 0.16216216216216217
					},
					{
						sentence:
							'As everyone knows that Philippines is included to the what we called the "developing countries" which means it is not yet fully develop because of the low budget allocated for the education.',
						score: 0.05714285714285714
					},
					{
						sentence:
							'So, while others who was included in developed countries have been acquiring the use of high-technology for education purposes, here I am being left behind.',
						score: 0.03571428571428571
					},
					{
						sentence:
							"After I graduate here in the Philippines, I'm planning to work abroad (specifically in the developed countries) as Forensic Specialist and it analyzes the evidences in laboratory which uses a high-technology electronic devices.",
						score: 0.05263157894736842
					},
					{
						sentence:
							'Being left behind in the usage of technology in education purposes because of globalization will affect me today and in the future.  ',
						score: 0.20833333333333334
					},
					{
						sentence:
							"In summarizes, one nation should give attention and allocate a much higher budget in education because we can't deny the fact that we are in the process of technological innovation, so for us to have a brighter future, we must create a kind of globalization that works for everyone.",
						score: 0.18518518518518517
					}
				]
			},
			result: { metaphor_usage_score: 0.12459265888058457 }
		},
		{
			id: 'lexical_diversity',
			result: {
				lexical_diversity: {
					ttr: 0.5273972602739726,
					rttr: 9.012168334102054,
					cttr: 6.372565342238233,
					mtld: 73.19021424435437,
					herdan: 0.8872945309696177,
					summer: 0.9311335482809603,
					maas: 0.019853858905303952,
					yulek: 127.83824357290297,
					herdanvm: 0.09856457476208366,
					simpsond: 0.012827755025184767
				}
			}
		},
		{ id: 'sentiment', result: { sentiment: 0.10702479338842977 } },
		{ id: 'subjectivity', result: { subjectivity: 0.4665289256198347 } }
	]
} as const;
