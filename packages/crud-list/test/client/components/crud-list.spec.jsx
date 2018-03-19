import React from 'react';
import { shallow, mount } from 'enzyme';

import CrudList from 'src/components/crud-list';
import Row from 'src/components/row';
import Cell from 'src/components/cell';

/* eslint-disable no-magic-numbers */

describe('components/crud-list', () => {
  const data = [
    {
      id: 1,
      summary: 'summary 1',
      details: 'details 1'
    },
    {
      id: 2,
      summary: 'summary 2',
      details: 'details 2'
    },
    {
      id: 3,
      summary: 'summary 3',
      details: 'details 3'
    }
  ];

  const cols = [
    { header: 'summary', field: 'summary'},
    { header: 'details', field: 'details'}
  ];

  describe('Mounting', () => {
    const wrapper = shallow(<CrudList data={data} cols={cols}/>);
    it('should render into the document', () => {
      expect(wrapper).to.not.be.null;
    });
  });

  describe('Rendering', () => {
    const wrapper = mount(<CrudList data={data} cols={cols}/>);
    it('should render three rows + headers', () => {
      expect(wrapper.find(Row)).to.have.length(4);
    });

    it('should render rows with two columns', () => {
      expect(wrapper.find(Row).at(1).find(Cell)).to.have.length(2);
    });
  });

  describe('Action buttons', () => {
    const handleDelete = () => {};
    const handleView = () => {};
    const handleEdit = () => {};
    const wrapper = mount(
      <CrudList
        data={data}
        cols={cols}
        handleDelete={handleDelete}
        handleView={handleView}
        handleEdit={handleEdit}
      />
    );

    it('should render an action column', () => {
      expect(wrapper.find(Row).at(1).find(Cell)).to.have.length(3);
    });

    const actionCol = wrapper.find(Row).at(1).find(Cell).at(2);

    it('should render a delete button', () => {
      expect(actionCol.find({ key: 'action_delete' })).to.have.length(1);
    });

    it('should render an edit button', () => {
      expect(actionCol.find({ key: 'action_view' })).to.have.length(1);
    });

    it('should render a view button', () => {
      expect(actionCol.find({ key: 'action_edit' })).to.have.length(1);
    });
  });

});
