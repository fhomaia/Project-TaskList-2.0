const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const models = require('../models/');
const mongoConnection = require('../models/connection');

describe('Tests model layer', () => {

  const taskMock = {
    task: 'Exemplo',
    dueDate: '11/20/2021'
  };
  
  let connectionMock;
  const DBServer = new MongoMemoryServer();
  
  before( async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
    .connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('TaskManager'));
    sinon.stub(mongoConnection,'getConnection').resolves(connectionMock);      
  });
  
  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('Tests function createTask', () => {

    const response  = await models.createTask(taskMock);

    it('tests if function returns an array', async () => {
      expect(response).to.be.an('array');
    });

    it('tests if array has a length equals to 1', async () => {
      expect(response.length).to.be.equal(1);
    });

    it('tests if such object has property _id', async () => {
      expect(response).to.have.a.property(_id);
    });
  });

  describe('Tests function getTasks', () => {
    beforeEach(async() => {
      await connectionMock.collection('tasks').deleteMany({});
    });
    const response  = await models.getTasks();
    it('tests if function returns an array', async () => {
      expect(response).to.be.an('array');
    });
    it('tests if function returns an empty array', async () => {
      expect(response).to.be.empty;
    });
  });

  describe('Tests function updateTask', () => {

    before(async() => {
      await connectionMock.collection('tasks').deleteMany({});
    });

    await models.createTask(taskMock);

    const response = await models.updateTask({ task: 'Exemplo2', dueDate: '05/06/2022'})

    it('tests if function returns an array', async () => {
      expect(response).to.be.an('array');
    });

    it('tests if function updates task', async () => {
      expect(response.task).to.be.equal('Exemplo2');
    });

  });

  describe('Tests function deleteTask', () => {

    before(async() => {
      await connectionMock.collection('tasks').deleteMany({});
    });

    const tasksArray = await models.createTask(taskMock);
    const { _id } = tasksArray[0];
    await models.deleteTask(_id);
    const response = await models.getTasks();

    it ('tests if function returns an array', async () => {
      expect(response).to.be.an('array');
    });

    it ('tests if task is deleted', async () => {
      expect(response).to.be.empty;
    });
  });
});