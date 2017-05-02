var irregular_verbs = require('../prod/Arvore');
   
describe('irregular_verbs', function() {
	it('deve possuir 5 frutos', function() {
		expect(new Arvore().obterFrutos().length).toBe(5);
	});
});