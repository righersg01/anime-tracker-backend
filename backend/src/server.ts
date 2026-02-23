import 'dotenv/config'
import app from "./app";
import prisma from "./lib/prisma";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

/*async function testDB() {
  const newUser = await prisma.user.create({
    data: {
      email: "teste@email.com",
      name: "Righer",
      password: "123456"
    }
  });

  console.log("Novo usuário:", newUser);

  const users = await prisma.user.findMany();
  console.log("Users:", users);
}

testDB();*/



app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
