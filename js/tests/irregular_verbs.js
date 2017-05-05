var IrregularVerbs = require('../irregular_verbs');

describe('irregular_verbs constructor', function() {


	it('Validate', function() {

		var irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 10
		});
		expect( irregular_verbs.isValidatingPast() ).toBe( true );
		expect( irregular_verbs.isValidatingPastParticiple() ).toBe( true );
		expect( irregular_verbs.getTotalVerbs() ).toBe( 10 );

	});

	it('Validate Without Parameter', function() {

		var irregular_verbs = new IrregularVerbs();
		expect( irregular_verbs.isValidatingPast() ).toBe( true );
		expect( irregular_verbs.isValidatingPastParticiple() ).toBe( true );
		expect( irregular_verbs.getTotalVerbs() ).toBe( 20 );

	});

	it('Validate constructor without total verbs', function() {

		var irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true
		});
		expect( irregular_verbs.isValidatingPast() ).toBe( true );
		expect( irregular_verbs.isValidatingPastParticiple() ).toBe( true );
		expect( irregular_verbs.getTotalVerbs() ).toBe( 20 );

	});

	it('Validate A lot of tests', function() {

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
});

describe('irregular_verbs tests with one verb', function() {
	it('Rand New Verb', function() {
		var irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 1
		});
		var new_verb_infinitive = irregular_verbs.randNewVerb();
		expect( new_verb_infinitive ).not.toBeNull();
	});
});

describe('irregular_verbs tests with one verb', function() {

	var irregular_verbs;
	var onlyOneVerb = { infinitive: 'to be', past: 'was/were', past_participle: 'been', translate: 'ser/estar' };

	beforeEach(function() {
		irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 1
		});
		spyOn(irregular_verbs, "randNewVerb").and.callFake(function() {
			this.current_verb = onlyOneVerb;
			return onlyOneVerb.infinitive;
		});

		irregular_verbs.randNewVerb();

	});


	it('Get Infinitive Verb', function() {
		expect( irregular_verbs.getInfinitiveVerb() ).toBe( onlyOneVerb.infinitive );

	});


	it('Get Answers', function() {

		var returned_answer = irregular_verbs.getAnswer();

		expect( returned_answer ).toBe( onlyOneVerb );

	});




	it('Verify Correct Answers', function() {

		var verified = { past: true, past_participle: true }
		var returned_verified = irregular_verbs.testAnswer( onlyOneVerb );

		expect( JSON.stringify(returned_verified) ).toBe( JSON.stringify(verified) );

	});

	it('Verify Wrong Answers', function() {

		var verified = { past: false, past_participle: false }
		var returned_verified = irregular_verbs.testAnswer( { past: 'wrong answer', past_participle: 'wrong answer again'} );

		expect( JSON.stringify(returned_verified) ).toBe( JSON.stringify(verified) );

	});

	it('Verify Correct Past Answers', function() {

		var answer = { past: onlyOneVerb.past, past_participle: 'wrong answer again'};
		var verified = { past: true, past_participle: false };
		var returned_verified = irregular_verbs.testAnswer( answer );

		expect( JSON.stringify(returned_verified) ).toBe( JSON.stringify(verified) );

	});

	it('Verify Correct Past Participle Answers', function() {

		var answer = { past: 'wrong answer', past_participle: onlyOneVerb.past_participle };
		var verified = { past: false, past_participle: true };
		var returned_verified = irregular_verbs.testAnswer( answer );

		expect( JSON.stringify(returned_verified) ).toBe( JSON.stringify(verified) );

	});

});




describe('irregular_verbs tests finished game', function() {

	it('Is Finished Game', function() {
		var irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 1
		});

		expect( irregular_verbs.isFinishedGame() ).toBeFalsy();

		var new_verb_infinitive = irregular_verbs.randNewVerb();

		expect( irregular_verbs.isFinishedGame() ).not.toBeFalsy();

	});


	it('Is Finished Game with 10 verbs', function() {

		var total_verbs = 10;

		var irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: total_verbs
		});

		for(var c=0; c<total_verbs; c++) {
			expect( irregular_verbs.isFinishedGame() ).toBeFalsy();
			irregular_verbs.randNewVerb();
		}

		expect( irregular_verbs.isFinishedGame() ).not.toBeFalsy();

	});
});


describe('irregular_verbs for past and past participle test points', function() {

	var irregular_verbs;
	var onlyOneVerb = { infinitive: 'to be', past: 'was/were', past_participle: 'been', translate: 'ser/estar' };

	beforeEach(function() {
		irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 10
		});
		spyOn(irregular_verbs, "randNewVerb").and.callFake(function() {
			this.current_verb = onlyOneVerb;
			this.in_game = true;
			return onlyOneVerb.infinitive;
		});
		irregular_verbs.randNewVerb();

	});

	it('for a correct answer', function() {
		
		irregular_verbs.testAnswer( onlyOneVerb );

		var points = {
			correct: 2,
			wrong: 0,
			consective: 1,
			max_consective: 1
		}
		var returned_points = irregular_verbs.getPoints();

		expect( JSON.stringify(returned_points) ).toBe( JSON.stringify(points) );

	});

	it('for a wrong answer', function() {

		var answer = { past: 'wrong answer', past_participle: 'wrong answer again'};
		irregular_verbs.testAnswer( answer );

		var points = {
			correct: 0,
			wrong: 2,
			consective: 0,
			max_consective: 0
		}
		var returned_points = irregular_verbs.getPoints();

		expect( JSON.stringify(returned_points) ).toBe( JSON.stringify(points) );

	});

	it('for consecutive answers', function() {

		var wrong_answer = {
			past: 'wrong answer',
			past_participle: 'wrong answer again'
		};

		var answers = [{
			answer: onlyOneVerb,
			acumulated_points: {
				correct: 2,
				wrong: 0,
				consective: 1,
				max_consective: 1
			}
		}, {
			answer: onlyOneVerb,
			acumulated_points: {
				correct: 4,
				wrong: 0,
				consective: 2,
				max_consective: 2
			}
		}, {
			answer: wrong_answer,
			acumulated_points: {
				correct: 4,
				wrong: 2,
				consective: 0,
				max_consective: 2
			}
		}, {
			answer: onlyOneVerb,
			acumulated_points: {
				correct: 6,
				wrong: 2,
				consective: 1,
				max_consective: 2
			}
		}];


		for(var c=0; c<answers.length; c++) {
			irregular_verbs.randNewVerb();
			irregular_verbs.testAnswer( answers[c].answer );
			var returned_points = irregular_verbs.getPoints();
			expect( JSON.stringify(returned_points) ).toBe( JSON.stringify(answers[c].acumulated_points) );
		}

	});

});




describe('test private functions', function() {
	it('shuffle Verbs', function() {

		expect( function() { _shuffleVerbs() } ).toThrowError('_shuffleVerbs is not defined');

		var irregular_verbs = new IrregularVerbs();
		expect( function() { irregular_verbs._shuffleVerbs() } ).toThrowError('irregular_verbs._shuffleVerbs is not a function');
	});

	it('calculate points', function() {

		expect( function() { _calculatePoints() } ).toThrowError('_calculatePoints is not defined');

		var irregular_verbs = new IrregularVerbs();
		expect( function() { irregular_verbs._calculatePoints() } ).toThrowError('irregular_verbs._calculatePoints is not a function');
	});
});
