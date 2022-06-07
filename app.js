const http = require("node:http");
const queryString = require("query-string");
const url = require("node:url");
const fs = require("node:fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  let urlParse = url.parse(req.url, true);
  const params = queryString.parse(urlParse.search);
  switch (urlParse.pathname) {
    //criar/atualizar usuário
    case "/create-user":
      fs.writeFile(
        `users/${params.id}.json`,
        JSON.stringify(params),
        function (err) {
          if (err) throw err;

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end("Usuário criado!");
        }
      );
      break;
    case "/update-user":
      fs.writeFile(
        `users/${params.id}.json`,
        JSON.stringify(params),
        function (err) {
          if (err) throw err;

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end("Usuário atualizado!");
        }
      );
      break;

    //Selecionar usuário
    case "/select-user":
      fs.readFile(`users/${params.id}.json`, function (err, data) {
        if (err) throw err;
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(data);
      });
      break;

    //Deletar usuário
    case "/delete-user":
      fs.unlink(`users/${params.id}.json`, function (err) {
        let response = err?"Usuário não encontrado.":"Usuário removido.";
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(response);
      });
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("Não encontrei o comando!");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
