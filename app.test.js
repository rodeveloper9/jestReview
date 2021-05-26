import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Header from './components/ui/Header';
import InputBox from './components/ui/InputBox';
import { getAll, getItemById, updateStatus, addToList } from './services/todo';
import { applyFilter } from './services/filter';

/**
 * Check for Text in the header component 
 */
test('default text', () => {
  const { getByText } = render(<Header />);
  expect(getByText('Things To Do')).toBeInTheDocument()
});

/**
 * Check for Placeholder in Input box 
 */
test('Input placeholder', () => {
  const { getByPlaceholderText } = render(<InputBox />);
  expect(getByPlaceholderText('Add New')).toBeInTheDocument()
});

/**
 * Check for Default List  
 */
test('Deafult List', () => {
  const defList = getAll();
  expect(defList.length).toBe(3)
});

/**
 * Check if searched for invalid ID 
 * @param {id}
 */
test('Search by Invalid Id', () => {
  const searchById = getItemById(4);
  expect(searchById).toEqual(undefined)
});

/**
 * Test search for valid ID 
 * @param {id} 
 */
test('Search by valid ID', () => {
  const searchById = getItemById(3);
  const searchRslt = {
    completed: false,
    id: 3,
    text: "Build a React App"
  }
  expect(searchById).toEqual(searchRslt)
});

/**
 * Test for Status Change 
 * @param {allList, id, status} 
 */
test('Task Status Change', () => {
  let todoList = getAll();
  const statusChange = updateStatus(todoList, 1, true);
  const resStatus = [
    {
      id: 1,
      text: 'Learn Javascript',
      completed: true
    },
    {
      id: 2,
      text: 'Learn React',
      completed: false
    },
    {
      id: 3,
      text: 'Build a React App',
      completed: false
    }
  ];
  expect(statusChange).toEqual(resStatus)
});

/**
 * Test for add new List
 * @param {allList, newListData} 
 */
test('Add new list', () => {
  const allList = getAll();
  const newdata = {
    text: 'Rohit',
    completed: false
  }
  const addListRes = addToList(allList, newdata);
  expect(addListRes.length).toEqual(allList.length + 1)
});

/**
 * Test for Filter label All
 * @param {allList, filterType}
 */
test('All Filter', () => {
  const allList = getAll();
  const filterRes = applyFilter(allList, 'all')
  expect(filterRes.length).toEqual(allList.length)
});

/**
 * Test for Completed Task when none of the task is completed 
 * @param {allList, filterType}
 */
 test('Filter with no task completed', () => {
  const allList = getAll();
  const filterRes = applyFilter(allList, 'completed')
  expect(filterRes.length).toEqual(0)
});

/**
 * Test for Completed task when one tak is completed with updateStatus function 
 * @param {allList, filterType}
 */
 test('Filter with completed task', () => {
  const allList = getAll();
  const updatedList = updateStatus(allList, 1, true);
  const filterRes = applyFilter(updatedList, 'completed')
  expect(filterRes.length).toEqual(1)
});

/**
 * Test for Active tasks when all tasks are active 
 * @param {allList, filterType}
 */
 test('Filter with All Active task', () => {
  const allList = getAll();
  const filterRes = applyFilter(allList, 'active')
  expect(filterRes.length).toEqual(3)
});

/**
 * Test for Active tasks when some tasks are active 
 * @param {allList, filterType}
 */
 test('Filter with few Active task', () => {
  const allList = getAll();
  const updatedList = updateStatus(allList, 1, true);
  const filterRes = applyFilter(updatedList, 'active')
  expect(filterRes.length).toEqual(2)
});


