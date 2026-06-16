const bcrypt = require("bcryptjs");

async function run() {
  const hash = await bcrypt.hash(
    "@Vj1314520",
    10
  );

  console.log(hash);
}

run();