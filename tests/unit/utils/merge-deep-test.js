import mergeDeep from 'ember-changeset/utils/merge-deep';
import Change from 'ember-changeset/-private/change';
import { module, test } from 'qunit';
import { get, set } from '@ember/object';

module('Unit | Utility | merge deep', () => {
  test('it returns merged objects', async function(assert) {
    let objA = { other: 'Ivan' };
    let objB = { foo: new Change('bar'), zoo: 'doo' };
    let value = mergeDeep(objA, objB);

    assert.deepEqual(value, { other: 'Ivan', foo: 'bar', zoo: 'doo' }, 'merges both values');
  });

  test('it unsets', async function(assert) {
    let objA = { other: 'Ivan' };
    let objB = { other: new Change(null) };
    let value = mergeDeep(objA, objB);

    assert.deepEqual(value, { other: null }, 'unsets value');
  });

  test('it works with Ember.get and Ember.set', async function(assert) {
    let objA = { other: 'Ivan' };
    let objB = { other: new Change(null) };
    let value = mergeDeep(objA, objB, { safeGet: get, safeSet: set });

    assert.deepEqual(value, { other: null }, 'unsets value');
  });

  test('it works with deeper nested objects', async function(assert) {
    let objA = { company: { employees: ['Ivan', 'Jan'] } };
    let objB = { company: { employees: new Change(['Jull', 'Olafur']) } };
    let value = mergeDeep(objA, objB);

    assert.deepEqual(value, { company: { employees: ['Jull', 'Olafur']} }, 'has right employees');
  });
});
