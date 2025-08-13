print(
  "Start #################################################################"
);

db = db.getSiblingDB("turla_mongo");
db.createUser({
  user: "turla_mongo_user",
  pwd: "bsW2.X98yP222F3wuTqOm1P1D1**4hG3s8dS",
  roles: [{ role: "readWrite", db: "turla_mongo" }],
});

print("END #################################################################");
