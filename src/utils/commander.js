import {program} from 'commander'

program
    .option('-d, --debug', 'variable para debug', false)
    .option('-m, --mode <mode>', 'ambiente a trabajar', 'dev')
    .option('-p, --port <port>', 'puerto a trabajar', 4000)
    .parse(process.argv)

console.log(+program.opts())

export default program

