const fastify = require('fastify')();

const students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  },
];

fastify.get('/cit/student', (request, reply) => {
  reply.code(200).send(students);
});

fastify.get('/cit/student/:id', (request, reply) => {
  const id = parseInt(request.params.id);
  const student = students.find(s => s.id === id);
  if (student) {
    reply.code(200).send(student);
  } else {
    reply.code(404).send('Not Found');
  }
});

fastify.setNotFoundHandler((request, reply) => {
  reply.code(404).send('Not Found');
});

const listenIP = 'localhost';
const listenPort = 8082;

fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

fastify.post('/cit/student', (request, reply) => {
    const { last, first } = request.body;
    const id = Math.max(...students.map(s => s.id)) + 1;
    const newStudent = { id, last, first };
    students.push(newStudent);
    reply.code(201).send(newStudent);
  });
