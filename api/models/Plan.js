const Model = require('./Model');
const Term = require('./Term');
const Utils = require('./../utils')

/** Plan model 
 * id
 * name
 * terms
 */
class Plan extends Model {
	constructor(data){
		super();
		data = data || {};
		
		this.id = data.id || Utils.random('plan-');
		this.name = data.name || "";
		this.terms = data.terms || [];
		this._state = {
			_currentTerm: 0
		};

		for(let i = 0; i < this.terms.length; i++){
			this.terms[i] = new Term(this.terms[i]);
		}
	}

	static fromJson(json){
		return new Plan(JSON.parse(json));
	}

	addTerm(term, index){
		if(!(term instanceof Term)) throw new TypeError("Expected instance of Term, got " + typeof term);
		if(index && Number.isInteger(parseInt(index))) throw new TypeError("Index must be integer-parseable, got " + typeof index);

		if(index){
			this.data.terms.splice(index, 0, term);
		} else {
			this.data.terms.push(term);
		}
	}

	removeTerm(term){
		if(typeof term === "string"){

		} else if (term instanceof Term){

		}
	}

	*nextTerm(){
		if(this._state._currentTerm >= this.terms.length) return;
		yield this.terms[this._state._currentTerm++]; 
	}

	toPlainObject(){
		let plainObj = Object.assign({}, this);
		delete plainObj._state;
		plainObj.terms = this.terms.map(term=>{
			return term.toPlainObject();
		});
		return plainObj;
	}
}

module.exports = Plan;