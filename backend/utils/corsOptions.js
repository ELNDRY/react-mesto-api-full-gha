const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://elndry.students.nomoredomains.xyz',
    'https://elndry.students.nomoredomains.xyz',
    'http://api.elndry.students.nomoredomains.xyz',
    'https://api.elndry.students.nomoredomains.xyz',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  // eslint-disable-next-line quotes
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

module.exports = corsOptions;
