"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));    

let players = [
  { id: 1, name: "大谷翔平", number: 17, position: "投手・指名打者", age: 30 },
  { id: 2, name: "山本由伸", number: 18, position: "投手", age: 27 },
];

//一覧 
app.get("/players", (req, res) => {
  res.render("players", { data: players });
});

//詳細
app.get("/players/:id", (req, res) => {
  const data = players.find(p => p.id == req.params.id);
  res.render("player_detail", { data });
});

//追加
app.post("/players", (req, res) => {
  const newP = req.body;
  newP.id = players.length ? players[players.length - 1].id + 1 : 1;
  players.push(newP);
  res.redirect("/players");
});

//編集
app.post("/players/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  res.render("player_edit", { data: players.find(p => p.id === id) });
});

//更新
app.put("/players/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = players.findIndex(p => p.id === id);
  players[idx] = { id, ...req.body };
  res.redirect("/players");
});

//削除
app.delete("/players/:id", (req, res) => {
  players = players.filter(p => p.id !== Number(req.params.id));
  res.redirect("/players");
});



//世界ーーーーーーーーーーーーーーーーーーーーーーーーーーーー
let cities = [
  { id: 1, name: "Tokyo", country: "Japan", population: 13960000, industry: "Finance" },
  { id: 2, name: "New York", country: "USA", population: 8419000, industry: "Media" },
];

app.get("/cities", (req, res) => res.render("cities", { data: cities }));

app.get("/cities/:id", (req, res) => res.render("city_detail", { data: cities.find(c => c.id == req.params.id) }));

app.post("/cities", (req, res) => {
  const c = req.body;
  c.id = cities.length ? cities[cities.length - 1].id + 1 : 1;
  cities.push(c);
  res.redirect("/cities");
});

app.post("/cities/edit/:id", (req, res) =>
  res.render("city_edit", { data: cities.find(c => c.id == req.params.id) })
);

app.put("/cities/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = cities.findIndex(c => c.id == id);
  cities[idx] = { id, ...req.body };
  res.redirect("/cities");
});

app.delete("/cities/:id", (req, res) => {
  cities = cities.filter(c => c.id !== Number(req.params.id));
  res.redirect("/cities");
});



//やることリストーーー
let todos = [
  { id: 1, title: "レポート提出", detail: "12/26まで" },
  { id: 2, title: "バイト", detail: "12/11" },
];

app.get("/todos", (req, res) => res.render("todos", { data: todos }));
app.get("/todos/:id", (req, res) => res.render("todo_detail", { data: todos.find(t => t.id == req.params.id) }));
app.post("/todos", (req, res) => {
  const t = req.body;
  t.id = todos.length ? todos[todos.length - 1].id + 1 : 1;
  todos.push(t);
  res.redirect("/todos");
});
app.post("/todos/edit/:id", (req, res) =>
  res.render("todo_edit", { data: todos.find(t => t.id == req.params.id) })
);
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex(t => t.id == id);
  todos[idx] = { id, ...req.body };
  res.redirect("/todos");
});
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id !== Number(req.params.id));
  res.redirect("/todos");
});


app.listen(8080, () => console.log("Server running on port 8080"));
