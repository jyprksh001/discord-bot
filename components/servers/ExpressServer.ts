declare const process: any;
import express from 'express';
import bodyParser from 'body-parser';
import PromoteNewJob from '../promoteNewJob';

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

app.all('/new-job', (req, res) => {
    const newJob = { ...req.body, ...req.query }
    // PromoteNewJob(newJob, CLIENT)
    res.status(200).send(newJob)
})

app.get('/',(req,res)=>{
    res.send("hi")
})

async function ExpressServer() {
    // check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1, 2 and 3)
    try{
      await app.listen(process.env.PORT, () => console.log(`ExpressServer started on ${process.env.PORT}.`));
    }catch(err){
      throw `Unable to connect ExpressServer: ${err}`; 
    }
}
  
export default ExpressServer;
  




