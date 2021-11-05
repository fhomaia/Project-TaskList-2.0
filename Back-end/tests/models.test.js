const { expect } = require('chai');
const sinon = require('sinon');

const { MongoClient } = require('mongodb');
const getConnection = require('./connectionMock');

const models = require('../models/');

describe('Tests model layer', () => {

  const taskMock = {
    task: 'Exemplo',
    dueDate: '21/11/2021',
    status: 'Backlog',
  }

  let connectionMock;
  
  before(async () => {
    connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });


  describe('Tests function createTask', () => {

    it('tests if function returns an array', async () => {
      const response  = await models.createTask(taskMock);
      expect(response).to.be.an('array');
    });

    it('tests if array has a length equals to 1', async () => {
      const response  = await models.getTasks(taskMock);
      expect(response.length).to.be.equal(1);
    });

    it('tests if such object has property _id', async () => {
      const response  = await models.getTasks(taskMock);
      expect(response[0]).to.have.a.property('_id');
    });
  });

  describe('Tests function getTasks', () => {
    it('tests if function returns an array', async () => {
      // const ans = await connectionMock.db('TaskManager').collection('tasks').deleteOne();
      const response  = await models.getTasks();
      expect(response).to.be.an('array');
    });
    it('tests if function returns an empty array', async () => {
      const response  = await models.getTasks();
      expect(response.length).to.be.equals(1);
    });
  });
  // describe('Tests function updateTask', () => {
  //   it('tests if function returns an array', async () => {
  //     await connectionMock.db('TaskManager').collection('tasks').deleteMany({});
  //     await models.createTask(taskMock);
  //     const response = await models.updateTask({ task: 'Exemplo2', dueDate: '05/06/2022'})
  //     expect(response).to.be.an('array');
  //   });

  //   it('tests if function updates task', async () => {
  //     await connectionMock.db('TaskManager').collection('tasks').deleteMany({});
  //     await models.createTask(taskMock);
  //     const response = await models.updateTask({ task: 'Exemplo2', dueDate: '05/06/2022'})
  //     expect(response.task).to.be.equal('Exemplo2');
  //   });

  // });

  // describe('Tests function deleteTask', () => {
  //   it ('tests if function returns an array', async () => {
  //     await connectionMock.db('TaskManager').collection('tasks').deleteMany({});
  //     const tasksArray = await models.createTask(taskMock);
  //     const { _id } = tasksArray[0];
  //     await models.deleteTask(_id);
  //     const response = await models.getTasks();
  //     expect(response).to.be.an('array');
  //   });

  //   it ('tests if task is deleted', async () => {
  //     await connectionMock.db('TaskManager').collection('tasks').deleteMany({});
  //     const tasksArray = await models.createTask(taskMock);
  //     const { _id } = tasksArray[0];
  //     await models.deleteTask(_id);
  //     const response = await models.getTasks();
  //     expect(response).to.be.empty;
  //   });
  // });
});
