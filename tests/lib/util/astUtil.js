'use strict'
const astUtil = require('../../../src/util/astUtil')
const traverse = require('eslint-traverser')
const assert = require('assert')
const isMatch = require('lodash/isMatch')

describe('astUtil', () => {
    describe('getCaller', () => {
        it('should get the object that called the method when it exists', done => {
            traverse('a.f()')
                .get('CallExpression', node => {
                    assert.equal(astUtil.getCaller(node).name, 'a')
                    done()
                })
        })
        it('should return undefined for a CallExpression without a caller', done => {
            traverse('f()')
                .get('CallExpression', node => {
                    assert.strictEqual(astUtil.getCaller(node), undefined)
                    done()
                })
        })
    })
    describe('getMethodName', () => {
        it('should return the name of a method if the CallExpression is an object', done => {
            traverse('a.f()')
                .get('CallExpression', node => {
                    assert.equal(astUtil.getMethodName(node), 'f')
                    done()
                })
        })
        it('should return undefined for a CallExpression without an object', done => {
            traverse('f()')
                .get('CallExpression', node => {
                    assert.strictEqual(astUtil.getMethodName(node), undefined)
                    done()
                })
        })
    })
    describe('isMethodCall', () => {
        it('should return true for a method call', done => {
            traverse('a.f()')
                .get('CallExpression', node => {
                    assert(astUtil.isMethodCall(node))
                    done()
                })
        })
        it('should return false for a CallExpression that is not a method call', done => {
            traverse('f()')
                .get('CallExpression', node => {
                    assert(!astUtil.isMethodCall(node))
                    done()
                })
        })
        it('should return false for a node that is not a CallExpression', done => {
            traverse('var x = a.f')
                .get('MemberExpression', node => {
                    assert(!astUtil.isMethodCall(node))
                    done()
                })
        })
    })
    describe('getFirstFunctionBlock', () => {
        it('should return the first function block for a function expression', done => {
            traverse('T = function() { return true}')
                .get('FunctionExpression', node => {
                    assert.equal(astUtil.getFirstFunctionLine(node).type, 'ReturnStatement')
                    done()
                })
        })
        it('should return the first function line for a function declaration', done => {
            traverse('function T() { return true}')
                .get('FunctionDeclaration', node => {
                    assert.equal(astUtil.getFirstFunctionLine(node).type, 'ReturnStatement')
                    done()
                })
        })
        it('should return the first function line for an arrow function', done => {
            traverse('const T = () => true')
                .get('ArrowFunctionExpression', node => {
                    const firstLine = astUtil.getFirstFunctionLine(node)
                    assert(isMatch(firstLine, {type: 'Literal', value: true}))
                    done()
                })
        })
        it('should return the first function line for an arrow function with a block', done => {
            traverse('const T = () => {return true}')
                .get('ArrowFunctionExpression', node => {
                    assert.equal(astUtil.getFirstFunctionLine(node).type, 'ReturnStatement')
                    done()
                })
        })
    })
    describe('isMemberExpOf', () => {
        it('should return true if the expression is a memberExpression of an object', done => {
            traverse('a.b.c.d')
                .first('MemberExpression', node => {
                    assert(astUtil.isMemberExpOf(node, 'a'))
                    done()
                })
        })
        it('should return false if the member is not a memberExpression of an object', done => {
            traverse('a.b.c.d')
                .first('MemberExpression', node => {
                    assert(!astUtil.isMemberExpOf(node, 'b'))
                    done()
                })
        })
        it('should return false if the member expression is deeper than the maximum depth', done => {
            traverse('a.b.c.d')
                .first('MemberExpression', node => {
                    assert(!astUtil.isMemberExpOf(node, 'a', {maxLength: 2}))
                    done()
                })
        })
        it('should return false if the value is computed', done => {
            traverse('a.b.c[d]')
                .first('MemberExpression', node => {
                    assert(!astUtil.isMemberExpOf(node, 'a'))
                    done()
                })
        })
        it('should return true if value is computed and allowComputed is true', done => {
            traverse('a.b.c[d]')
                .first('MemberExpression', node => {
                    assert(astUtil.isMemberExpOf(node, 'a', {allowComputed: true}))
                    done()
                })
        })
    })
    describe('getFirstParamName', () => {
        it('should return the name of the first parameter of a function expression', done => {
            traverse('funcWithCb(function(a) {})')
                .get('FunctionExpression', node => {
                    assert.equal(astUtil.getFirstParamName(node), 'a')
                    done()
                })
        })
        it('should work for a function declaration', done => {
            traverse('function named(a) {}')
                .get('FunctionDeclaration', node => {
                    assert.equal(astUtil.getFirstParamName(node), 'a')
                    done()
                })
        })
        it('should work for an arrow function', done => {
            traverse('funcWithCb(a => {})')
                .get('ArrowFunctionExpression', node => {
                    assert.equal(astUtil.getFirstParamName(node), 'a')
                    done()
                })
        })
        it('should return undefined if the function has no parameters', done => {
            traverse('funcWithCb(() => {})')
                .get('ArrowFunctionExpression', node => {
                    assert.strictEqual(astUtil.getFirstParamName(node), undefined)
                    done()
                })
        })
        it('should return undefined if the first parameter is deconstructed', done => {
            traverse('funcWithCb(({a}) => {})')
                .get('ArrowFunctionExpression', node => {
                    assert.strictEqual(astUtil.getFirstParamName(node), undefined)
                    done()
                })
        })
        it('should return undefined for a rest parameter', done => {
            traverse('funcWithCb((...a) => {})')
                .get('ArrowFunctionExpression', node => {
                    assert.strictEqual(astUtil.getFirstParamName(node), undefined)
                    done()
                })
        })
    })
    describe('hasOnlyOneStatement', () => {
        describe('function expression', () => {
            it('should return true if a function expression has only one statement', done => {
                traverse('var pushOne = function() { a.push(1)}')
                    .get('FunctionExpression', node => {
                        assert(astUtil.hasOnlyOneStatement(node))
                        done()
                    })
            })
            it('should return false if a function expression has more than one statement', done => {
                traverse('var pushOne = function() { a.push(1); return a}')
                    .get('FunctionExpression', node => {
                        assert(!astUtil.hasOnlyOneStatement(node))
                        done()
                    })
            })
        })
        describe('function declaration', () => {
            it('should return true if a function expression has only one statement', done => {
                traverse('function pushOne() { a.push(1)}')
                    .get('FunctionDeclaration', node => {
                        assert(astUtil.hasOnlyOneStatement(node))
                        done()
                    })
            })
            it('should return false if a function expression has more than one statement', done => {
                traverse('function pushOne() { a.push(1); return a}')
                    .get('FunctionDeclaration', node => {
                        assert(!astUtil.hasOnlyOneStatement(node))
                        done()
                    })
            })
        })
        describe('arrow functions', () => {
            it('should return true for lambda expressions', done => {
                traverse('const getOne = () => 1')
                    .get('ArrowFunctionExpression', node => {
                        assert(astUtil.hasOnlyOneStatement(node))
                        done()
                    })
            })
            it('should return true for an arrow function with a block with only one statement', done => {
                traverse('const getOne = () => {return 1}')
                    .get('ArrowFunctionExpression', node => {
                        assert(astUtil.hasOnlyOneStatement(node))
                        done()
                    })
            })
            it('should return false for an arrow function with a block with several statements', done => {
                traverse('const pushOne = () => { a.push(1); return a}')
                    .get('ArrowFunctionExpression', node => {
                        assert(!astUtil.hasOnlyOneStatement(node))
                        done()
                    })
            })
        })
    })
    describe('isObjectOfMethodCall', () => {
        it('should return true if the node is an object of a method call', done => {
            traverse('a.f()')
                .get('Identifier', {name: 'a'}, node => {
                    assert(astUtil.isObjectOfMethodCall(node))
                    done()
                })
        })
        it('should return a falsy value otherwise', done => {
            traverse('a.f()')
                .get('Identifier', {name: 'f'}, node => {
                    assert(!astUtil.isObjectOfMethodCall(node))
                    done()
                })
        })
    })
    describe('isEqEqEqToMemberOf', () => {
        it('should return true if the binary expression is a strict equality to a member expression of a variable', done => {
            traverse('a.b === c')
                .get('BinaryExpression', node => {
                    assert(astUtil.isEqEqEqToMemberOf(node, 'a'))
                    done()
                })
        })
        it('should return false if the member expression is for the variable', done => {
            traverse('a.b === c')
                .get('BinaryExpression', node => {
                    assert(!astUtil.isEqEqEqToMemberOf(node, 'd'))
                    done()
                })
        })
        it('should return false if the operator is not strict equality', done => {
            traverse('a.b == c')
                .get('BinaryExpression', node => {
                    assert(!astUtil.isEqEqEqToMemberOf(node, 'a'))
                    done()
                })
        })
        it('should account for max property path length if given', done => {
            traverse('a.b.c.d === e')
                .get('BinaryExpression', node => {
                    assert(!astUtil.isEqEqEqToMemberOf(node, 'a', {maxLength: 2}))
                    done()
                })
        })
        it('should not allow computed properties if allowComputed is falsy', done => {
            traverse('a.b.c[d] === e')
                .get('BinaryExpression', node => {
                    assert(!astUtil.isEqEqEqToMemberOf(node, 'a'))
                    done()
                })
        })
        it('should allow computed properties if allowComputed is truthy', done => {
            traverse('a.b.c[d] === e')
                .get('BinaryExpression', node => {
                    assert(astUtil.isEqEqEqToMemberOf(node, 'a', {allowComputed: true}))
                    done()
                })
        })
        it('should return false if the comparison is not to a literal and onlyLiterals is true', done => {
            traverse('a.b.c.d === e')
                .get('BinaryExpression', node => {
                    assert(!astUtil.isEqEqEqToMemberOf(node, 'a', {onlyLiterals: true}))
                    done()
                })
        })

        it('should return true if the comparison is to a literal and onlyLiterals is true', done => {
            traverse('a.b.c.d === 1')
                .get('BinaryExpression', node => {
                    assert(astUtil.isEqEqEqToMemberOf(node, 'a', {onlyLiterals: true}))
                    done()
                })
        })
    })
    describe('isNotEqEqToMemberOf', () => {
        it('should return true if the binary expression is a strict inequality to a member expression of a variable', done => {
            traverse('a.b !== c')
                .get('BinaryExpression', node => {
                    assert(astUtil.isNotEqEqToMemberOf(node, 'a'))
                    done()
                })
        })
        it('should return false if the member expression is for the variable', done => {
            traverse('a.b !== c')
                .get('BinaryExpression', node => {
                    assert(!astUtil.isNotEqEqToMemberOf(node, 'd'))
                    done()
                })
        })
        it('should return false if the operator is not strict equality', done => {
            traverse('a.b != c')
                .get('BinaryExpression', node => {
                    assert(!astUtil.isNotEqEqToMemberOf(node, 'a'))
                    done()
                })
        })
        it('should account for max property path length if given', done => {
            traverse('a.b.c.d !== e')
                .get('BinaryExpression', node => {
                    assert(!astUtil.isNotEqEqToMemberOf(node, 'a', {maxLength: 2}))
                    done()
                })
        })
        it('should not allow computed properties if allowComputed is falsy', done => {
            traverse('a.b.c[d] !== e')
                .get('BinaryExpression', node => {
                    assert(!astUtil.isNotEqEqToMemberOf(node, 'a'))
                    done()
                })
        })
        it('should allow computed properties if allowComputed is truthy', done => {
            traverse('a.b.c[d] !== e')
                .get('BinaryExpression', node => {
                    assert(astUtil.isNotEqEqToMemberOf(node, 'a', {allowComputed: true}))
                    done()
                })
        })
        it('should return false if the comparison is not to a literal and onlyLiterals is true', done => {
            traverse('a.b.c.d !== e')
                .get('BinaryExpression', node => {
                    assert(!astUtil.isNotEqEqToMemberOf(node, 'a', {onlyLiterals: true}))
                    done()
                })
        })
        it('should return true if the comparison is to a literal and onlyLiterals is true', done => {
            traverse('a.b.c.d !== 1')
                .get('BinaryExpression', node => {
                    assert(astUtil.isNotEqEqToMemberOf(node, 'a', {onlyLiterals: true}))
                    done()
                })
        })
    })
    describe('isNegationOfMemberOf', () => {
        it('should return true if the expression is a negation of a memberExpression of an object', done => {
            traverse('!a.b.c.d')
                .first('UnaryExpression', node => {
                    assert(astUtil.isNegationOfMemberOf(node, 'a'))
                    done()
                })
        })
        it('should return false if the member is not a memberExpression of the', done => {
            traverse('!b.c.d')
                .first('UnaryExpression', node => {
                    assert(!astUtil.isNegationOfMemberOf(node, 'a'))
                    done()
                })
        })
        it('should return false if the member expression is deeper than the maximum depth', done => {
            traverse('!a.b.c.d')
                .first('UnaryExpression', node => {
                    assert(!astUtil.isNegationOfMemberOf(node, 'a', {maxLength: 2}))
                    done()
                })
        })
        it('should return false if the value is computed', done => {
            traverse('!a.b.c[d]')
                .first('UnaryExpression', node => {
                    assert(!astUtil.isNegationOfMemberOf(node, 'a'))
                    done()
                })
        })
    })
    describe('isIdentifierWithName', () => {
        it('should return true if the node is an identifier with the specified name', done => {
            traverse('var x')
                .get('Identifier', node => {
                    assert(astUtil.isIdentifierWithName(node, 'x'))
                    done()
                })
        })

        it('should return false if the node is a literal', done => {
            traverse('var x = "x"')
                .get('Literal', node => {
                    assert(!astUtil.isIdentifierWithName(node, 'x'))
                    done()
                })
        })

        it('should return false for the wrong name', done => {
            traverse('var x')
                .get('Identifier', node => {
                    assert(!astUtil.isIdentifierWithName(node, 'y'))
                    done()
                })
        })
    })
    describe('isNegationExpression', () => {
        it('should return true for a negation expression', done => {
            traverse('!x')
                .get('UnaryExpression', node => {
                    assert(astUtil.isNegationExpression(node))
                    done()
                })
        })

        it('should return false for a different kind of unary expression', done => {
            traverse('+x')
                .get('UnaryExpression', node => {
                    assert(!astUtil.isNegationExpression(node))
                    done()
                })
        })
    })
    describe('getValueReturnedInFirstLine', () => {
        it('should return a node if it is the returned in the first line', done => {
            traverse('function f() {return 1}')
                .get('FunctionDeclaration', node => {
                    assert.equal(astUtil.getValueReturnedInFirstStatement(node).value, 1)
                    done()
                })
        })
        it('should work for lambda expressions', done => {
            traverse('f = () => 1')
                .get('ArrowFunctionExpression', node => {
                    assert.equal(astUtil.getValueReturnedInFirstStatement(node).value, 1)
                    done()
                })
        })
        it('should work for arrow functions with blocks', done => {
            traverse('f = () => {return 1}')
                .get('ArrowFunctionExpression', node => {
                    assert.equal(astUtil.getValueReturnedInFirstStatement(node).value, 1)
                    done()
                })
        })
        it('should return false if no value is returned in the first line', done => {
            traverse('f = () => {}')
                .get('ArrowFunctionExpression', node => {
                    assert(!astUtil.getValueReturnedInFirstStatement(node))
                    done()
                })
        })
        it('should return false if the return statement is in the second statement', done => {
            traverse('f = () => {const t = 3; return t}')
                .get('ArrowFunctionExpression', node => {
                    assert(!astUtil.getValueReturnedInFirstStatement(node))
                    done()
                })
        })
    })
    describe('isCallFromObject', () => {
        it('should return true if the expression is a call from the specified object name', done => {
            traverse('a.f()')
                .get('CallExpression', node => {
                    assert(astUtil.isCallFromObject(node, 'a'))
                    done()
                })
        })
        it('should return false if the expression is a call from a different object name', done => {
            traverse('a.f()')
                .get('CallExpression', node => {
                    assert(!astUtil.isCallFromObject(node, 'b'))
                    done()
                })
        })
        it('should return false if the expression is a call without an object', done => {
            traverse('f()')
                .get('CallExpression', node => {
                    assert(!astUtil.isCallFromObject(node, 'a'))
                    done()
                })
        })
        it('should return false if the expression is a call without an object and no object is given', done => {
            traverse('f()')
                .get('CallExpression', node => {
                    assert(!astUtil.isCallFromObject(node, undefined))
                    done()
                })
        })
    })
    describe('isComputed', () => {
        it('should return true if the property value is computed', done => {
            traverse('a[b]')
                .get('MemberExpression', node => {
                    assert(astUtil.isComputed(node))
                    done()
                })
        })

        it('should return false if the property value is not computed', done => {
            traverse('a.b')
                .get('MemberExpression', node => {
                    assert(!astUtil.isComputed(node))
                    done()
                })
        })

        it('should return false if the property value is computed but is still a literal', done => {
            traverse('a["b"]')
                .get('MemberExpression', node => {
                    assert(!astUtil.isComputed(node))
                    done()
                })
        })
    })
    describe('isEquivalentMemberExp', () => {
        it('should return true for two member expressions that are the same', done => {
            traverse('a.b.c')
                .first('MemberExpression', node1 => {
                    traverse('a.b.c')
                        .first('MemberExpression', node2 => {
                            assert(astUtil.isEquivalentMemberExp(node1, node2))
                            done()
                        })
                })
        })

        it('should return true for two member expressions even if one is computed with a literal', done => {
            traverse('a.b.c')
                .first('MemberExpression', node1 => {
                    traverse('a["b"].c')
                        .first('MemberExpression', node2 => {
                            assert(astUtil.isEquivalentMemberExp(node1, node2))
                            done()
                        })
                })
        })
        it('should return false for non-equivalent member expressions', done => {
            traverse('a.b.c')
                .first('MemberExpression', node1 => {
                    traverse('a.b.d')
                        .first('MemberExpression', node2 => {
                            assert(!astUtil.isEquivalentMemberExp(node1, node2))
                            done()
                        })
                })
        })
        it('should return false for similar computed member expressions', done => {
            traverse('a[b].c')
                .first('MemberExpression', node1 => {
                    traverse('a[b].c')
                        .first('MemberExpression', node2 => {
                            assert(!astUtil.isEquivalentMemberExp(node1, node2))
                            done()
                        })
                })
        })
    })
    describe('isEqEqEq', () => {
        it('should return true for a strict equality member expression', done => {
            traverse('a === b')
                .get('BinaryExpression', node => {
                    assert(astUtil.isEqEqEq(node))
                    done()
                })
        })
        it('should return false for a different binary operator', done => {
            traverse('a !== b')
                .get('BinaryExpression', node => {
                    assert(!astUtil.isEqEqEq(node))
                    done()
                })
        })
        it('should return false for a different node type', done => {
            traverse('op = "==="')
                .get('Literal', node => {
                    assert(!astUtil.isEqEqEq(node))
                    done()
                })
        })
    })
    describe('getExpressionComparedToInt', () => {
        it('should return the expression compared to 0 if there is one', done => {
            traverse('a === 0')
                .get('BinaryExpression', node => {
                    const actual = astUtil.getExpressionComparedToInt(node, 0)
                    assert(isMatch(actual, {type: 'Identifier', name: 'a'}))
                    done()
                })
        })
        it('should return the expression compared to -1 if there is one', done => {
            traverse('-1 === a')
                .get('BinaryExpression', node => {
                    const actual = astUtil.getExpressionComparedToInt(node, -1)
                    assert(isMatch(actual, {type: 'Identifier', name: 'a'}))
                    done()
                })
        })
        it('should return undefined if there is no such expression', done => {
            traverse('a === 0')
                .get('BinaryExpression', node => {
                    const actual = astUtil.getExpressionComparedToInt(node, 1)
                    assert.strictEqual(actual, undefined)
                    done()
                })
        })
        it('should return undefined for a > check', done => {
            traverse('a >= 0')
                .get('BinaryExpression', node => {
                    const actual = astUtil.getExpressionComparedToInt(node, 0)
                    assert.strictEqual(actual, undefined)
                    done()
                })
        })
        it('should return the node for a > check if checkOver is true', done => {
            traverse('a > 0')
                .get('BinaryExpression', node => {
                    const actual = astUtil.getExpressionComparedToInt(node, 0, true)
                    assert(isMatch(actual, {type: 'Identifier', name: 'a'}))
                    done()
                })
        })
        it('should return the node for a >= check of the next value if checkOver is true', done => {
            traverse('a >= 0')
                .get('BinaryExpression', node => {
                    const actual = astUtil.getExpressionComparedToInt(node, -1, true)
                    assert(isMatch(actual, {type: 'Identifier', name: 'a'}))
                    done()
                })
        })
    })
    describe('isIndexOfCall', () => {
        it('should return true for an indexOf call', done => {
            traverse('arr.indexOf(val)')
                .get('CallExpression', node => {
                    assert(astUtil.isIndexOfCall(node))
                    done()
                })
        })
        it('should return false for a function call', done => {
            traverse('indexOf(val)')
                .get('CallExpression', node => {
                    assert(!astUtil.isIndexOfCall(node))
                    done()
                })
        })
    })
    describe('collectParameterValues', () => {
        it('should return an array with a single string for an identifier', done => {
            traverse('x => x')
                .get('ArrowFunctionExpression', func => {
                    const param = func.params[0]
                    const paramNames = astUtil.collectParameterValues(param)
                    assert.deepEqual(paramNames, ['x'])
                    done()
                })
        })
        it('should return an array with all values defined in an object pattern', done => {
            traverse('({x, [y]: {z}}) => x')
                .get('ArrowFunctionExpression', func => {
                    const param = func.params[0]
                    const paramNames = astUtil.collectParameterValues(param)
                    assert.deepEqual(paramNames, ['x', 'z'])
                    done()
                })
        })
        it('should return an array all values from an array pattern', done => {
            traverse('([x,,z]) => x + z')
                .get('ArrowFunctionExpression', func => {
                    const param = func.params[0]
                    const paramNames = astUtil.collectParameterValues(param)
                    assert.deepEqual(paramNames, ['x', 'z'])
                    done()
                })
        })

    })
})