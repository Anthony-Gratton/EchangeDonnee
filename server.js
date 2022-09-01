import chalk from "chalk";

import app from "./src/app.js"

const PORT = 4200;

app.listen(PORT, err => {
    console.log(chalk.blue(`Server listening on port ${PORT}`));
    if (err) {
        //Si on as une erreur 
        process.exit(1);
    }
})

console.log(chalk.magenta.bgGreen.bold("J'écris en couleur"))