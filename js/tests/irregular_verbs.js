var IrregularVerbs = require('../irregular_verbs');
   
describe('irregular_verbs', function() {

	it('Validate constructor', function() {

		var test_constructor = [{
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 10
		},{
			validate_past: true,
			validate_past_participle: false,
			total_verbs: 11
		},{
			validate_past: false,
			validate_past_participle: true,
			total_verbs: 12
		},{
			validate_past: false,
			validate_past_participle: false,
			total_verbs: 30
		}];

		for(var c=0; len = test_constructor.length > c; c++) {
			var irregular_verbs = new IrregularVerbs({
				validate_past: test_constructor[c].validate_past,
				validate_past_participle: test_constructor[c].validate_past_participle,
				total_verbs: test_constructor[c].total_verbs
			});
			expect( irregular_verbs.isValidatingPast() ).toBe( test_constructor[c].validate_past );
			expect( irregular_verbs.isValidatingPastParticiple() ).toBe( test_constructor[c].validate_past_participle );
			expect( irregular_verbs.getTotalVerbs() ).toBe( test_constructor[c].total_verbs );
		}

	});


	it('Rand New Verb', function() {

		var irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 1
		});

		var new_verb_infinitive = irregular_verbs.randNewVerb();
		expect( new_verb_infinitive ).toBe( 'to be' );


	});




	it('Get Infinitive Verb', function() {

		var irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 1
		});

		expect( irregular_verbs.isFinishedGame() ).toBe( false );

		irregular_verbs.randNewVerb();
		expect( irregular_verbs.getInfinitiveVerb() ).toBe( 'to be' );

	});


	it('Is Finished Game', function() {

		var irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 1
		});

		expect( irregular_verbs.isFinishedGame() ).toBe( false );

		var new_verb_infinitive = irregular_verbs.randNewVerb();
		expect( new_verb_infinitive ).toBe( 'to be' );

		expect( irregular_verbs.isFinishedGame() ).toBe( true );

	});


	it('Is Finished Game More', function() {

		var irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 10
		});

		for(var c=0; c<10; c++) {
			expect( irregular_verbs.isFinishedGame() ).toBe( false );
			irregular_verbs.randNewVerb();
		}

		expect( irregular_verbs.isFinishedGame() ).toBe( true );

	});




	it('Get Answers', function() {

		var irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 1
		});

		expect( irregular_verbs.isFinishedGame() ).toBe( false );

		var new_verb_infinitive = irregular_verbs.randNewVerb();
		expect( new_verb_infinitive ).toBe( 'to be' );

		var answer = { infinitive: 'to be', past: 'was/were', past_participle: 'been', translate: 'ser/estar'};
		var returned_answer = irregular_verbs.getAnswer();

		expect( JSON.stringify(returned_answer) ).toBe( JSON.stringify(answer) );

	});




	it('Verify Answers', function() {

		var irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 1
		});

		var new_verb_infinitive = irregular_verbs.randNewVerb();

		var answer = { infinitive: 'to be', past: 'was/were', past_participle: 'been', translate: 'ser/estar'};

		var verified = { past: true, past_participle: true }
		var returned_verified = irregular_verbs.testAnswer(answer);

		expect( JSON.stringify(returned_verified) ).toBe( JSON.stringify(verified) );

	});

});