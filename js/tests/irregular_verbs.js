var IrregularVerbs = require('../irregular_verbs');
   
describe('irregular_verbs constructor', function() {

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

	it('Validate constructor without total verbs', function() {

		var irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true
		});
		expect( irregular_verbs.isValidatingPast() ).toBe( true );
		expect( irregular_verbs.isValidatingPastParticiple() ).toBe( true );
		expect( irregular_verbs.getTotalVerbs() ).toBe( 20 );

	});
});

describe('irregular_verbs tests with one verb', function() {

	var irregular_verbs;
	var onlyOneVerb = { infinitive: 'to be', past: 'was/were', past_participle: 'been', translate: 'ser/estar' };

	beforeAll(function() {
		irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 1
		});
		spyOn(irregular_verbs, "randNewVerb").and.callFake(function() {
			this.current_verb = onlyOneVerb;
			return onlyOneVerb.infinitive;
		});

	});


	it('Rand New Verb', function() {
		var new_verb_infinitive = irregular_verbs.randNewVerb();
		expect( new_verb_infinitive ).toBe( onlyOneVerb.infinitive );
	});


	it('Get Infinitive Verb', function() {
		expect( irregular_verbs.isFinishedGame() ).toBeFalsy();

		irregular_verbs.randNewVerb();
		expect( irregular_verbs.getInfinitiveVerb() ).toBe( onlyOneVerb.infinitive );

	});


	it('Get Answers', function() {

		expect( irregular_verbs.isFinishedGame() ).toBe( false );

		var new_verb_infinitive = irregular_verbs.randNewVerb();
		expect( new_verb_infinitive ).toBe( onlyOneVerb.infinitive );

		var returned_answer = irregular_verbs.getAnswer();

		expect( returned_answer ).toBe( onlyOneVerb );

	});




	it('Verify Answers', function() {
		var new_verb_infinitive = irregular_verbs.randNewVerb();

		var verified = { past: true, past_participle: true }
		var returned_verified = irregular_verbs.testAnswer( onlyOneVerb );

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

	beforeAll(function() {
		irregular_verbs = new IrregularVerbs({
			validate_past: true,
			validate_past_participle: true,
			total_verbs: 10
		});
		spyOn(irregular_verbs, "randNewVerb").and.callFake(function() {
			this.current_verb = onlyOneVerb;
			return onlyOneVerb.infinitive;
		});

	});

	it('for a correct answer', function() {

		var new_verb_infinitive = irregular_verbs.randNewVerb();

		var verified = { past: true, past_participle: true }
		var returned_verified = irregular_verbs.testAnswer( onlyOneVerb );

		expect( JSON.stringify(returned_verified) ).toBe( JSON.stringify(verified) );

		var points = {
			correct: 1,
			wrong: 0,
			consective: 1,
			max_consective: 1
		}
		var returned_points = irregular_verbs.getPoints();

		expect( JSON.stringify(returned_points) ).toBe( JSON.stringify(points) );

	});

	it('for a wrong answer', function() {

		var new_verb_infinitive = irregular_verbs.randNewVerb();

		var verified = { past: false, past_participle: false }
		var returned_verified = irregular_verbs.testAnswer( { past: 'wrong answer', past_participle: 'wrong answer again'} );

		expect( JSON.stringify(returned_verified) ).toBe( JSON.stringify(verified) );

		var points = {
			correct: 0,
			wrong: 1,
			consective: 0,
			max_consective: 0
		}
		var returned_points = irregular_verbs.getPoints();

		expect( JSON.stringify(returned_points) ).toBe( JSON.stringify(points) );

	});

	it('for consecutive answers', function() {

		var answers = [{
			answer: onlyOneVerb,
			acumulated_points: {
				correct: 1,
				wrong: 0,
				consective: 1,
				max_consective: 1
			}
		},{
			answer: onlyOneVerb,
			acumulated_points: {
				correct: 2,
				wrong: 0,
				consective: 2,
				max_consective: 2
			}
		},{
			answer: {
				past: 'wrong answer',
				past_participle: 'wrong answer again'
			},
			acumulated_points: {
				correct: 2,
				wrong: 1,
				consective: 0,
				max_consective: 2
			}
		},{
			answer: onlyOneVerb,
			acumulated_points: {
				correct: 3,
				wrong: 1,
				consective: 1,
				max_consective: 2
			}
		}];

		var new_verb_infinitive = irregular_verbs.randNewVerb();

		var verified = { past: true, past_participle: true }
		var returned_verified = irregular_verbs.testAnswer( onlyOneVerb );

		expect( JSON.stringify(returned_verified) ).toBe( JSON.stringify(verified) );

		var points = {
			correct: 1,
			wrong: 0,
			consective: 1,
			max_consective: 1
		}
		var returned_points = irregular_verbs.getPoints();

		expect( JSON.stringify(returned_points) ).toBe( JSON.stringify(points) );

	});

});
