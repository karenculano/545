/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Search16, Close16 } from '@carbon/icons-react';
import Search from './Search';
import { mount, shallow } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Search', () => {
  describe('renders as expected', () => {
    const wrapper = mount(
      <Search
        id="test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
      />
    );

    const label = wrapper.find('label');
    const textInput = wrapper.find('input');
    const container = wrapper.find(`.${prefix}--search`);

    describe('container', () => {
      it('should add extra classes that are passed via className', () => {
        expect(container.hasClass('extra-class')).toEqual(true);
      });
    });

    describe('input', () => {
      it('renders as expected', () => {
        expect(textInput.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(textInput.hasClass(`${prefix}--search-input`)).toEqual(true);
      });

      it('should set type as expected', () => {
        expect(textInput.props().type).toEqual('text');
        wrapper.setProps({ type: 'email' });
        expect(wrapper.find('input').props().type).toEqual('email');
      });

      it('should set value as expected', () => {
        expect(textInput.props().defaultValue).toEqual(undefined);
        wrapper.setProps({ defaultValue: 'test' });
        expect(wrapper.find('input').props().defaultValue).toEqual('test');
        expect(wrapper.find('input').props().value).toEqual(undefined);
      });

      it('should set placeholder as expected', () => {
        expect(textInput.props().placeholder).toEqual('');
        wrapper.setProps({ placeholder: 'Enter text' });
        expect(wrapper.find('input').props().placeholder).toEqual('Enter text');
      });
    });

    describe('label', () => {
      it('renders a label', () => {
        expect(label.length).toBe(1);
      });

      it('has the expected classes', () => {
        expect(label.hasClass(`${prefix}--label`)).toEqual(true);
      });

      it('should set label as expected', () => {
        expect(wrapper.props().label).toEqual('Search Field');
        wrapper.setProps({ label: 'Email Input' });
        expect(wrapper.props().label).toEqual('Email Input');
      });
    });

    describe('Large Search', () => {
      const large = mount(
        <Search
          id="test"
          size="lg"
          className="extra-class"
          label="Search Field"
          labelText="testlabel"
        />
      );

      const largeContainer = large.find(`.${prefix}--search`);

      it('renders correct search icon', () => {
        const icons = large.find(Search16);
        expect(icons.length).toBe(1);
      });

      it('should have the expected large class', () => {
        expect(largeContainer.hasClass(`${prefix}--search--lg`)).toEqual(true);
      });

      it('should only have 1 button (clear)', () => {
        const btn = large.find('button');
        expect(btn.length).toEqual(1);
      });

      it('renders two Icons', () => {
        const iconTypes = [Search16, Close16];
        const icons = large.findWhere((n) => iconTypes.includes(n.type()));
        expect(icons.length).toEqual(2);
      });

      describe('buttons', () => {
        const btns = wrapper.find('button');

        it('should be one button', () => {
          expect(btns.length).toBe(1);
        });

        it('should have type="button"', () => {
          const type1 = btns.first().instance().getAttribute('type');
          const type2 = btns.last().instance().getAttribute('type');
          expect(type1).toEqual('button');
          expect(type2).toEqual('button');
        });
      });

      describe('icons', () => {
        it('renders "search" icon', () => {
          const icons = wrapper.find(Search16);
          expect(icons.length).toBe(1);
        });

        it('renders two Icons', () => {
          wrapper.setProps({ size: undefined });
          const iconTypes = [Search16, Close16];
          const icons = wrapper.findWhere((n) => iconTypes.includes(n.type()));
          expect(icons.length).toEqual(2);
        });
      });
    });

    describe('Small Search', () => {
      const small = mount(
        <Search
          id="test"
          size="sm"
          className="extra-class"
          label="Search Field"
          labelText="testlabel"
        />
      );

      const smallContainer = small.find(`.${prefix}--search`);

      it('renders correct search icon', () => {
        const icons = small.find(Search16);
        expect(icons.length).toBe(1);
      });

      it('should have the expected small class', () => {
        expect(smallContainer.hasClass(`${prefix}--search--sm`)).toEqual(true);
      });

      it('should only have 1 button (clear)', () => {
        const btn = small.find('button');
        expect(btn.length).toEqual(1);
      });

      it('renders two Icons', () => {
        const iconTypes = [Search16, Close16];
        const icons = wrapper.findWhere((n) => iconTypes.includes(n.type()));
        expect(icons.length).toEqual(2);
      });
    });
  });

  describe('events', () => {
    describe('enabled textinput', () => {
      const onClick = jest.fn();
      const onChange = jest.fn();
      const onClear = jest.fn();

      const wrapper = shallow(
        <Search
          id="test"
          labelText="testlabel"
          onClick={onClick}
          onChange={onChange}
          onClear={onClear}
        />
      );

      const input = wrapper.find('input');
      const eventObject = {
        target: {
          defaultValue: 'test',
        },
      };

      it('should invoke onClick when input is clicked', () => {
        input.simulate('click');
        expect(onClick).toHaveBeenCalled();
      });

      it('should invoke onChange when input value is changed', () => {
        input.simulate('change', eventObject);
        expect(onChange).toHaveBeenCalledWith(eventObject);
      });

      it('should invoke onClear when input value is cleared', () => {
        wrapper.setProps({ value: 'test' });
        const focus = jest.fn();
        input.getElement().ref({
          focus,
        });
        wrapper.find('button').simulate('click', { target: { value: 'test' } });
        expect(onClear).toHaveBeenCalled();
        expect(focus).toHaveBeenCalled();
      });
    });
  });
});

/**
 * Find the <input> element.
 * @param {Enzymecontainer} wrapper
 * @returns {Enzymecontainer}
 */
const getInput = (wrapper) => {
  return wrapper.find(`.${prefix}--search-input`);
};

/**
 * Find the value of the <input> element
 * @param {EnzymeWrapper} wrapper
 * @returns {number}
 */
const getInputValue = (wrapper) => {
  return getInput(wrapper).prop('value');
};

describe('Detecting change in value from props', () => {
  it('should have empty value', () => {
    const search = shallow(
      <Search id="test" className="extra-class" labelText="testlabel" />
    );
    expect(getInputValue(search)).toBe(undefined);
  });

  it('should set value if value prop is added', () => {
    const search = shallow(
      <Search
        id="test"
        className="extra-class"
        labelText="testlabel"
        value="foo"
      />
    );

    expect(getInputValue(search)).toBe('foo');
  });
});
